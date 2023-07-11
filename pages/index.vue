<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient();
const user = useSupabaseUser();

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
  const { data } = await useFetch('/api/db', {
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
    <div ref="container"></div>
  </div>
</template>