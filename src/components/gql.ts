
import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(page: $page, limit: $limit) {
      id
      author
      content
      likes
      dislikes
      comments
      reposts
      views
      timestamp
      imageUrl
      isReply
      parentPostId
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likes
    }
  }
`;

export const SUB_NEW_POST = gql`
  subscription OnNewPost {
    newPost {
      id
      author
      content
      likes
      dislikes
      comments
      reposts
      views
      timestamp
      imageUrl
      isReply
      parentPostId
    }
  }
`;
