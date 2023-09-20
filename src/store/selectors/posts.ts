import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Post } from '../reducers/posts'

export const getAllPosts = (state: RootState) => state.posts
export const selectPostById = createSelector(
  [getAllPosts, (_, postId) => postId],
  (postsState, postId) => {
    return postsState.data.find(post => post.id === postId) || null
  }
)

export const selectCommentsForPost = (postId: string) =>
  createSelector([getAllPosts], postsState => {
    const post: Post | undefined = postsState.data.find(p => p.id === postId)

    return post ? post.comments : []
  })

// Select all posts
export const selectAllPosts = createSelector(
  [getAllPosts],
  postsState => postsState.data
)

export const selectFilteredPosts = createSelector(
  [selectAllPosts, getAllPosts],
  (allPosts, postsState) =>
    allPosts.filter(post =>
      post.title.toLowerCase().includes(postsState.searchTerm.toLowerCase())
    )
)
