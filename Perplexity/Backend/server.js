import "dotenv/config.js"
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import readline from 'readline/promises'
// import { testAi } from "./src/services/ai.service.js";
// import { testMistral } from "./src/services/ai.service.js";
import { search } from "./src/services/tavily.service.js";
import { createAgent, tool, HumanMessage } from "langchain";
import * as z from 'zod'
import { ChatMistralAI } from "@langchain/mistralai";



connectToDB();

// testAi();
// testMistral()


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const searchTool = tool(
//   search,
//   {
//     name: 'search',
//     description: "Search the web for current information, facts, news, websites, or anything the user asks about.",
//     schema: z.object({
//       question: z.string().describe('thing you wanna search ask web')
//     })
//   }
// )

// const model = new ChatMistralAI({
//   model: "mistral-small-latest",
// })


// const agent = createAgent({
//   model,
//   tools: [searchTool]
// })

// const messages = [];

// while (true) {
//   const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

//   messages.push(new HumanMessage(userInput))

//   if (userInput.toLowerCase() === 'exit') {
//     console.log('Exiting the chat... ');
//     break;
//   }

//   const res = await agent.invoke({ messages })
//   messages.push(res.messages[res.messages.length-1])
  
//   console.log(res.messages[res.messages.length-1].text);

//   // console.log("messages array", messages);

// }

// rl.close()




const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
