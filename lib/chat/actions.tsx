// Import necessary dependencies and utilities
import 'server-only';
import { createAI, createStreamableUI, getMutableAIState, streamUI, createStreamableValue } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { formatNumber, sleep } from '@/lib/utils';
import { saveLeadToCRM } from '@/lib/crm';
import { BotMessage, SystemMessage, UserMessage } from '@/components/chat-message';
import { Dialog, Button } from '@/components/ui';
import { Chat, Message } from '@/lib/types';
import { auth } from '@/auth';

// Define the interface for the bot's AI state
export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

// Provide a friendly introduction about the bot without revealing internal details
async function provideIntroduction() {
  'use server';
  return `
    Hello! I'm the BioSarthi assistant, here to support you with all your biogas-related questions and needs.
    I can help you with:
    - Understanding how BioSarthi’s products can enhance your biogas plant’s productivity.
    - Performing biogas calculations like estimating methane yield and energy potential.
    - Offering guidance on the best equipment for your specific biogas requirements.
    - Educating you about the biogas industry, sustainability, and more.

    Feel free to ask me any questions, and I'll be happy to assist you!
  `;
}

// Submit user messages and respond based on the context of the query
async function submitUserMessage(content: string) {
  'use server';
  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai('gpt-4o-mini'), // Modify to your preferred AI model
    initial: <BotMessage content="Processing your request..." />,
    system: `
      You are a biogas assistant for BioSarthi. You help users understand the biogas industry, perform biogas-related calculations, and provide information about BioSarthi's products and services. If the user shares their contact details, forward them to the CRM.
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('');
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {
      // Tool for providing a friendly introduction about the bot's capabilities
      introduction: {
        description: 'Provide a brief introduction about the bot and its capabilities',
        generate: async function* () {
          yield <SystemMessage>Here’s what I can help you with:</SystemMessage>;

          const introMessage = await provideIntroduction();
          yield <BotMessage content={introMessage} />;
        },
      },

      // Other tools like `saveLead`, `biogasCalculations`, `productInquiry` can be included here...
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

// Define the AI structure and initial state for the BioSarthi bot
export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onSetAIState: async ({ state, done }) => {
    'use server';
    if (!done) return;

    const session = await auth();
    if (!session || !session.user) return;

    const { chatId, messages } = state;

    const createdAt = new Date();
    const userId = session.user.id as string;
    const path = `/chat/${chatId}`;

    const firstMessageContent = messages[0].content as string;
    const title = firstMessageContent.substring(0, 100);

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
      path,
    };

    await saveChat(chat);
  },
});
