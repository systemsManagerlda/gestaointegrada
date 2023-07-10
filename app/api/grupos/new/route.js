import { connectToDB } from "@utils/database";
import Grupo from "@models/grupo";

export const POST = async (req, res) => {
    const { grupo, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Grupo({
            creator: userId,
            grupo,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}