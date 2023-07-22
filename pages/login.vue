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
      <button class="flex mx-auto items-center gap-3 text-teal-600" @click="navigateTo('/')">
        <svg class="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
            fill="currentColor" />
        </svg>
        <span class="text-center text-3xl font-bold">Family Vistas</span>
      </button>
      <form @submit.prevent="" class="mb-0 mt-24 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Sign In</p>

        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input v-model="formData.email" type="email" required id="email" name="email"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-500" placeholder="Enter email" />

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
          class="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold uppercase text-white">
          Generate OTP
        </button>

        <div v-if="showVerify">
          <label for="otp" class="sr-only">Verify OTP</label>

          <div class="relative">
            <input v-model="formData.otp" type="text"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" placeholder="Verification Code" />
          </div>

          <button @click.prevent="VerifyOtp"
            class="block w-full mt-5 rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold uppercase text-white">
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