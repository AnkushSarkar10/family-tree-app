<script setup lang='ts'>
import { clamp } from "@vueuse/core"

const draggable = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

const { left, right, top, bottom } = useElementBounding(container);
const { width, height } = useElementBounding(draggable);
const { x, y } = useDraggable(draggable);

const restrictedX = computed(() =>
    clamp(left.value, x.value, right.value - width.value)
);
const restrictedY = computed(() =>
    clamp(top.value, y.value, bottom.value - height.value)
);

</script>

<template>
    <div ref="container" class="w-11/12 min-h-full relative">
        <div ref="draggable" :style="{
            top: `${restrictedY}px`,
            left: `${restrictedX}px`,
        }" class="border-2 p-10 flex gap-10 fixed select-none">
            <node :name="'Mother'" />
            <node :name="'Ankush'" />
            <node :name="'Father'" />
        </div>

    </div>
</template>

<style scoped></style>