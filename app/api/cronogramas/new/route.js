import { connectToDB } from "@utils/database";
import Cronograma from "@models/cronograma";

export const POST = async (req, res) => {
    const { corpo, data, titulo, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Cronograma({
            creator: userId,
            titulo,
            data,
            corpo,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}