'use client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollText, Calendar, Users, CheckCircle2 } from 'lucide-react'
import useLanguageStore from '@/app/store/useLanguageStore'
export default function PatentsPage() {
  const { currentLanguage, translations } = useLanguageStore()
  const patentsData = translations[currentLanguage].patentsData
  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold">
            <span className="text-[#2E7D32]">
              {patentsData.title.firstPart}
            </span>{' '}
            <span className="text-[#D32F2F]">
              {patentsData.title.secondPart}
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {patentsData.introduction}
          </p>
        </div>

        <div className="grid gap-8">
          {patentsData.patents.map(patent => (
            <Card
              key={patent.id}
              className="overflow-hidden border border-gray-100 shadow-sm"
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-[800px]">
                    <Image
                      src={'/bioSarthiPatent.png'}
                      alt={patent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-6 ">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                          {patent.title}
                        </h2>
                        <Badge
                          variant="outline"
                          className="bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]"
                        >
                          Certified
                        </Badge>
                      </div>
                      <p className="text-gray-600">{patent.abstract}</p>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <ScrollText className="h-5 w-5 text-[#2E7D32]" />
                        <span className="text-sm">Patent No. 550208</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#2E7D32]" />
                        <span className="text-sm">
                          Filing Date: {'07/09/2023'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">Key Features:</h3>
                      <ul className="space-y-2">
                        {patent.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
