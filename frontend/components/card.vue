<template lang="pug">
  div.post-card
    div.header.flex-row
      div.name.px-1.rounded-top {{ user }}
      div.gap.flex-fill
      div.ago.px-1.rounded-top {{ timeAgo }}
    b-card.card.post-item.bg-dark.rounded-bottom(no-body)
      b-card-body.px-1.py-0.post-content {{ content }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRefs, useContext, computed } from '@nuxtjs/composition-api'
import { DateTime } from 'luxon'

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
    const user = computed(() => post.value?.user?.name || '')
    const content = computed(() => post.value?.content || '')
    const timeAgo = computed(() => {
      const timeStr = post.value?.createdAt
      if (!timeStr) return ''
      const time = DateTime.fromISO(timeStr)
      return time.setLocale('en').toRelative({ style: 'short' })
    })

    onMounted(async() => {
      const postData: PostData = await $api(getPost(postId.value))()
      try {
        postData.user = await $api(getUser(postData.userId))()
      } finally {
        post.value = postData
      }
    })

    return { user, content, timeAgo }
  },
})
</script>

<style lang="sass" scoped>
.post-card
  font-size: 12px
  .header
    max-width: 320px
    .name, .ago
      flex: 0 1 auto
      background-color: black
      border: grey solid 1px
      border-bottom: none
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    .gap
      width: 5px
      border-bottom: grey solid 1px
  .card
    width: 320px
    height: 180px
    border: grey solid 1px
    border-top: none
    border-top-left-radius: 0
    border-top-right-radius: 0
    overflow-x: hidden
    overflow-y: auto 
    .post-content
      white-space: pre-wrap
</style>
