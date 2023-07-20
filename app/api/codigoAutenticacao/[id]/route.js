import Codigo from "@models/codigo";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Codigo.find({ creator: params.id }).populate(
      "creator"
    );
    if (!prompt) return new Response("Not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { codigo, userId } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Codigo.findById(params.id);
    if (!existingPrompt) return new Response("Not found", { status: 404 });
    existingPrompt.userId = userId;
    existingPrompt.codigo = codigo;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
