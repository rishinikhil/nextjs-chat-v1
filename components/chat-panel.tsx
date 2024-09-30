import * as React from 'react'
import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  // State to track visible CTA indices for top and bottom rows
  const [visibleTopRowIndex, setVisibleTopRowIndex] = React.useState(0)
  const [visibleBottomRowIndex, setVisibleBottomRowIndex] = React.useState(2)

  // Track the messages currently displayed in the top and bottom rows
  const [displayedTopMessages, setDisplayedTopMessages] = React.useState<any[]>([])
  const [displayedBottomMessages, setDisplayedBottomMessages] = React.useState<any[]>([])

  // Example messages (CTAs) placeholder
  const exampleMessages = [
    {
      heading: 'Boost Biogas Production?',
      subheading: 'Get more from your plant!',
      message: `How can I boost my biogas production?`
    },
    {
      heading: 'कम गैस उत्पादन हो रहा है?',
      subheading: 'हम आपकी मदद कर सकते हैं!',
      message: `मेरे प्लांट में गैस उत्पादन कम क्यों हो रहा है?`
    },
    {
      heading: 'Want to Sell Biogas Online?',
      subheading: 'Reach more buyers with us!',
      message: `How can I sell my biogas online?`
    },
    {
      heading: 'क्या आपका CBG प्लांट सही से काम नहीं कर रही?',
      subheading: 'जानिए कैसे सुधारें!',
      message: `मेरी CBG प्लांट की परफॉर्मेंस सुधारने के लिए क्या करें?`
    },
    {
      heading: 'Need Plant Optimization Tips?',
      subheading: 'Get expert advice now!',
      message: `Can you share some tips for optimizing my plant?`
    },
    {
      heading: 'Earn More from Waste?',
      subheading: 'Convert waste to wealth!',
      message: `How can I earn more from my biogas waste?`
    },
    {
      heading: 'कर्बन क्रेडिट कमा रहे हैं?',
      subheading: 'हमसे सीखें कैसे कमाएं!',
      message: `BioSarthi के माध्यम से कर्बन क्रेडिट कैसे कमा सकते हैं?`
    },
    {
      heading: 'Struggling with Plant Downtime?',
      subheading: 'Minimize it with our help!',
      message: `How can I reduce downtime in my biogas plant?`
    },
    {
      heading: 'गैस उत्पादन स्थिर नहीं है?',
      subheading: 'समस्या का समाधान जानें!',
      message: `मेरे बायोगैस प्लांट में गैस उत्पादन स्थिर क्यों नहीं है?`
    },
    {
      heading: 'Want to Go Green?',
      subheading: 'Switch to sustainable solutions!',
      message: `How can BioSarthi help me with sustainable solutions?`
    },
    {
      heading: 'बायोगैस प्लांट लगाना है?',
      subheading: 'हम आपकी मदद कर सकते हैं!',
      message: `मैं भारत में बायोगैस प्लांट कैसे सेटअप कर सकता हूँ?`
    },
    {
      heading: 'Maximize ROI on Biogas Plant?',
      subheading: 'Let us show you how!',
      message: `How can I maximize my ROI from the biogas plant?`
    },
    {
      heading: 'Want to Explore Our Marketplace?',
      subheading: 'Discover potential buyers!',
      message: `How can I connect with more buyers on the marketplace?`
    },
    {
      heading: 'बायोगैस प्लांट से अधिक कमाई करें?',
      subheading: 'हमसे जुड़े और समाधान पाएं!',
      message: `मैं बायोगैस प्लांट से अधिक कमाई कैसे कर सकता हूँ?`
    },
    {
      heading: 'Want to Earn Carbon Credits?',
      subheading: 'Unlock new revenue streams!',
      message: `How can I earn carbon credits with BioSarthi?`
    },
    {
      heading: 'प्लांट की परफॉर्मेंस सुधारना चाहते हैं?',
      subheading: 'हमारी तकनीक की मदद लें!',
      message: `BioSarthi की तकनीक से परफॉर्मेंस कैसे सुधारें?`
    },
    {
      heading: 'Need Help Setting Up Biogas Plant?',
      subheading: 'Get guidance from our experts!',
      message: `How can I get help in setting up my biogas plant?`
    },
    {
      heading: 'बायोगैस इंडस्ट्री की खबरें चाहिए?',
      subheading: 'जानें लेटेस्ट अपडेट्स!',
      message: `बायोगैस इंडस्ट्री की लेटेस्ट खबरें क्या हैं?`
    }
  ]

  // Initialize with the first set of top and bottom messages
  React.useEffect(() => {
    setDisplayedTopMessages(exampleMessages.slice(0, 2))
    setDisplayedBottomMessages(exampleMessages.slice(2, 4))
  }, [])

  // Function to update the top row messages
  const updateTopRow = () => {
    setDisplayedTopMessages((prevMessages) => {
      // Exclude the currently displayed messages in the bottom row
      const availableMessages = exampleMessages.filter(
        (msg) => !displayedBottomMessages.some((bottomMsg) => bottomMsg.heading === msg.heading)
      )
      return availableMessages.sort(() => 0.5 - Math.random()).slice(0, 2)
    })
  }

  // Function to update the bottom row messages
  const updateBottomRow = () => {
    setDisplayedBottomMessages((prevMessages) => {
      // Exclude the currently displayed messages in the top row
      const availableMessages = exampleMessages.filter(
        (msg) => !displayedTopMessages.some((topMsg) => topMsg.heading === msg.heading)
      )
      return availableMessages.sort(() => 0.5 - Math.random()).slice(0, 2)
    })
  }

  // Trigger top row text change every 5 seconds
  React.useEffect(() => {
    const topRowInterval = setInterval(updateTopRow, 6000)
    return () => clearInterval(topRowInterval)
  }, [displayedBottomMessages]) // Dependency on `displayedBottomMessages` to ensure no overlap

  // Trigger bottom row text change every 5 seconds with a 2.5 seconds delay
  React.useEffect(() => {
    const bottomRowInterval = setInterval(updateBottomRow, 6000)
    return () => clearInterval(bottomRowInterval)
  }, [displayedTopMessages]) // Dependency on `displayedTopMessages` to ensure no overlap

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {/* Render top row messages */}
          {displayedTopMessages.map((example, index) => (
            <div
              key={example.heading}
              className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              onClick={async () => {
                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    id: nanoid(),
                    display: <UserMessage>{example.message}</UserMessage>
                  }
                ])

                const responseMessage = await submitUserMessage(example.message)

                setMessages(currentMessages => [
                  ...currentMessages,
                  responseMessage
                ])
              }}
            >
              <div className="transition-opacity duration-500 opacity-100">
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">{example.subheading}</div>
              </div>
            </div>
          ))}

          {/* Render bottom row messages */}
          {displayedBottomMessages.map((example, index) => (
            <div
              key={example.heading}
              className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              onClick={async () => {
                setMessages(currentMessages => [
                  ...currentMessages,
                  {
                    id: nanoid(),
                    display: <UserMessage>{example.message}</UserMessage>
                  }
                ])

                const responseMessage = await submitUserMessage(example.message)

                setMessages(currentMessages => [
                  ...currentMessages,
                  responseMessage
                ])
              }}
            >
              <div className="transition-opacity duration-500 opacity-100">
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">{example.subheading}</div>
              </div>
            </div>
          ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
