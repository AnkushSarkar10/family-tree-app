import { createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~~/types/public";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const client = serverSupabaseClient<Database>(event);

    const { data, error } = await client.from("family_members").select().eq("uid", query.uid).csv();
    if (error) {
        throw createError({ statusMessage: error.message });
    }
    return data;
});
