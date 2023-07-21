import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Database } from "~~/types/public";
import Modal from "../components/Modal.vue";
import { useModal } from "vue-final-modal";

export const useUtils = () => {
    const client = useSupabaseClient<Database>();
    const user = useSupabaseUser();

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
        console.log("made fake user!");
    };

    const fetchUserFamilyCsv = async () => {
        const { data } = await useFetch("/api/getUserFamilyCsv", {
            headers: useRequestHeaders(["cookie"]),
            query: { uid: user.value?.id },
        });
        return data;
    };

    const parseCSV = (csvString: string): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            const lines = csvString.split("\n");
            const headers = lines[0].split(",");
            const data: any[] = [];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].split(",");
                const item: any = {};

                for (let j = 0; j < headers.length; j++) {
                    const key = headers[j];
                    const value = line[j].replace(/\"/g, ""); // Remove double quotes if present
                    item[key] = value.trim(); // Trim any leading/trailing whitespace
                }

                data.push(item);
            }

            resolve(data);
        });
    };

    const addParent = (d :any) => {}
    const addSpouce = (d :any) => {}
    const addChild = (d :any) => {}
    const editNode = (d :any) => {}

    const nodeClickHandler = (data: any) => {
        let modalData = "";
        let config = {
            canAddParent: false,
            canAddSpouce: false,
        };
        if (data.parentId == "" && data.hasSpouse == "f") {
            modalData = "can add parent, spouce, child";
            config.canAddParent = true;
            config.canAddSpouce = true;
        } else if (data.hasSpouse == "f") {
            modalData = "can add, spouce, child";
            config.canAddSpouce = true;
        } else {
            modalData = "can add child";
        }

        const { open, close } = useModal({
            component: Modal,
            attrs: {
                title: modalData,
                config: config,
                data: data,
                onConfirm() {
                    close();
                },
            },
        });
        open();
    };

    return {
        checkUserInUsers,
        makeFakeUser,
        fetchUserFamilyCsv,
        parseCSV,
        nodeClickHandler,
    };
};
