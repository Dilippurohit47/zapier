import  { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv";
dotenv.config()
console.log("gemini","AIzaSyDd_KC3GJh-lKd15dofPdQD5LErd0_KMDg")
export async function parse (
  text: string,
  values: any,
  startDelimeter = "{",
  endDelimeter = "}"
) {
 try {

  // console.log(text)
  // console.log(values)
  const genAI = new GoogleGenerativeAI("AIzaSyDd_KC3GJh-lKd15dofPdQD5LErd0_KMDg");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
  You are given a text: "${text}", which contains placeholders enclosed within "${startDelimeter}" and "${endDelimeter}". 
  Replace the placeholders with appropriate values using the provided metadata: ${JSON.stringify(values)}.
  
  Important Rules:
  1. If a placeholder already contains a valid value (e.g., "{dilippurohit204@gmail.com}"), do not replace it. Simply return the text as it is.
  2. If you cannot find matching metadata for a placeholder, do not respond with unrelated values or data. Return the original text without any changes.
  3. Your response should always be a  only text containing **only** the processed text as follows:dilippurohit204@gmail.com
  
  4. Do not include additional metadata, commentary, or fields in the output.
  `;
  
  const result = await model.generateContent(prompt); 
const data =  result.response.text()
console.log(data)
return data
 } catch (error) {
  console.log("error from parser",error)
  return error
 }
}
 