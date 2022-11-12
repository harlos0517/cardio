<template lang="pug">
  #me.text-white.px-3.py-5
    .container
      .row
        h2 My account
      .row.my-2
        b-input-group
          b-input-group-prepend
            b-input-group-text Display Name
          b-form-input.bg-dark.text-white(
            v-if="displayNameIsEditing"
            v-model="displayNameInput"
          )
          b-form-input.hide-input-border.text-white(
            v-else
            v-model="displayNameInput"
            :disabled="true"
          )
          b-input-group-append
            b-button.bg-primary(
              v-if="!displayNameIsEditing"
              @click="editDisplayName"
            ) Edit
            b-button.bg-success(
              v-else
              @click="changeDisplayName"
            ) Confirm
      .row
        nuxt-link(to="/"): button.btn.btn-primary() BACK
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  onMounted,
  useContext
 } from '@nuxtjs/composition-api'
import { StoreState } from '@/store'

import { editMe } from '@/routes/user'

export default defineComponent({
  setup() {
    const store = useStore() as StoreState
    const userStore = store.state.user
    const { $api, $toast, redirect } = useContext()

    const loggedIn = userStore.loggedIn
    if (!loggedIn) redirect('/')
    const displayNameInput = ref(userStore.name || '')
    const displayNameIsEditing = ref(false)
    const editDisplayName = () => {
      displayNameIsEditing.value = true
    }
    const changeDisplayName = async() => {
      try {
        const user = await $api(editMe())({ name: displayNameInput.value })
        store.commit('user/setUser', user)
        displayNameIsEditing.value = false
        displayNameInput.value = user.name || ''
        $toast.success('Successfully changed display name.')
      } catch (err) {
        $toast.error(err as string)
      }
    }

    onMounted(() => {

    })

    return {
      displayNameInput,
      displayNameIsEditing,
      editDisplayName,
      changeDisplayName,
    }
  },
})
</script>

<style lang="sass" scoped>
#me
  background-color: #21130A
  min-height: 100vh
  .hide-input-border
    background-color: transparent
    border: none
</style>