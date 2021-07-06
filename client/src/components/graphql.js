import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
 query GetPosts($category : String, $search_str : String) {
    getPosts(category : $category, search_str : $search_str){
        id
        title
        content
        image
        youtube
        createdAt
        createdAt
        catagory
        username
        commentCount
        comments{
          id
          createdAt
          username
          body
        }
        likes{
          id
           createdAt
          username
        }
        likeCount
      }
  }
`;