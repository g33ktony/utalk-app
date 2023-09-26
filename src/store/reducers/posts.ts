import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../apollo/server'
import { GET_ALL_POSTS } from '../../apollo/mock/queries'

export interface PostT {
  id: string
  title: string
  author: string
  description: string
  image: string | null
  video: string | null
  comments: CommentT[]
  likes: Like[]
  createdAt: Date
  updatedAt: Date
}

export type Like = {
  author: string
  id: string
}

export type CommentT = {
  id: string
  text: string
  author: string
}

interface PostsState {
  data: Array<PostT>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  filteredData: Array<PostT>
}

const initialState: PostsState = {
  data: [],
  status: 'idle',
  error: null,
  filteredData: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.data.unshift(action.payload)
    },
    setPosts: (state, action) => {
      state.data = action.payload
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
        post.likes = post.likes.filter(like => like.author !== author)
      }
    },
    filterPosts: (state, action) => {
      const { data } = state
      const searchText = action.payload.toLowerCase()
      const filteredPosts = data.filter(
        post =>
          post.title.toLowerCase().includes(searchText) ||
          post.description.toLowerCase().includes(searchText)
      )
      state.filteredData = filteredPosts
    }
  }
})

export const {
  setPosts,
  addComment,
  addLike,
  addPost,
  removeLike,
  filterPosts
} = postsSlice.actions

export default postsSlice.reducer
