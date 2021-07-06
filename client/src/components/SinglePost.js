import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';
import { MessageOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from './MyPopup';
import YoutubeEmbed from '../FormItems/youtubeEmbed';

function SinglePost(props) {
  const postId = props.match.params.postId;
  console.log(postId)
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (data?.getPost === undefined) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = data?.getPost;
console.log(data?.getPost)
    postMarkup = (
      <Grid  className="postcard-container" style={{width:'90%',margin:'auto'}}>
        <Grid.Row>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content style={{padding:'30px'}}>
                {/* <Card.Header><p style={{textAlign:'left'}}></p></Card.Header> */}
                <Card.Description align="left" style={{marginLeft:'10px'}}><h3>{data?.getPost?.title}</h3></Card.Description>
                <hr/>
                <Card.Description align="left" style={{margin:'20px 0px 10px 30px'}}>
                  <div>
                    {data?.getPost?.content.split('\n').map((one, index)=>{
                      if(!one)
                        return "";
                      return (
                        <div style={{padding : '5px'}}><PlusCircleTwoTone style={{marginRight:'8px'}}/>{one}</div>
                      )
                    })}
                  </div>
                </Card.Description>
                <Card.Meta style={{marginTop:'20px'}} align="right">
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <MyPopup content="Comment on post">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log('Comment on post')}
                    >
                        <Icon name="comments" color="blue"/>
                      <span basic color="blue" pointing="left">
                        {commentCount}
                      </span>
                    </Button>
                  </MyPopup>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                  <span style={{marginLeft:'10px',textAlign:'right'}}>created by @{username} {moment(createdAt).fromNow()}</span>
                </Card.Meta>
              <hr />
            </Card.Content>
            {comments.map((comment) => (
              <div fluid key={comment.id} style={{padding:'10px'}}>
                <Card.Content>
                  <Card.Header></Card.Header>
                  <Card.Meta>
                    <span style={{float:'left', marginLeft:'10px'}}><MessageOutlined style={{fontSize:'17px', color:'#33f'}}/> @{comment.username} {" "} {moment(comment.createdAt).fromNow()}</span>
                    {user && user.username === comment.username && (
                      <span style={{float:'right',marginRight:'10px'}}><DeleteButton postId={id} commentId={comment.id} /></span>
                    )}
                  </Card.Meta>
                  <p style={{clear:'both'}}>{comment.body}</p>
                </Card.Content>
              </div>
            ))}
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Image
            style={{width:'100%',margin:'auto'}}
              src={data?.getPost?.image}
            />
            {data.getPost.youtube && <div style={{marginTop:'20px'}}>
              <YoutubeEmbed embedId={data.getPost.youtube}/>
            </div>}
            {user && (
              <Form style={{marginTop : '30px'}}>
                <p style={{float:'left', marginTop : '20px'}}>Post a comment</p>
                <div style={{float:'left', marginLeft : '20px'}} className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Comment.."
                    name="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInputRef}
                  />
                  <button
                    type="submit"
                    className="ui button teal"
                    disabled={comment.trim() === ''}
                    onClick={submitComment}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      content
      image
      youtube
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;