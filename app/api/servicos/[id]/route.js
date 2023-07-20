import Servicos from "@models/servicos";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Servicos.findById(params.id).populate("creator");
    if (!prompt) return new Response("Not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const {
    nomeServico,
    precoServico,
    cliente,
    funcionario,
    status,
    dataHora,
    userId,
  } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Servicos.findById(params.id);
    if (!existingPrompt) return new Response("Not found", { status: 404 });

    existingPrompt.nomeServico = nomeServico;
    existingPrompt.precoServico = precoServico;
    existingPrompt.cliente = cliente;
    existingPrompt.funcionario = funcionario;
    existingPrompt.dataHora = dataHora;
    existingPrompt.userId = userId;
    existingPrompt.status = status;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Servicos.findByIdAndRemove(params.id);
    return new Response("Sucess", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
