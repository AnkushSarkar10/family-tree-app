<script setup>
definePageMeta({
  middleware: ['auth']
})
const client = useSupabaseClient();
const formData = reactive({
  email: '',
  otp: '',
})
const showVerify = ref(false);

const ValidEmail = computed(() => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
    return (true)
  }
  return (false)
})


// creats new user if they dont exist
const SignInUser = async () => {
  const { data, error } = await client.auth.signInWithOtp({
    email: formData.email
  })
  if (error) throw error
  console.log("sent otp", data);
  showVerify.value = true;
  console.log(showVerify.value);
}

const VerifyOtp = async () => {
  const { data, error } = await client.auth.verifyOtp({ email: formData.email, token: formData.otp, type: 'email' })
  if (error) throw error
  if (data) {
    console.log("done");
  }
}

const user = useSupabaseUser();
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/');
    }
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
        <p class="text-center text-lg font-medium">Sign In</p>

        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input v-model="formData.email" type="email" required id="email" name="email"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Enter email" />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </span>
          </div>
        </div>

        <button @click.prevent="SignInUser" :disabled="!ValidEmail" :class="{ 'opacity-80': !ValidEmail }"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
          Generate OTP
        </button>

        <div v-if="showVerify">
          <label for="otp" class="sr-only">Verify OTP</label>

          <div class="relative">
            <input v-model="formData.otp" type="text"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Verification Code" />
          </div>

          <button @click.prevent="VerifyOtp"
            class="block w-full mt-5 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
            Verify
          </button>
          <p class="mt-5 text-sm text-gray-500">Did not recieve email? <button @click=""
              class="text-blue-600 underline">Resend</button>
          </p>
        </div>

      </form>
    </div>
  </div>
</template>