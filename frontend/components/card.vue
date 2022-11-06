<template lang="pug">
  div.post-card(v-if="post")
    div.header.flex-row
      div.name.px-1.rounded-top {{ post.user ? post.user.name : 'unknown' }}
      div.gap.flex-fill
      div.
    b-card.card.post-item.bg-dark.rounded-bottom(no-body)
      b-card-body.px-1.py-0.post-content {{ post.content }}
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, toRefs, useContext } from '@nuxtjs/composition-api'
// import { StoreState } from '@/store'

import { User } from '@api/user'
import { Post } from '@api/post'

import { getUser } from '@/routes/user'
import { getPost } from '@/routes/post'

type PostData = Post & { user?: User }

export default defineComponent({
  props: {
    postId: { type: String, required: true }
  },
  setup(props) {
    const { postId } = toRefs(props)
    const { $api } = useContext()
  
    const post = ref<PostData>()

    onMounted(async() => {
      const postData: PostData = await $api(getPost(postId.value))()
      try {
        postData.user = await $api(getUser(postData.userId))()
      } finally {
        post.value = postData
      }
    })

    return { post }
  },
})
</script>

<style lang="sass" scoped>
.post-card
  .name
    background-color: black
    border: grey solid 1px
    border-bottom: none
  .gap
    border-bottom: grey solid 1px
  .card
    width: 240px
    height: 135px
    border: grey solid 1px
    border-top: none
    border-top-left-radius: 0
    border-top-right-radius: 0
    overflow-x: hidden
    overflow-y: auto 
    .post-content
      white-space: pre-wrap
</style>
