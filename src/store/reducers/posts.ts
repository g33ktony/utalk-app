import { ThunkAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../apollo/server'
import { GET_ALL_POSTS } from '../../apollo/mock/queries'

export interface Post {
  id: string
  title: string
  author: string
  description: string
  image: string
  comments: CommentT[]
  likes: Like[]
}

export type Like = {
  author: string
  id: string
}

export type CommentT = {
  id: string
  text: string
}

interface PostsState {
  searchTerm: string
  data: Array<Post>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  searchTerm: '',
  data: [],
  status: 'idle',
  error: null
}

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    const response = await client.query({
      query: GET_ALL_POSTS
    })

    return response.data.getAllPosts
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    setPosts: (state, action) => {
      state.data = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload
      const post = state.data.find(p => p.id === postId)
      if (post) {
        if (!post.comments) {
          post.comments = []
        }
        post.comments.push(comment)
      }
    },
    addLike: (state, action) => {
      const { postId, author } = action.payload
      const post = state.data.find(p => p.id === postId)
      if (post) {
        const newLike = {
          id: Math.random().toString(36).substr(2, 9),
          author
        }
        post.likes = [...post.likes, newLike]
      }
    },
    removeLike: (state, action) => {
      const { postId, author } = action.payload
      const post = state.data.find(p => p.id === postId)
      if (post) {
        console.log('post', post)
        post.likes = post.likes.filter(like => like.id !== author)
      }
    }
  }
})

export const {
  setPosts,
  setSearchTerm,
  addComment,
  addLike,
  addPost,
  removeLike
} = postsSlice.actions

export default postsSlice.reducer
