//GET
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Prompt", { status: 500 });
  }
};
//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the Prompt", { status: 500 });
  }
};
//DELETE
export const DELETE = async (req, { params }) => {
  try {
   const db = await connectToDB();
    const { id } = params.id
    
     let resp= await Prompt.findByIdAndRemove(params.id);
    // Specify the collection name
    // const collectionName = 'prompts'; // Replace with your collection name

    // Construct the query object
    // const query = { _id: new ObjectId(id) };

    // Delete the document
    // Replace the following line with your deletion logic
    // For example, using the `deleteOne` method from the MongoDB driver:
    // await db.collection(collectionName).deleteOne(query);
    // Replace `db` with your actual reference to the MongoDB database
   
    return new Response("Prompt deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the Prompt", { status: 500 });
  }
};
