export type Post = {
  userId: string
  createdAt: string // ISO string
  content: string
}

export type PostResponse = Post

export namespace GetPost {
  export type Response = PostResponse
}

export namespace GetLatestPosts {
  export type Response = string[]
}

export namespace GetMyPosts {
  export type Response = string[]
}

export namespace CreatePost {
  export type Request = {
    content: string
  }
  export type Response = PostResponse
}
