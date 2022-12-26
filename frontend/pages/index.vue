<template lang="pug">
  #index.text-white.px-2.py-5
    #title.text-center
      span.display-1.my-5: strong Cardio
    .page-container.text-center(v-if="loggedIn")
      div Logged in as {{ name }}
      .my-2
        button.btn.btn-primary.mr-2(@click="logout()") LOGOUT
        nuxt-link(to="/me"): button.btn.btn-primary() MY ACCOUNT
      .row.my-5
        .col.col-md-10.col-9.px-2
          textarea.bg-dark.text-white.w-100.rounded.px-1(type="text" v-model="postContent")
        .col.col-md-2.col-3.px-2
          button.btn.btn-primary.w-100.h-100(
            :disabled="postButtonDisabled"
            @click="post('edit')"
          ) POST
    form.text-center(v-else :action="googleLoginUrl" method="post")
      input.btn.btn-primary.m-2(type="submit" value="Login with Google")
    #cards-container.page-container
      .row.my-4(
        v-infinite-scroll="fetchMorePosts"
        infinite-scroll-disabled="stopLoad"
      )
        .col.card-container.my-3.middle-center(v-for="postId in postIds")
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
    const { $api, $toast } = useContext()

    const name = computed(() => userStore.name)
    const loggedIn = computed(() => userStore.loggedIn)
    const googleLoginUrl = `${useContext().$config.apiHost}/login/google`
    const logout = () => {
      store.dispatch('user/logout')
    }

    const postContent = ref('')
    const postButtonDisabled = ref(false)
    const post = async() => {
      postButtonDisabled.value = true
      try {
        await $api(createPost())({ content: postContent.value })
        postContent.value = ''
        $toast.success('Post success.')
        await fetchPosts()
      } catch (err) {
        $toast.error(err as string)
      }
      postButtonDisabled.value = false
    }

    const postIds = ref<string[]>([])
    const stopLoad = ref(true)
    const fetchPosts = async() => {
      postIds.value = await $api(getLatestPosts({ limit: 16 }))()
      stopLoad.value = false
    }
    const fetchMorePosts = async() => {
      const limit = 8
      const postCount = postIds.value.length
      const beforeId = postIds.value[postCount - 1]
      const query = { limit, beforeId }
      const newPosts = await $api(getLatestPosts(query))()
      if (!newPosts.length) stopLoad.value = true
      else postIds.value = postIds.value.concat(newPosts)
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
      stopLoad,
      fetchMorePosts,
    }
  },
})
</script>

<style lang="sass" scoped>
#index
  #title>span
    font-weight: 900
  textarea
    resize: none
    height: 120px
    vertical-align: top
  .page-container
    margin: 0 auto
    width: 1360px
    @media screen and (max-width: 1400px)
      width: 1020px
    @media screen and (max-width: 1100px)
      width: 680px
    @media screen and (max-width: 720px)
      width: 340px
    .row
      margin-left: 0
      margin-right: 0
      .col
        padding-left: 0
        padding-right: 0
  #cards-container
    .card-container
      flex: 0 0 25%
      @media screen and (max-width: 1400px)
        flex: 0 0 33.33333%
      @media screen and (max-width: 1100px)
        flex: 0 0 50%
      @media screen and (max-width: 720px)
        flex: 0 0 100%
</style>
