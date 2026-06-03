import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function search({ question }) {
    const response = await tvly.search(question);
    return JSON.stringify(response);
}
