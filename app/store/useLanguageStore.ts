import { create } from 'zustand'

type Language = 'en' | 'hi'

interface LanguageState {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  translations: {
    [key in Language]: {
      title: {
        part1: string
        part2: string
      }
      searchPlaceholders: string[]
      footerLinks: {
        marketplace: string
        monitoring: string
        chat: string
        privacy: string
        terms: string
        patent: string
        copyright: string
      }
    }
  }
}

const useLanguageStore = create<LanguageState>(set => ({
  currentLanguage: 'en',
  setLanguage: language => set({ currentLanguage: language }),
  translations: {
    en: {
      title: {
        part1: 'Transforming',
        part2: 'BioGas Ecosystem'
      },
      searchPlaceholders: [
        'Ask about biogas plant maintenance...',
        'How to optimize biogas production?',
        'What are the safety protocols for biogas plants?',
        'Learn about biogas substrate mixing ratios...'
      ],
      footerLinks: {
        marketplace: 'Marketplace',
        monitoring: 'Real Time Monitoring System',
        chat: 'ChatNow',
        privacy: 'Privacy',
        terms: 'Terms & Conditions',
        patent: 'Patent',
        copyright: 'Copyright'
      }
    },
    hi: {
      title: {
        part1: 'बायोगैस पारिस्थितिकी तंत्र',
        part2: 'को बदल रहा है'
      },
      searchPlaceholders: [
        'बायोगैस संयंत्र रखरखाव के बारे में पूछें...',
        'बायोगैस उत्पादन को कैसे अनुकूलित करें?',
        'बायोगैस संयंत्रों के लिए सुरक्षा प्रोटोकॉल क्या हैं?',
        'बायोगैस सब्सट्रेट मिश्रण अनुपात के बारे में जानें...'
      ],
      footerLinks: {
        marketplace: 'मार्केटप्लेस',
        monitoring: 'रीयल टाइम मॉनिटरिंग सिस्टम',
        chat: 'अभी चैट करें',
        privacy: 'गोपनीयता',
        terms: 'नियम और शर्तें',
        patent: 'पेटेंट',
        copyright: 'कॉपीराइट'
      }
    }
  }
}))

export default useLanguageStore
