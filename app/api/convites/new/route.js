import { connectToDB } from "@utils/database";
import Convites from "@models/convites";

export const POST = async (req, res) => {
    const { modelo, preco, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Convites({
            creator: userId,
            modelo,
            preco,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}