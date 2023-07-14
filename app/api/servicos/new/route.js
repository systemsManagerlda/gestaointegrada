import { connectToDB } from "@utils/database";
import Servicos from "@models/servicos";

export const POST = async (req, res) => {
    const { nomeServico,precoServico, cliente, funcionario, status, dataHora, userId } = await req.json();
    
    try {
        await connectToDB();
        const newEvento = new Servicos({
            creator: userId,
            nomeServico,
            precoServico,
            dataHora,
            funcionario,
            cliente,
            status,
        });

        await newEvento.save();
        return new Response(JSON.stringify(newEvento), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new servico", { status: 500 })
    }
}