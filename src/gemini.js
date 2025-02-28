let api_key = "AIzaSyB7c1JRXN0f5c6KlJSeo7hb7oYvPMX1GYs";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 50,
    responseMimeType: "text/plain",
};
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text()
}
export default run;