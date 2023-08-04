import Empresas from "../../../models/empresas";
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
    const newEvento = new Empresas({
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

    const prompts = await Empresas.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
