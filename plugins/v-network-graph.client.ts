import VNetworkGraph from "v-network-graph"

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VNetworkGraph)
})