import Codigo from "@models/codigo";
import { connectToDB } from "@utils/database";

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
