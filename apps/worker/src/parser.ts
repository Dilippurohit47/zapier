import  { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv";
dotenv.config()
console.log("gemini",process.env.GEMINI_API_KEY)
export async function parse (
  text: string,
  values: any,
  startDelimeter = "{",
  endDelimeter = "}"
) {
 try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `I am giving u metadata and placeholder you have to return me a object with correct values ${text} and metadata is ${values} you have to put values in placholder by analysing metadata`;
  
  const result = await model.generateContent(prompt);
  console.log()
  console.log(result.response.text());
 } catch (error) {
  console.log("error from parser",error)
  return error
 }
}
 