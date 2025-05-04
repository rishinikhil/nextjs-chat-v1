'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollText, Mail, Phone, MapPin } from 'lucide-react'
import useLanguageStore from '@/app/store/useLanguageStore'
import AnimatedFooter from '@/components/animatedFooter'

export const dynamic = 'force-dynamic'

export default function TermsAndConditions() {
  const { currentLanguage, translations } = useLanguageStore()
  const content = translations[currentLanguage].Terms
  const contact = translations[currentLanguage].contactUs
  return (
    <>
      <div className="h-[93vh] overflow-hidden flex flex-col justify-between bg-white pt-6 px-6 md:pt-8 md:px-6">
        <div className="mx-auto max-w-4xl space-y-7">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-semibold">
              <span className="text-[#2E7D32]">{content.title.part1}</span>{' '}
              <span className="text-[#D32F2F]">{content.title.part2}</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="overflow-hidden border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#E8F5E9] p-3">
                    <ScrollText className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">
                      {content.disclaimer}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {content.disclaimerContent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#E8F5E9] p-3">
                    <ScrollText className="h-6 w-6 text-[#2E7D32]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">
                      {content.intellectualPropertyRights}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {content.intellectualPropertyRightsContent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#E8F5E9] p-3">
                      <Mail className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{contact.email}</h3>
                      <p className="text-gray-600">hello[at]biosarthi.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#E8F5E9] p-3">
                      <Phone className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{contact.phone}</h3>
                      <p className="text-gray-600">+91 98737 50969</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#E8F5E9] p-3">
                      <MapPin className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{contact.address}</h3>
                      <p className="text-gray-600">
                        BioSarthi Technologies Pvt. Ltd.
                        <br />
                        NASSCOM CoE IoT
                        <br />
                        Hartron Innovation Campus
                        <br />
                        Plot 1, Udyog Vihar Phase 1<br />
                        Sector 20, Gurugram, Haryana 122022
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <AnimatedFooter />
      </div>
    </>
  )
}
