import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      author
      description
      image
      comments
      likes
    }
  }
`
