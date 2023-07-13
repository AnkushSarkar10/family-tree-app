import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Database } from "~~/types/public";

export const useUtils = () => {
    const client = useSupabaseClient<Database>();
    const checkUserInUsers = async (uid: string): Promise<boolean> => {
        const { data, error } = await client
            .from("Users")
            .select()
            .eq("uid", uid);
        if (error) throw error;
        return !(data?.length === 0);
    };

    const makeFakeUser = async () => {
        let fakeUuid = uuidv4();
        let fakeName = faker.person.fullName();

        const { error } = await client
            .from("Users")
            .insert({ uid: fakeUuid, Name: fakeName });
        if (error) throw error;
        console.log("made fake user!")
    };

    return {
        checkUserInUsers,
        makeFakeUser
    };
};
