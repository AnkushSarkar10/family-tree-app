<script setup lang="ts">
import { Database } from '~~/types/public'

definePageMeta({
  middleware: ['auth']
})
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const formData = reactive({
  Name: ''
})
const ValidName = computed(() => {
  if (formData.Name.length >= 4) {
    return true
  }
  return false
})
// creats new user if they dont exist
const AddUserToDb = async () => {
  const { error } = await client
    .from('Users')
    .insert({ uid: (user.value?.id as string), Name: formData.Name })
  if (error) throw error
  console.log('added user to db')
  navigateTo('/')
}

onMounted(() => {
  watchEffect(() => {
  })
})
</script>


<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        Family Vistas
      </h1>
      <form @submit.prevent="" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Set Name</p>

        <div>
          <label for="email" class="sr-only">Name</label>

          <div class="relative">
            <input v-model="formData.Name" type="text" required id="text" name="text"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter User Name" />

          </div>
        </div>

        <button @click.prevent="AddUserToDb" :disabled="!ValidName" :class="{ 'opacity-80': !ValidName }"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
          Set Name
        </button>

      </form>
    </div>
  </div>
</template>
