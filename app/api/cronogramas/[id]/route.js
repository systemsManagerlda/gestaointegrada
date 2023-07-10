import Cronograma from "@models/cronograma";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Cronograma.findById(params.id).populate("creator");
        if (!prompt) return new Response("Not found", {status: 404})
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const PATCH = async (request, { params }) => {
    const {titulo, data, corpo, userId} = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Cronograma.findById(params.id);
        if (!existingPrompt) return new Response("Not found", {status: 404});

        existingPrompt.titulo = titulo;
        existingPrompt.data = data;
        existingPrompt.corpo = corpo;
        existingPrompt.userId = userId;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Cronograma.findByIdAndRemove(params.id)
        return new Response("Sucess", { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 