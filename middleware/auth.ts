export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser();
    const { checkUserInUsers } = useUtils();
    
    if ((to.path === "/" || to.path == "/setname") && !user.value) {
        return navigateTo("/login");
    } else if (to.path === "/login" && (user.value != null)) {
        return navigateTo("/");
    } else if (to.path === "/" && user.value) {
        const result = await checkUserInUsers(user.value.id);
        if (!result) {
            return navigateTo("/setname");
        }
    } else if (to.path === "/setname" && user.value) {
        const result = await checkUserInUsers(user.value.id);
        if (result) {
            return navigateTo("/");
        }
    }
});
