import { connectToDB } from "@utils/database";
import Cronograma from "@models/cronograma";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const eventos = await Cronograma.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(eventos), {
            status: 200
        })
    } catch (error) {
        return new Response('Error', {status:500})
    }
}