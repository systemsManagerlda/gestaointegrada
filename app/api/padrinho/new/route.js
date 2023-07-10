import { connectToDB } from "@utils/database";
import Padrinho from "@models/padrinho";

export const POST = async (req, res) => {
    const { mensagem,nomeConvidado, emailConvidado, grupo, mesa, tipoConvidado, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Padrinho({
            creator: userId,
            mensagem,
            nomeConvidado,
            emailConvidado,
            grupo,
            mesa,
            tipoConvidado,
            status: "pendente",
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Evento", { status: 500 })
    }
}