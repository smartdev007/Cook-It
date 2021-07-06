import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from './MyPopup';

import { FETCH_POSTS_QUERY } from './graphql';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    refetchQueries:[{query:FETCH_POSTS_QUERY}]
  });

  const likeButton = user ? (
    liked ? (
      <Icon name="heart" color="red"/>
    ) : (
      <Icon name="heart" color="green"/>
    )
  ) : (
      <Link  to="/login"><Icon name="heart" color="green"/></Link>
  );

  return (
    <Button as="div" labelPosition="right" onClick={() => {
        likePost({
            variables:{
                postId: id
            }
        })
    }}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      <span>
        {likeCount}
      </span>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;