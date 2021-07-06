import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from './MyPopup';

function PostCard({
  post: { title,content,catagory, image, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="postcard-container">
      <Card.Content style={{padding : '0px'}} as={Link} to={`/recipes/${id}`} >
        <img src={image} width="100%" alt="no image" style={{margin:'0', minHeight:'200px'}}/>
        {/* <Card.Header style={{textAlign:'left'}}>@{username}</Card.Header> */}
        <Card.Description align="left" style={{marginTop:'5px'}}><h4>{title}</h4></Card.Description>
        <Card.Meta style={{textAlign:'left'}}>
          <p>{moment(createdAt).fromNow(true)} ago by @{username}</p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <span style={{float:'left'}}>{catagory}</span>
        <div style={{float : 'right'}}>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Button as="div"  labelPosition="right">
            <MyPopup content="Comment on post">
                <span>
                  <Icon name="comments" color="blue"/>
                  <span>
                    {commentCount}
                  </span>
                </span>
            </MyPopup>
          </Button>
          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </div>
  );
}

export default PostCard;

{/* <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card> */}