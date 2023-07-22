<script setup lang="ts">
useHead({
  title: 'Famili Vistas',
})

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser();
const { fetchUserFamilyCsv } = useUtils();



const serverData = ref();
const fetchUserFromServerRoute = async () => {
  const { data } = await useFetch('/api/getUsers', {
    headers: useRequestHeaders(['cookie']),
    query: { uid: user.value?.id }
  })
  serverData.value = data;
}


fetchUserFamilyCsv().then((dataFlattened) => {
  serverData.value = dataFlattened
})
onMounted(() => {

})

</script>

<template>
  <div class="flex flex-col gap-5 h-screen items-center">
    <NavBar />
    <ClientOnly fallback-tag="span">
      <d3-org-chart-tree></d3-org-chart-tree>
      <template #fallback>
        <!-- this will be rendered on server side -->
        <div class="flex w-full h-full gap-10 justify-center items-center">
          <h1 class="text-3xl font-medium">Fetching Data ...</h1>
          <div
            class="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
