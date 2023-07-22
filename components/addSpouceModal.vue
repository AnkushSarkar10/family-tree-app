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
    <VueFinalModal class="flex justify-center items-center" content-class="flex flex-col w-5/12 p-4 bg-white rounded-md">
        <div class="bg-white w-full">
            <div class="px-4 py-5">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div class="relative flex justify-center text-sm leading-5">
                        <span class="px-2 text-gray-500 bg-white">
                            Enter Spouse Data
                        </span>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="w-full space-y-6">
                        <div class="w-full">
                            <div class=" relative ">
                                <input v-model="spouseName" type="text" id="search-form-price"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    placeholder="Spouce Name" />
                            </div>
                        </div>
                        <select v-model="genderRef"
                            class="w-full block px-3 py-2 bg-white border border-gray-300 appearance-none rounded-md shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-500">
                            <option v-for="option in gendeOptions" :key="option.value" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                        <div class="w-full relative inline-block focus:outline-none focus:ring">
                            <span
                                class="w-full absolute inset-0 translate-x-1.5 translate-y-1.5 bg-teal-500 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <button @click="addSpouse"
                                class="w-full relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                                <Icon name="material-symbols:add-rounded" color="black" class="text-lg mr-1" />
                                Add Spouce
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </VueFinalModal>
</template>
