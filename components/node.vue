<template>
    <!-- <div class="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-2">{{ name }}</h1>
            <p class="text-gray-600 text-sm">{{ subtitle }}</p>
        </div>
        <div class="flex justify-center items-center py-2">
            <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
                Add
            </button>
        </div>
    </div> -->

    <div
        class="font-inter bg-[${color}] absolute -mt-1 -ml-1 w-[${d.width}px] h-[${d.height}px] rounded-10 border border-solid border-gray-300">
        <div class="absolute bg-[${color}] -mt-[25px] ml-[15px] rounded-full w-[50px] h-[50px]"></div>
        <img src="${d.data.imageUrl}" class="absolute -mt-[20px] -ml-[20px] rounded-full w-[40px] h-[40px]" />
        <div class="text-[#08011E] absolute top-[2px] right-[20px] text-xs">
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="text-[#08011E] ml-[20px] mt-[32px] text-base">${d.data.name}</div>
        <div class="text-gray-500 ml-[20px] mt-[3px] text-xs">${d.data.positionName}</div>
    </div>
</template>
  
<script setup>

const props = defineProps(['name']);
// const props = defineProps(['name', 'nodeId', 'scale', 'config', 'slotProps']);

const name = props.name;
const subtitle = "You";

</script>

<style></style>
