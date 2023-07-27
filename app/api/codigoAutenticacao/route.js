import Codigo from "../../../models/codigo";
import Servicos from "../../../models/servicos";
import { connectToDB } from "../../../utils/database";

export const POST = async (req, res) => {
  const { codigo, userId } = await req.json();

  try {
    await connectToDB();
    const newEvento = new Codigo({
      creator: userId,
      codigo,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new servico", { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Servicos.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
    console.log(prompts);
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
