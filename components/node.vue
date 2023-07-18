<template>
    <div class="flex items-center gap-0 -translate-x-1/2 right-2">
        <div class="relative bg-[${color}] min-w-[${d.width}px] min-h-[${d.height}px] rounded-xl border border-solid border-[#E4E2E9]">
            <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
                class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
            <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
            <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
        </div>
        <hr class="w-7 h- bg-slate-300" />
        <div class="relative bg-[${color}] min-w-[${d.width}px] min-h-[${d.height}px] rounded-xl border border-solid border-[#E4E2E9]">
            <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png"
                class="absolute -top-8 left-1 rounded-full w-16 h-w-16" />
            <div class="text-black text-lg font-semibold text-center mt-6">${d.data.name}</div>
            <div class="text-black text-sm font-extralight text-center">${d.data.isUser == 't' ? "You" : ""}</div>
        </div>
    </div>
</template>
  
<script setup>

</script>

<style></style>
