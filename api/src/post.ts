export type Post = {
  userId: string
  createdAt: Date
  content: string
}

export type PostResponse = Post

export namespace GetPost {
  export type Response = PostResponse
}

export namespace GetLatestPosts {
  export type Response = PostResponse[]
}

export namespace GetMyPosts {
  export type Response = PostResponse[]
}

export namespace CreatePost {
  export type Request = {
    content: string
  }
  export type Response = PostResponse
}
