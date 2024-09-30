import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Empowering Biogas Ecosystem with Data and AI
        </h1>
        <p className="leading-normal text-muted-foreground">
          BioSarthi® leverages data intelligence and AI to transform the biogas ecosystem, offering real-time monitoring, data-driven insights, and a digital marketplace for all stakeholders.
        </p>
        <p className="leading-normal text-muted-foreground">
          Our solutions optimize plant performance, increase profitability, and contribute to a sustainable future.
        </p>
      </div>
    </div>
  )
}
