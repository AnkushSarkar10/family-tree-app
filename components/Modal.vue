<script setup lang="ts">
import { VueFinalModal, useModal } from 'vue-final-modal'
import addSpouceModal from './addSpouceModal.vue';
import addParentModal from './addParentModal.vue';
import addChildModal from './addChildModal.vue';
import editNodeModal from './editNodeModal.vue'

const openAddSpouceModal = () => {
    const { open, close } = useModal({
        component: addSpouceModal,
        // childData: ,
        // parentData:,
        attrs: {
            title: "spouce",
            data: props.data,
            onConfirm() {
                close();
            },
        },
    });
    open();
}
const openAddParentModal = () => {
    const { open, close } = useModal({
        component: addParentModal,
        attrs: {
            title: "parent",
            onConfirm() {
                close();
            },
        },
    });
    open();
}
const openAddChildModal = () => {
    const { open, close } = useModal({
        component: addChildModal,
        attrs: {
            title: "child",
            onConfirm() {
                close();
            },
        },
    });
    open();
}
const openEditNodeModal = () => {
    const { open, close } = useModal({
        component: editNodeModal,
        attrs: {
            title: "edit",
            onConfirm() {
                close();
            },
        },
    });
    open();
}

interface Iconfig {
    canAddParent: boolean;
    canAddSpouce: boolean;
}

const props = defineProps<{
    title?: string,
    config: Iconfig,
    data: any
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()
</script>

<template>
    <VueFinalModal class="flex justify-center items-center" content-class="flex flex-col max-w-2xl p-4 bg-white rounded-md">
        <h1 class="text-xl">
            <!-- {{ title }} -->
            <!-- {{ test }} -->
        </h1>
        <div class="flex flex-wrap items-center justify-center gap-5 py-6 mx-4 ">
            <div v-if="config?.canAddSpouce"
                class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500">
                <span
                    class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                <button @click="openAddSpouceModal"
                    class="relative block border border-current bg-white px-5 py-2 font-bold">
                    <Icon name="material-symbols:add-rounded" color="#16a34a" class="text-lg mr-1" />Add Spouce
                </button>
            </div>
            <div v-if="config?.canAddParent"
                class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500">
                <span
                    class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                <button @click="openAddParentModal" class="relative block border border-current bg-white px-5 py-2 font-bold">
                    <Icon name="material-symbols:add-rounded" color="#16a34a" class="text-lg mr-1" />Add Parent
                </button>
            </div>
            <div
                class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500">
                <span
                    class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                <button @click="openAddChildModal" class="relative block border border-current bg-white px-5 py-2 font-bold">
                    <Icon name="material-symbols:add-rounded" color="#16a34a" class="text-lg mr-1" />Add Child
                </button>
            </div>
            <div
                class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500">
                <span
                    class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
                <button @click="openEditNodeModal" class="relative block border border-current bg-white px-5 py-2 font-bold">
                    <Icon name="ic:outline-edit" color="#16a34a" class="text-lg mr-1" />Edit Node
                </button>
            </div>
        </div>
        <!-- <slot /> -->
        <!-- <button class="mt-1 ml-auto px-2 border rounded-lg" @click="emit('confirm')">
            Confirm
        </button> -->
    </VueFinalModal>
</template>
