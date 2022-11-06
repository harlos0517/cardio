<template lang="pug">
  #index.text-white.px-2.py-5
    #title.text-center
      span.display-1.my-5: strong Cardio
    .container.text-center(v-if="loggedIn")
      div Logged in as {{ name }}
      .my-2
        button.btn.btn-primary(@click="logout()") LOGOUT
      .row.my-5
        .col-md-10.col-9
          textarea.bg-dark.text-white.w-100.rounded.px-1(type="text" v-model="postContent")
        .col-md-2.col-3
          button.btn.btn-primary.w-100.h-100(
            :disabled="postButtonDisabled"
            @click="post('edit')"
          ) POST
    form.text-center(v-else :action="googleLoginUrl" method="post")
      input.btn.btn-primary.m-2(type="submit" value="Login with Google")
    .container
      .row.row-cols-xl-4.row-cols-lg-3.row-cols-sm-2.row-cols-1.my-4
        .col.my-2.middle-center(v-for="postId in postIds")
          Card(:postId="postId" :key="postId")
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

import { StoreState } from '@/store'

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
    const postButtonDisabled = ref(false)
    const post = async () => {
      postButtonDisabled.value = true
      try {
        await $api(createPost())({ content: postContent.value })
        postContent.value = ''
      } catch (err) {
        console.error(err)
      }
      await fetchPosts()
      postButtonDisabled.value = false
    }

    const postIds = ref<string[]>([])
    const fetchPosts = async() => {
      postIds.value = await $api(getLatestPosts())()
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
      postButtonDisabled,
      post,
      postIds,
    }
  },
})
</script>

<style lang="sass" scoped>
#index
  background-color: #21130A
  min-height: 100vh
  #title>span
    font-weight: 900
  textarea
    resize: none
    height: 120px
    vertical-align: top
</style>
