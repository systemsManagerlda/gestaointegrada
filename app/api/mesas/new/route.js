import { connectToDB } from "@utils/database";
import Mesa from "@models/mesa";

export const POST = async (req, res) => {
    const { mesa, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Mesa({
            creator: userId,
            mesa,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}