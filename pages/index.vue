<script setup lang="ts">
import { Database } from "~~/types/public"
definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { makeFakeUser } = useUtils();

const logout = () => {
  client.auth.signOut().then(() => {
    console.log('signed out')
  })
}

const container = ref(null)

onMounted(() => {
})
const serverData = ref();
const fetchUserFromServerRoute = async () => {
  const { data } = await useFetch('/api/getUsers', {
    headers: useRequestHeaders(['cookie']),
    query: { uid: user.value?.id }
  })
  serverData.value = data;
}


fetchUserFromServerRoute()
</script>

<template>
  <div class="flex flex-col gap-5 pt-10 h-screen items-center">
    <!-- nav -->
    <div class="flex gap-10">
      <button @click="navigateTo('/login')" class="bg-red-700 text-white px-3 py-1 rounded-md">Login</button>
      <button @click="logout" class="bg-blue-700 text-white px-3 py-1 rounded-md">Log out</button>
    </div>

    <h1>Family Vista</h1>

    <h2>{{ serverData }}</h2>
    <button @click="makeFakeUser" class="bg-green-500 px-2 py-1 text-white font-medium rounded-md">Gen fake user</button>
    <div ref="container"></div>
  </div>
</template>