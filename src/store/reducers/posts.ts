import { createSlice } from '@reduxjs/toolkit'

export interface PostT {
  id: string
  title: string
  author: string
  description: string
  image: string | null
  video: string | null
  comments: CommentT[]
  likes: Like[]
  createdAt: string
  updatedAt: string
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
  data: [
    {
      id: 'sdakjhasiu345',
      title: 'Sample Post',
      author: 'John Doe',
      description: 'This is a sample post.',
      video: null,
      image: 'https://picsum.photos/200',
      comments: [
        { id: '34s56ewfgdsa', author: 'Lorem Past', text: 'Nice post!' },
        { id: 'daksdasd', author: 'Lorem OLD', text: 'REALLY NICE' }
      ],
      likes: [
        { id: 'fsdjfghywas', author: 'Lorem OLD' },
        { id: 'fsdafdsfs', author: 'Lorem Past' }
      ],
      createdAt: '09/11/2023',
      updatedAt: '09/11/2023'
    },
    {
      id: 'fdsjk34r8iu',
      title: 'Sample Post 2',
      author: 'Robert Lobato',
      description: 'This is a second sample post.',
      video: null,
      image: 'https://picsum.photos/200',
      comments: [
        { id: '3456ewfgdddsa', author: 'Lorem Past', text: 'Nice post!' },
        { id: 'dasdssasd', author: 'Lorem OLD', text: 'REALLY NICE' }
      ],
      likes: [
        { id: 'fsdjsfghwas', author: 'Lorem OLD' },
        { id: 'fsdffdsfs', author: 'Lorem Past' }
      ],
      createdAt: '09/11/2023',
      updatedAt: '09/11/2023'
    }
  ],
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
    }
    // filterPosts: (state, action) => {
    //   const { data } = state
    //   const searchText = action.payload.toLowerCase()
    //   const filteredPosts = data.filter(
    //     post =>
    //       post.title.toLowerCase().includes(searchText) ||
    //       post.description.toLowerCase().includes(searchText)
    //   )
    //   state.filteredData = filteredPosts
    // }
  }
})

export const {
  setPosts,
  addComment,
  addLike,
  addPost,
  removeLike
  // filterPosts
} = postsSlice.actions

export default postsSlice.reducer
