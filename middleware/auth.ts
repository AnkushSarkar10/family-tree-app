export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser();
    const { checkUserInUsers } = useUtils();

    if ((to.path === "/" || to.path == "/setname") && !user.value) {
        return navigateTo("/login");
    } else if (user.value && to.path === "/login") {
        return navigateTo("/");
    } else if (to.path === "/" && user.value) {
        checkUserInUsers(user.value.id).then((result) => {
            if (!result) {
                navigateTo("/setname");
            }
        });
    } else if (to.path === "/setname" && user.value) {
        checkUserInUsers(user.value.id).then((result) => {
            if (result) {
                navigateTo("/");
            }
        });
    }
});
