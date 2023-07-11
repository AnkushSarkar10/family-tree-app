// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
    tailwindcss: {
        exposeConfig: true,
        config: {
            plugins: [require("@tailwindcss/forms")],
        },
    },
});
