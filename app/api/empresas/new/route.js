import { connectToDB } from "../../../../utils/database";
import Empresass from "../../../../models/empresas";

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
    const newEvento = new Empresass({
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
