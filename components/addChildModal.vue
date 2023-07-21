<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'


defineProps<{
    title?: string,
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
}>()
</script>

<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="flex flex-col max-w-2xl p-4 bg-white rounded-md">
        <h1 class="text-xl">
            {{ title }}
        </h1>
        <div>
            yuh
        </div>
    </VueFinalModal>
</template>
