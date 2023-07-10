import Convites from "@models/convites";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Convites.findById(params.id).populate("creator");
        if (!prompt) return new Response("Not found", {status: 404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Convites.findByIdAndRemove(params.id)
        return new Response("Sucess", { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 