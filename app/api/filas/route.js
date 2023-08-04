import Servicos from "../../../models/servicos";
import { connectToDB } from "../../../utils/database";

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
