import { connectToDB } from "@utils/database";
import Convites from "@models/convites";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const eventos = await Convites.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(eventos), {
            status: 200
        })
    } catch (error) {
        return new Response('Error', {status:500})
    }
}