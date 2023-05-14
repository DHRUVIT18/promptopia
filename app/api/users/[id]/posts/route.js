import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET=async (req,{params})=>{
   
    try {
        await connectToDB();
        console.log(params.id);
        const response=await Prompt.find({creator:params.id}).populate('creator')
        
        return new Response(JSON.stringify(response),{status:200})
    } catch (error) {
        return new Response('Failed to fetch all Prompt',{status:500})
    }

}