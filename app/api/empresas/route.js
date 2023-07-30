import Empresa from "../../../models/empresas";
import { connectToDB } from "../../../utils/database";

export const POST = async (req, res) => {
  const {
    nomeEmpresa,
    endereco,
    nuit,
    contactos,
    email,
    validade,
    status,
    pacoteAssinado,
    periodo,
    userId,
  } = await req.json();

  try {
    await connectToDB();
    const newEvento = new Empresa({
      creator: userId,
      nomeEmpresa,
      endereco,
      nuit,
      contactos,
      email,
      validade,
      status,
      pacoteAssinado,
      periodo,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new servico", { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Empresa.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const {
    nomeEmpresa,
    endereco,
    nuit,
    contactos,
    email,
    validade,
    status,
    pacoteAssinado,
    periodo,
    userId,
  } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Empresa.findById(params.id);
    if (!existingPrompt) return new Response("Not found", { status: 404 });

    existingPrompt.nomeEmpresa = nomeEmpresa;
    existingPrompt.endereco = endereco;
    existingPrompt.nuit = nuit;
    existingPrompt.contactos = contactos;
    existingPrompt.email = email;
    existingPrompt.validade = validade;
    existingPrompt.status = status;
    existingPrompt.pacoteAssinado = pacoteAssinado;
    existingPrompt.periodo = periodo;
    existingPrompt.userId = userId;

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
    await Empresa.findByIdAndRemove(params.id);
    return new Response("Sucess", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
