import { connectToDB } from "@utils/database";
import Evento from "@models/evento";

export const POST = async (req, res) => {
    const { nomeNoiva, nomeNoivo, localEvento, dataEvento, orcamentoInicial, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Evento({
            creator: userId,
            nomeNoiva,
            nomeNoivo,
            localEvento,
            dataEvento,
            orcamentoInicial,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}