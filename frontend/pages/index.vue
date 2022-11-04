<template lang="pug">
  #index.text-white
    #title.text-center
      span.display-1.my-5: strong Cardio
    .container.text-center(v-if="loggedIn")
      div Logged in as {{ name }}
      .my-2
        button.btn.btn-primary(@click="logout()") LOGOUT
      .row.my-5
        .col-10
          input.w-100.h-100(type="text" v-model="postContent")
        .col-2
          button.btn.btn-primary.w-100.h-100(@click="post('edit')") POST
      .row.my-5
        .col-3.my-2(v-for="post in posts")
          b-card.post-tiem.bg-dark
            b-card-title {{ post.user ? post.user.name : '' }}
            p {{ post.content }}
    template(v-else)
      form.text-center(:action="googleLoginUrl" method="post")
        input.btn.btn-primary.m-2(type="submit" value="Login with Google")
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
  useContext,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
// import { StoreState } from '@/store'

import { StoreState } from '@/store'

import { User } from '@api/user'
import { Post } from '@api/post'

import { getUser } from '@/routes/user'
import { createPost, getLatestPosts } from '@/routes/post'

export default defineComponent({
  setup() {
    const store = useStore() as StoreState
    const userStore = store.state.user
    const { $api } = useContext()

    const name = computed(() => userStore.name)
    const loggedIn = computed(() => userStore.loggedIn)
    const googleLoginUrl = `${useContext().$config.apiHost}/login/google`
    const logout = () => {
      store.dispatch('user/logout')
    }

    const postContent = ref('')
    const post = async () => {
      await $api(createPost())({ content: postContent.value })
      fetchPosts()
    }

    const posts = ref<(Post & { user?: User })[]>([])
    const fetchPosts = async() => {
      const postsData = await $api(getLatestPosts())()
      posts.value = await Promise.all(postsData.map(async post => {
        const user = await $api(getUser(post.userId))()
        return { ...post, user }
      }))
    }

    onMounted(() => {
      fetchPosts()
    })

    return {
      name,
      loggedIn,
      logout,
      googleLoginUrl,
      postContent,
      post,
      posts,
    }
  },
})
</script>

<style lang="sass" scoped>
#index
  background-color: #470024
  min-height: 100vh
#title>span
  font-weight: 900
</style>
