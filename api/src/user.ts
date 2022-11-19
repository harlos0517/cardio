export type User = {
  googleId?: string
  discordId?: string
  email?: string
  username?: string
  name: string
}

export type UserResponse = User

export namespace GetMe {
  export type Response = UserResponse
}

export namespace GetUser {
  export type Response = UserResponse
}

export namespace EditMe {
  export type Request = {
    name: string
  }
  export type Response = UserResponse
}

export namespace Login {
  export type Request = {
    username: string
    password: string
  }
  export type Response = UserResponse
}

export namespace LoginGoogle {
  export type Response = UserResponse
}

export namespace Logout {}
