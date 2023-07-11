export const useUtils = () => {
    const client = useSupabaseClient();

    const checkUserInUsers = async (uid: string): Promise<boolean> => {
        const { data, error } = await client
            .from("Users")
            .select()
            .eq("uid", uid);
        if (error) {
            throw error;
        }
        return !(data?.length === 0);
    };

    return {
        checkUserInUsers,
    };
};
