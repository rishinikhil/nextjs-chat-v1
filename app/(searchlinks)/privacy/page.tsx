'use client'
import { Card, CardContent } from '@/components/ui/card'
import useLanguageStore from '@/app/store/useLanguageStore'
import AnimatedFooter from '@/components/animatedFooter'

export default function PrivacyPage() {
  const { currentLanguage, translations } = useLanguageStore()
  const privacy = translations[currentLanguage].PrivacyPolicy

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{privacy.title}</h1>

        <div className="space-y-6">
          {privacy.sections.map((section, idx) => (
            <Card key={idx} className="p-6">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-700 mb-4">{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <AnimatedFooter />
    </>
  )
}
