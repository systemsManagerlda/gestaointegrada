import { connectToDB } from "@utils/database";
import Padrinho from "@models/padrinho";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const eventos = await Padrinho.find({_id: params.id}).populate('creator');

        return new Response(JSON.stringify(eventos), {
            status: 200
        })
    } catch (error) {
        return new Response('Error', {status:500})
    }
}