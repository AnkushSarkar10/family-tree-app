<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser();
const {  fetchUserFamilyCsv } = useUtils();



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
    <NavBar/>
    <ClientOnly fallback-tag="span" fallback="Loading comments...">
      <d3-org-chart-tree></d3-org-chart-tree>
    </ClientOnly>
  </div>
</template>
