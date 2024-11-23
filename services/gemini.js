import {GoogleGenerativeAI} from '@google/generative-ai';

const genAi = new GoogleGenerativeAI("AIzaSyA4zaScIDUdaN7pfD0N-GcAo0tPJo4UfZA");
const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"});

export default async function gemini(image){
    
    const prompt = "gere uma descrição curta e em portugês do Brasil para a seguiunte imagem";
    
    try{
        const imageBase = {
            inlineData: {
                data: image.toString("base64"),
                mimeType: "image/png"
            }
        };
        const res = await model.generateContent([prompt, imageBase]);
        return res.response.text() || "alt-text não disponivel";
    }catch(err){
        console.error("Erro gemini", err.message, err);
        throw new Error("Erro ao obter alt-text do gemini");
    }
    
}