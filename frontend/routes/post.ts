import * as PostApi from '@api/post'
import { axiosRequest, METHODS } from '@/middleware/api'

export const getPostById = (postId: string) =>
  axiosRequest<PostApi.GetPost.Response>(METHODS.GET, '/post/' + postId)

export const getLatestPosts = () =>
  axiosRequest<PostApi.GetLatestPosts.Response>(METHODS.GET, `/posts/latest`)

export const getMyPosts = () =>
axiosRequest<PostApi.GetMyPosts.Response>(METHODS.GET, '/posts/me')

export const createPost = () =>
axiosRequest<PostApi.CreatePost.Response, PostApi.CreatePost.Request>(METHODS.POST, '/post')
