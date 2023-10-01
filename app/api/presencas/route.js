import Presencas from "../../../models/presencas";
import { connectToDB } from "../../../utils/database";

export const POST = async (req, res) => {
  const {
    nomeColaborador,
    nomeEmpresa,
    horaChegada,
    data,
    mes,
    tipoPresenca,
    userId,
  } = await req.json();

  try {
    await connectToDB();
    const newEvento = new Presencas({
      creator: userId,
      nomeColaborador,
      nomeEmpresa,
      horaChegada,
      data,
      tipoPresenca,
      mes,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new servico", { status: 500 });
  }
};
