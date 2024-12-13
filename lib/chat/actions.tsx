import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

//Commenting the original code related to stocks
// import {
//   spinner,
//   BotCard,
//   BotMessage,
//   SystemMessage,
//   Stock,
//   Purchase
// } from '@/components/stocks'

//Code for new components folder of components/biosarthi
import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage
} from '@/components/biosarthi'

import { z } from 'zod'
//Commenting the original code related to stocks
// import { EventsSkeleton } from '@/components/stocks/events-skeleton'
// import { Events } from '@/components/stocks/events'
// import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
// import { Stocks } from '@/components/stocks/stocks'
// import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
//Commenting the original code related to stocks
// import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { SpinnerMessage, UserMessage } from '@/components/biosarthi/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'

// Commenting the original stocks code, this function is for the purchase of stock, ca be used for purchase of device
// async function confirmPurchase(symbol: string, price: number, amount: number) {
//   'use server'

//   const aiState = getMutableAIState<typeof AI>()

//   const purchasing = createStreamableUI(
//     <div className="inline-flex items-start gap-1 md:items-center">
//       {spinner}
//       <p className="mb-2">
//         Purchasing {amount} ${symbol}...
//       </p>
//     </div>
//   )

//   const systemMessage = createStreamableUI(null)

//   runAsyncFnWithoutBlocking(async () => {
//     await sleep(1000)

//     purchasing.update(
//       <div className="inline-flex items-start gap-1 md:items-center">
//         {spinner}
//         <p className="mb-2">
//           Purchasing {amount} ${symbol}... working on it...
//         </p>
//       </div>
//     )

//     await sleep(1000)

//     purchasing.done(
//       <div>
//         <p className="mb-2">
//           You have successfully purchased {amount} ${symbol}. Total cost:{' '}
//           {formatNumber(amount * price)}
//         </p>
//       </div>
//     )

//     systemMessage.done(
//       <SystemMessage>
//         You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
//         {formatNumber(amount * price)}.
//       </SystemMessage>
//     )

//     aiState.done({
//       ...aiState.get(),
//       messages: [
//         ...aiState.get().messages,
//         {
//           id: nanoid(),
//           role: 'system',
//           content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
//             amount * price
//           }]`
//         }
//       ]
//     })
//   })

//   return {
//     purchasingUI: purchasing.value,
//     newMessage: {
//       id: nanoid(),
//       display: systemMessage.value
//     }
//   }
// }

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o-mini'),
    initial: <SpinnerMessage />,
    system: `
  You are BioSarthi, an advanced biogas assistant designed to educate, inform, and guide users in the biogas industry. BioSarthi offers innovative solutions for biogas plant optimization, real-time monitoring, and revenue generation through a patented, IoT-powered platform. Your purpose is to help users learn more about biogas, understand the value of BioSarthi’s offerings, and provide expert recommendations based on their unique requirements.

**BioSarthi’s Mission**:
BioSarthi’s mission is to empower India’s biogas revolution through innovation, sustainability, and global leadership. BioSarthi aims to revolutionize the biogas industry by addressing key pain points such as inconsistent gas generation, lack of real-time data, and inefficiencies in plant maintenance.

**BioSarthi’s Vision**:
To be the world’s premier biogas ecosystem, transforming energy production and environmental sustainability in India and globally.

**BioSarthi’s Values**:
1. **Sustainability**: Leading the way in sustainable biogas solutions for a cleaner, healthier planet.
2. **Innovation**: Pioneering advanced technologies to set new standards in the biogas industry.
3. **Excellence**: Striving for superior quality and performance in all our endeavors.
4. **Integrity**: Upholding the highest ethical standards and transparency in every action.
5. **Collaboration**: Building strong partnerships to create a cohesive biogas community.
6. **Customer-Centricity**: Focusing on customers' success with tailored, impactful solutions.
7. **Impact**: Driving positive change in society, the environment, and the economy.
8. **Leadership**: Aspiring to be the benchmark for the biogas industry, shaping policies and standards globally.

**BioSarthi’s Products and Solutions**:
1. **BioSarthi® Real-Time Monitoring System**:
   - The monitoring system integrates advanced sensor technologies, including ultrasonic flow meters, pressure sensors, and temperature sensors. It provides accurate, real-time data on plant performance, enabling predictive maintenance and improved plant efficiency.
   - With solar-powered IoT connectivity and cloud-based data transmission, the system ensures continuous monitoring and seamless integration with existing PLC and SCADA systems.

2. **Marketplace Platform**:
   - BioSarthi’s marketplace connects biogas plant owners with potential customers, enabling the sale of biogas, biofertilizers, and related products. The platform’s revenue model includes subscription-based device installations, transaction fees on sales, and advertisement revenue from featured listings.

3. **Product Range**:
   - In addition to the monitoring system, BioSarthi offers value-added products such as biogas slurry separators and filtration systems to enhance plant performance and maximize returns.

**What You Can Do**:
- **Provide Detailed Product Information**:
  - Share in-depth descriptions of BioSarthi’s product offerings, including the technical specifications, benefits, and use cases of the Real-Time Monitoring System, slurry separators, and other solutions.
  - Highlight how BioSarthi’s systems help plant owners achieve higher efficiency, increase uptime, and earn carbon credits through precise data tracking.

- **Biogas Calculations and Technical Assistance**:
  - Assist users in performing calculations related to methane yield, energy potential, and operational efficiency. Explain complex concepts such as energy savings and methane output in simple terms.
  - Provide tailored recommendations based on user inputs, such as plant size, type of waste used, and local conditions.

- **Address Industry Challenges**:
  - Discuss common challenges faced by biogas plant owners, such as variable gas generation, maintenance difficulties, and missed carbon credit opportunities. Offer solutions through BioSarthi’s technology, which mitigates these issues through data-driven insights and continuous monitoring.

- **Educational Guidance**:
  - Educate users about the biogas industry, sustainability initiatives, and how adopting BioSarthi’s solutions can contribute to a cleaner environment. Share case studies, success stories, and data-driven insights that showcase BioSarthi’s impact on the biogas ecosystem.

- **User Support and Recommendations**:
  - Provide personalized recommendations on which BioSarthi products or services best suit the user’s needs. Guide them through product selection, explaining the benefits of each solution in relation to their unique biogas setup.

- **Contact Information**:
  - If a user expresses interest in learning more, share BioSarthi’s contact details:
    - **Email**: hello@biosarthi.com
    - **WhatsApp**: https://wa.me/919873750969, give link which opens in new tab not same page redirect 

- Encourage users to reach out directly for in-depth discussions or to speak with a representative for more personalized guidance.

**Response Strategy**:
- Maintain a friendly, approachable tone while providing detailed and insightful responses.
- Focus on showcasing BioSarthi’s strengths, helping users understand how our solutions can solve their specific problems and drive value for their biogas operations.
- Encourage users to ask follow-up questions and show willingness to share more information or connect them with the BioSarthi team for further support.

**Important**:
- Refrain from discussing internal operations or processes.
- Always steer the conversation towards how BioSarthi’s technology and marketplace model benefit the user and contribute to sustainable biogas production.
- Do not discuss the code or technical details about the application code.
- You are strictly not allowed to discuss anything beyond what has been defined above. Politely say no to the user if the question is beyond this scope.
- Even if the user asks what you cannot do, focus on what you **can** help with related to BioSarthi.
- Avoid disclosing any details outside of the defined areas of assistance, even if asked directly.
`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      // Commenting original tools code related to stocks
      // listStocks: {
      //   description: 'List three imaginary stocks that are trending.',
      //   parameters: z.object({
      //     stocks: z.array(
      //       z.object({
      //         symbol: z.string().describe('The symbol of the stock'),
      //         price: z.number().describe('The price of the stock'),
      //         delta: z.number().describe('The change in price of the stock')
      //       })
      //     )
      //   }),
      //   generate: async function* ({ stocks }) {
      //     yield (
      //       <BotCard>
      //         <StocksSkeleton />
      //       </BotCard>
      //     )
      //     await sleep(1000)
      //     const toolCallId = nanoid()
      //     aiState.done({
      //       ...aiState.get(),
      //       messages: [
      //         ...aiState.get().messages,
      //         {
      //           id: nanoid(),
      //           role: 'assistant',
      //           content: [
      //             {
      //               type: 'tool-call',
      //               toolName: 'listStocks',
      //               toolCallId,
      //               args: { stocks }
      //             }
      //           ]
      //         },
      //         {
      //           id: nanoid(),
      //           role: 'tool',
      //           content: [
      //             {
      //               type: 'tool-result',
      //               toolName: 'listStocks',
      //               toolCallId,
      //               result: stocks
      //             }
      //           ]
      //         }
      //       ]
      //     })
      //     return (
      //       <BotCard>
      //         <Stocks props={stocks} />
      //       </BotCard>
      //     )
      //   }
      // },
      // showStockPrice: {
      //   description:
      //     'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
      //   parameters: z.object({
      //     symbol: z
      //       .string()
      //       .describe(
      //         'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
      //       ),
      //     price: z.number().describe('The price of the stock.'),
      //     delta: z.number().describe('The change in price of the stock')
      //   }),
      //   generate: async function* ({ symbol, price, delta }) {
      //     yield (
      //       <BotCard>
      //         <StockSkeleton />
      //       </BotCard>
      //     )
      //     await sleep(1000)
      //     const toolCallId = nanoid()
      //     aiState.done({
      //       ...aiState.get(),
      //       messages: [
      //         ...aiState.get().messages,
      //         {
      //           id: nanoid(),
      //           role: 'assistant',
      //           content: [
      //             {
      //               type: 'tool-call',
      //               toolName: 'showStockPrice',
      //               toolCallId,
      //               args: { symbol, price, delta }
      //             }
      //           ]
      //         },
      //         {
      //           id: nanoid(),
      //           role: 'tool',
      //           content: [
      //             {
      //               type: 'tool-result',
      //               toolName: 'showStockPrice',
      //               toolCallId,
      //               result: { symbol, price, delta }
      //             }
      //           ]
      //         }
      //       ]
      //     })
      //     return (
      //       <BotCard>
      //         <Stock props={{ symbol, price, delta }} />
      //       </BotCard>
      //     )
      //   }
      // },
      // showStockPurchase: {
      //   description:
      //     'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
      //   parameters: z.object({
      //     symbol: z
      //       .string()
      //       .describe(
      //         'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
      //       ),
      //     price: z.number().describe('The price of the stock.'),
      //     numberOfShares: z
      //       .number()
      //       .optional()
      //       .describe(
      //         'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
      //       )
      //   }),
      //   generate: async function* ({ symbol, price, numberOfShares = 100 }) {
      //     const toolCallId = nanoid()
      //     if (numberOfShares <= 0 || numberOfShares > 1000) {
      //       aiState.done({
      //         ...aiState.get(),
      //         messages: [
      //           ...aiState.get().messages,
      //           {
      //             id: nanoid(),
      //             role: 'assistant',
      //             content: [
      //               {
      //                 type: 'tool-call',
      //                 toolName: 'showStockPurchase',
      //                 toolCallId,
      //                 args: { symbol, price, numberOfShares }
      //               }
      //             ]
      //           },
      //           {
      //             id: nanoid(),
      //             role: 'tool',
      //             content: [
      //               {
      //                 type: 'tool-result',
      //                 toolName: 'showStockPurchase',
      //                 toolCallId,
      //                 result: {
      //                   symbol,
      //                   price,
      //                   numberOfShares,
      //                   status: 'expired'
      //                 }
      //               }
      //             ]
      //           },
      //           {
      //             id: nanoid(),
      //             role: 'system',
      //             content: `[User has selected an invalid amount]`
      //           }
      //         ]
      //       })
      //       return <BotMessage content={'Invalid amount'} />
      //     } else {
      //       aiState.done({
      //         ...aiState.get(),
      //         messages: [
      //           ...aiState.get().messages,
      //           {
      //             id: nanoid(),
      //             role: 'assistant',
      //             content: [
      //               {
      //                 type: 'tool-call',
      //                 toolName: 'showStockPurchase',
      //                 toolCallId,
      //                 args: { symbol, price, numberOfShares }
      //               }
      //             ]
      //           },
      //           {
      //             id: nanoid(),
      //             role: 'tool',
      //             content: [
      //               {
      //                 type: 'tool-result',
      //                 toolName: 'showStockPurchase',
      //                 toolCallId,
      //                 result: {
      //                   symbol,
      //                   price,
      //                   numberOfShares
      //                 }
      //               }
      //             ]
      //           }
      //         ]
      //       })
      //       return (
      //         <BotCard>
      //           <Purchase
      //             props={{
      //               numberOfShares,
      //               symbol,
      //               price: +price,
      //               status: 'requires_action'
      //             }}
      //           />
      //         </BotCard>
      //       )
      //     }
      //   }
      // },
      // getEvents: {
      //   description:
      //     'List funny imaginary events between user highlighted dates that describe stock activity.',
      //   parameters: z.object({
      //     events: z.array(
      //       z.object({
      //         date: z
      //           .string()
      //           .describe('The date of the event, in ISO-8601 format'),
      //         headline: z.string().describe('The headline of the event'),
      //         description: z.string().describe('The description of the event')
      //       })
      //     )
      //   }),
      //   generate: async function* ({ events }) {
      //     yield (
      //       <BotCard>
      //         <EventsSkeleton />
      //       </BotCard>
      //     )
      //     await sleep(1000)
      //     const toolCallId = nanoid()
      //     aiState.done({
      //       ...aiState.get(),
      //       messages: [
      //         ...aiState.get().messages,
      //         {
      //           id: nanoid(),
      //           role: 'assistant',
      //           content: [
      //             {
      //               type: 'tool-call',
      //               toolName: 'getEvents',
      //               toolCallId,
      //               args: { events }
      //             }
      //           ]
      //         },
      //         {
      //           id: nanoid(),
      //           role: 'tool',
      //           content: [
      //             {
      //               type: 'tool-result',
      //               toolName: 'getEvents',
      //               toolCallId,
      //               result: events
      //             }
      //           ]
      //         }
      //       ]
      //     })
      //     return (
      //       <BotCard>
      //         <Events props={events} />
      //       </BotCard>
      //     )
      //   }
      // }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
    //confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state, done }) => {
    'use server'

    if (!done) return

    const session = await auth()
    if (!session || !session.user) return

    const { chatId, messages } = state

    const createdAt = new Date().getTime()
    const userId = session.user.id as string
    const path = `/chats/chatid/${chatId}`

    const firstMessageContent = messages[0].content as string
    const title = firstMessageContent.substring(0, 100)

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
      path
    }

    await saveChat(chat)
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return null
            // Commenting original below code related to stocks
            // return tool.toolName === 'listStocks' ? (
            //   <BotCard>
            //     {/* TODO: Infer types based on the tool result*/}
            //     {/* @ts-expect-error */}
            //     <Stocks props={tool.result} />
            //   </BotCard>
            // ) : tool.toolName === 'showStockPrice' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Stock props={tool.result} />
            //   </BotCard>
            // ) : tool.toolName === 'showStockPurchase' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Purchase props={tool.result} />
            //   </BotCard>
            // ) : tool.toolName === 'getEvents' ? (
            //   <BotCard>
            //     {/* @ts-expect-error */}
            //     <Events props={tool.result} />
            //   </BotCard>
            // ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
