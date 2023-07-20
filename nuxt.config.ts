// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@vueuse/nuxt"],
    tailwindcss: {
        exposeConfig: true,
        config: {
            plugins: [require("@tailwindcss/forms")],
        },
    },
    css: ["v-network-graph/lib/style.css", "vue-final-modal/style.css"],
    // routeRules: {
    //     '/': { ssr: false },
    // }
});
