import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import produce from 'immer'

export interface PostT {
  postID: string
  title: string
  authorUsername: string
  authorEmail: string
  description: string
  images: string | null
  videos: string | null
  comments: CommentT[]
  likes: Like[]
  createdAt: string
  updatedAt: string
  commentCount: number
  likeCount: number
  loggedInUserLiked: boolean
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
      state.data.push(...action.payload)
    },
    setPosts: (state, action) => {
      state.data = action.payload
    },
    addFilteredPosts: (state, action) => {
      state.filteredData.push(...action.payload)
    },
    incrementComments: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const postToUpdate = state.data.find(post => post.postID === postId)

      if (postToUpdate) {
        postToUpdate.commentCount += 1
      }
    },
    addOrToggleLike: (state, action) => {
      const postID = action.payload
      const post = state.data.find((post: PostT) => post.postID === postID)

      if (post) {
        post.loggedInUserLiked = !post.loggedInUserLiked
        post.likeCount += post.loggedInUserLiked ? 1 : -1
      }
    },
    removeLike: (state, action) => {
      const { postId, author } = action.payload
      const post = state.data.find(p => p.postID === postId)
      if (post) {
        post.likes = post.likes.filter(like => like.author !== author)
      }
    }
  }
})

export const {
  setPosts,
  addOrToggleLike,
  addPost,
  removeLike,
  addFilteredPosts,
  incrementComments
} = postsSlice.actions

export default postsSlice.reducer
