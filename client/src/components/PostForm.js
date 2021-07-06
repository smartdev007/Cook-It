import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { storage } from "../firebase"
import { FETCH_POSTS_QUERY } from './graphql';
import {Col, Row, Select} from 'antd'
import { AlertDialog } from '../FormItems/AlertDialog';
import { InputAdornment, TextareaAutosize } from '@material-ui/core';
import { CheckOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

function PostForm({setToggle}) {
  const classes = useStyles();
  
  const [errMsg, setErrorMsg] = useState({msg : "", open : false});
  
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [youtube, setEmbedId] = useState("");
  const [values, setValues] = useState({
    title: '',
    content: '',
  });
  const [catagories,setcatagories] = useState('')
  const Option = Select.Option

  const [createPost, { data }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [{ query: FETCH_POSTS_QUERY }]
  })
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  function handleUpload() {

    // validation
    if(!catagories){
      setErrorMsg({msg : "Select a category..", open : true});
      return;
    }
    if(!values.title){
      setErrorMsg({msg : "Input a title..", open : true});
      return;
    }
    if(!values.content){
      setErrorMsg({msg : "Input the content..", open : true});
      return;
    }
    if(!file){
      setErrorMsg({msg : "Select the image..", open : true});
      return;
    }

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  }
  const pushdata = () => {
    createPost({
      variables: {
        title: values.title,
        content: values.content,
        image: url,
        youtube : youtube,
        catagory: catagories
      }
    })
    setURL("")
    setEmbedId("")
    values.title = ""
    values.content = ""
    setToggle(false)
  }
  if(url !== ""){
    pushdata()
  }
  return (
    <div style={{borderRadius:'15px',width:"60%",margin: 'auto', marginTop : '80px',border:"1px solid gray",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
      <h1>New Recipe</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <Row style={{width : '100%'}}>
          <Col span={12}>
            <Select onChange={(e)=> setcatagories(e)} defaultValue="Select Catagory" style={{width:'70%', marginTop : '18px'}}>
              <Option value="Spicy">Spicy</Option>
              <Option value="Desert">Desert</Option>
              <Option value="Chinese">Chinese</Option>
              <Option value="Italian">Italian</Option>
            </Select>
          </Col>
          <Col span={12}>
            <TextField style={{width:'70%'}} onChange={onChange} value={values.title} name="title" id="standard-basic" label="Title" />
          </Col>
        </Row>
        <TextareaAutosize
              rowsMax={200}
              style={{width:'80%', marginTop : '30px', height :'180px', fontSize:'17px'}}
              onChange={onChange}
              value={values.content}
              name="content"
              id="standard-basic"
              label="Content"
          />
        <Row style={{marginTop : '30px'}}>
          <Col span={2}>
          </Col>
          <Col span={10} align="left">
            <div onClick={()=>document.getElementById("selFile").click()} style={{cursor:'pointer'}}>
              <UploadOutlined 
                style={{fontSize : '28px', marginLeft:'-10px'}}
              />
              <span style={{marginLeft:'4px'}}>Upload  <i style={{color:'#44f'}}>{(file?file.name:"")}</i></span>
            </div>
            <input id="selFile" type="file" onChange={handleChange} hidden/>
          </Col>
          <Col span={11}>
            <TextField 
                onChange={(e)=>{setEmbedId(e.target.value)}}
                placeholder="rokGy0huYEA" 
                style={{width : '100%'}}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <span>https://www.youtube.com/embed/</span>
                    </InputAdornment>
                    )
                }}
            />
          </Col>
          <Col span={1}>
          </Col>
        </Row>
        <Row style={{width:'100%', marginTop : '30px'}}>
          <Col span={12}>
            <Button style={{width:'60%'}} onClick={() => {
                handleUpload()
              }} variant="contained" color="primary"
            >
              <CheckOutlined style={{fontSize : '16px'}}/>
              <span style={{marginLeft:'4px'}}>Submit</span>
            </Button>
          </Col>
          <Col span={12}>
            <Button style={{width:'60%'}} onClick={() => {
                setToggle(false)
              }} variant="contained" color="secondary"
            >
              <CloseOutlined style={{fontSize : '16px'}}/>
              <span style={{marginLeft:'4px'}}>
              Cancel
              </span>
            </Button>
          </Col>
        </Row>
      </form>
      {errMsg.open && <AlertDialog {...{errMsg, setErrorMsg}}/>}
    </div>
  );
}
const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!,$content: String!, $image: String!,$youtube : String!, $catagory: String!) {
    createPost(title: $title,content: $content, image: $image, youtube : $youtube, catagory: $catagory) {
      id
      title
      content
      image
      youtube
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
