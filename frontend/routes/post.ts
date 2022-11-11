import * as PostApi from '@api/post'
import { axiosRequest, METHODS, toQueryString } from '@/middleware/api'

export const getPost = (postId: string) =>
  axiosRequest<PostApi.GetPost.Response>(METHODS.GET, '/post/' + postId)

export const getLatestPosts = (query: { limit?: number, beforeId?: string }) =>
  axiosRequest<PostApi.GetLatestPosts.Response>(METHODS.GET, `/posts/latest${toQueryString(query)}`)

export const getMyPosts = () =>
  axiosRequest<PostApi.GetMyPosts.Response>(METHODS.GET, '/posts/me')

export const createPost = () =>
  axiosRequest<PostApi.CreatePost.Response, PostApi.CreatePost.Request>(METHODS.POST, '/post')
