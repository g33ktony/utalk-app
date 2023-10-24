import axios from 'axios'

const BASE_URL =
  'https://utalk--3ch4dqk.bravesmoke-1a9df4bd.eastus2.azurecontainerapps.io/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const logIn = body => {
  const URL = `/auth/signin`

  return api.post(`${BASE_URL}${URL}`, body)
}

export const signUp = body => {
  const URL = `/auth/signup`

  return api.post(`${BASE_URL}${URL}`, body)
}

export const fetchPosts = config => {
  return api.get('/posts', config)
}

export const likePost = (postId, headers) => {
  const URL = `/posts/${postId}/like`
  const payload = {
    postId
  }

  return api.post(`${BASE_URL}${URL}`, payload, headers)
}

export const getPostComments = (postId, token) => {
  const URL = `/posts/${postId}/comments`

  return api.get(`${BASE_URL}${URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getMedia = ({ postId, token }) => {
  const URL = `/posts/${postId}/media`

  return api.get(`${BASE_URL}${URL}`, {
    responseType: 'arraybuffer',
    responseEncoding: 'base64',
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: `Bearer ${token}`
    }
  })
}

export const postMedia = (file, postBody, token) => {
  const URL = '/posts/upload'
  const formData = new FormData()

  formData.append('title', postBody.title)
  formData.append('content', postBody.content)
  formData.append('file', file)

  return api.post(`${BASE_URL}${URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const addComment = (postId, commentData, token) => {
  const URL = `/posts/${postId}/comments`

  return api.post(`${BASE_URL}${URL}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const setUserAvatar = (file, token) => {
  const URL = '/user/avatar'
  const formData = new FormData()
  formData.append('file', file)

  return api.post(`${BASE_URL}${URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const setUserName = (payload, token) => {
  const URL = '/user'

  return api.post(`${BASE_URL}${URL}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getAvatar = (payload, token) => {
  const URL = '/user/avatar'

  return api.get(
    `${BASE_URL}${URL}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export default api
