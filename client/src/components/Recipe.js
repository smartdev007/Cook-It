import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import PostCard from './PostCard';
import TextField from '@material-ui/core/TextField';
import PostForm from './PostForm';
import { FETCH_POSTS_QUERY } from './graphql'
import Button from '@material-ui/core/Button';
import { Col, Divider, Row, Select } from 'antd'
import { LoadingOutlined, SearchOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { InputAdornment } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
        background : '#fff',
        borderRight : '3px solid green'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function Recipe() {
    const classes = useStyles();
    const Option = Select.Option

    const [toggle, setToggle] = useState(false)
    const [sel_category, setSelCategory] = useState('');
    const [search_str, setSearchString] = useState('');

    //   const { user } = useContext(AuthContext);
    const { loading, data , refetch} = useQuery(FETCH_POSTS_QUERY, {
        variables : {category : sel_category, search_str : search_str}
    });
    useEffect(()=>{
        refetch();
    })
    return (
        <div  style={{minHeight: (window.screen.availHeight-150)+'px'}}>
            {toggle && (
                <PostForm setToggle={setToggle} />
            )}
            {toggle === false && (
                <Row>
                    <Col span={6} className="controlDiv" style={{minHeight: (window.screen.availHeight-150)+'px'}} align="center">
                        <Divider orientation="center"><i><FilterOutlined /> filters</i></Divider>
                        <div className="filter-container">
                            <TextField 
                                onChange={(e)=>{setSearchString(e.target.value)}}
                                placeholder="Advanced Search" 
                                style={{width : '80%'}}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined/>
                                    </InputAdornment>
                                    )
                                }}
                            />
                            <div style={{marginTop : '30px'}}>
                                <Divider orientation="left" style={{margin : '5px'}}>category</Divider>
                                <Select onChange={(e) => setSelCategory(e)} defaultValue="Select the Category" style={{ width: '80%'}}>
                                    <Option value="Any">Any</Option>
                                    <Option value="Spicy">Spicy</Option>
                                    <Option value="Desert">Desert</Option>
                                    <Option value="Chinese">Chinese</Option>
                                    <Option value="Italian">Italian</Option>
                                </Select>
                            </div>
                        </div>
                        <Divider orientation="left" style={{marginTop:'20px'}}/>
                        <Button
                            style={{marginTop : '30px'}}
                            onClick={() => {
                                setToggle(true)
                            }} variant="contained" color="primary">
                                <PlusOutlined /><span style={{marginLeft:'4px'}}>Create Post</span>
                        </Button>
                    </Col>
                    {loading ? (
                        <h1> <LoadingOutlined /></h1>
                    ) : (
                            <Col span={18} className={classes.root}>
                                <Grid container spacing={3} style={{ width: "100%", margin: 'auto' }}>
                                    {data &&
                                        data?.getPosts?.map((post) => {
                                                return (
                                                    <Grid item xs={12} sm={6} lg={3}>
                                                        <div key={post.id} style={{ marginBottom: 20}}>
                                                            <PostCard post={post} />
                                                        </div>
                                                    </Grid>
                                                )
                                            }

                                        )
                                    }
                                </Grid>
                            </Col>
                        )}
                </Row>
            )}
        </div>
    );
}

export default Recipe;