import Empresas from "../../../../models/empresas";
import { connectToDB } from "../../../../utils/database";

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
  } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Empresas.findById(params.id);
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
    await Empresas.findByIdAndRemove(params.id);
    return new Response("Sucess", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
