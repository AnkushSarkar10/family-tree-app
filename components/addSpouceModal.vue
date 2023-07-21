<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Database } from "~~/types/public";

const props = defineProps<{
    title?: string,
    data?: any
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()

const genderRef = ref('M')
const gendeOptions = ref([
    { text: 'Male', value: 'M' },
    { text: 'Female', value: 'F' }
])
const spouseName = ref('');
const client = useSupabaseClient<Database>();

const addSpouse = async () => {
    const { error } = await client
        .from('family_members')
        .update({ hasSpouse: true, spouseName: spouseName.value, spouseGender: genderRef.value })
        .match({ uid: props.data.uid, id: props.data.id })
    if (error) throw error
    reloadNuxtApp()
}
</script>

<template>
    <VueFinalModal class="flex justify-center items-center" content-class="flex flex-col max-w-3xl p-4 bg-white rounded-md">
        <div class="bg-white w-full">
            <div class="px-4 py-5">
                <div class="relative mt-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div class="relative flex justify-center text-sm leading-5">
                        <span class="px-2 text-gray-500 bg-white">
                            Enter spouse Data
                        </span>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="w-full space-y-6">
                        <div class="w-full">
                            <div class=" relative ">
                                <input v-model="spouseName" type="text" id="search-form-price"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Spouce Name" />
                            </div>
                        </div>
                        <!-- yuh -->
                        <select v-model="genderRef"
                            class="w-full block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option v-for="option in gendeOptions" :key="option.value" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                        <!-- yuh -->
                        <div>
                            <span class="block w-full rounded-md shadow-sm">
                                <button @click="addSpouse" type="button"
                                    class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Add Spouse
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-10 py-6 border-t-2 border-gray-200 bg-gray-50">
                <p class="text-xs leading-5 text-gray-500">
                    This data are display for information and can change
                </p>
            </div>
        </div>

    </VueFinalModal>
</template>
