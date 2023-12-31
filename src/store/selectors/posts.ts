import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'
import { PostT } from '../reducers/posts'

export const getAllPosts = (state: RootState) => state.posts

export const selectPostById = createSelector(
  [getAllPosts, (_, postId) => postId],
  (postsState, postId) => {
    return postsState.data.find(post => post.postID === postId) || null
  }
)

export const selectCommentsForPost = (postId: string) =>
  createSelector([getAllPosts], postsState => {
    const post: PostT | undefined = postsState.data.find(
      p => p.postID === postId
    )

    return post ? post.comments : []
  })

export const selectAllPosts = createSelector(
  [getAllPosts],
  postsState => postsState.data
)

export const selectFilteredPosts = (state: RootState) =>
  state.posts.filteredData
