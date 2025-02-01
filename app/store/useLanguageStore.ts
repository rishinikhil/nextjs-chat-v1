'use client'
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
        part3: string
      }
      searchPlaceholders: string[]
      aboutUs: {
        title: {
          part1: string
          part2: string
          subtitle: string
        }
        sectionTitles: {
          vision: string
          mission: string
          offerings: string
        }
        Vision: string
        Mission: string
        Offerings: {
          title: string
          description: string
          features: string[]
        }[]
      }
      footerLinks: {
        successStories: string
        monitoring: string
        chat: string
        privacy: string
        terms: string
        patent: string
        copyright: string
      }
      contactUs: {
        title: {
          part1: string
          part2: string
        }
        subtitle: string
        email: string
        phone: string
        address: string
        sendMessage: string
        messagePlaceholder: string
        whatsappPlaceholder: string
      }
      Terms: {
        title: {
          part1: string
          part2: string
        }
        subtitle: string
        disclaimer: string
        disclaimerContent: string
        intellectualPropertyRights: string
        intellectualPropertyRightsContent: string
      }
      patentsData: {
        title: {
          firstPart: string
          secondPart: string
        }
        introduction: string
        patents: {
          id: number
          title: string
          abstract: string
          features: string[]
        }[]
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
        part2: 'BioGas Ecosystem',
        part3: 'BioGas GPT'
      },
      aboutUs: {
        title: {
          part1: 'About',
          part2: 'BioSarthi',
          subtitle: ' Leading the revolution in biogas technology solutions'
        },
        sectionTitles: {
          vision: 'Vision',
          mission: 'Mission',
          offerings: 'Our Offerings'
        },
        Vision:
          'BioSarthi’s vision is to lead the transformation of energy ecosystems through biogas, empowering communities in India and globally for a sustainable future.',
        Mission:
          'BioSarthi’s mission is to empower India’s biogas revolution through innovation, sustainability, and setting benchmarks in excellence. The company aims to revolutionize the biogas industry by addressing key pain points such as inconsistent gas generation, lack of real-time data, and inefficiencies in plant maintenance.',
        Offerings: [
          {
            title: 'BioSarthi® Real-Time Monitoring System',
            description:
              'An advanced monitoring system designed to optimize biogas plant operations and enhance sustainability.',
            features: [
              'Integrates ultrasonic flow meters, pressure sensors, and temperature sensors',
              'Delivers accurate, real-time data on plant performance',
              'Enables predictive maintenance and improved efficiency',
              'Features solar-powered IoT connectivity',
              'Cloud-based data transmission for seamless monitoring',
              'Compatible with existing PLC and SCADA systems in large commercial plants'
            ]
          }
        ]
      },
      searchPlaceholders: [
        'Ask about biogas plant maintenance...',
        'How to optimize biogas production?',
        'What are the safety protocols for biogas plants?',
        'Learn about biogas substrate mixing ratios...'
      ],
      footerLinks: {
        successStories: 'Success Stories',
        monitoring: 'Real Time Monitoring System',
        chat: 'BioGas GPT',
        privacy: 'Privacy',
        terms: 'Terms & Conditions',
        patent: 'Patent',
        copyright: 'Copyright'
      },
      contactUs: {
        title: {
          part1: 'Contact',
          part2: 'Us'
        },
        subtitle:
          "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        sendMessage: 'Send Message',
        messagePlaceholder: 'Type your message here...',
        whatsappPlaceholder: 'Send Message on WhatsApp'
      },
      Terms: {
        title: {
          part1: 'Terms &',
          part2: 'Conditions'
        },
        subtitle:
          'BioSarthi® AI Engine, developed by CGF BioEnergy Pvt. Ltd., is provided for informational purposes only. By using this service, you agree to these Terms of Use and Disclaimer.',
        disclaimer: 'Disclaimer of Liability',
        disclaimerContent:
          'CGF BioEnergy Pvt. Ltd. is not liable for any decisions or actions taken based on AI-generated responses. The company does not guarantee the accuracy or completeness of the information provided. The information shared should not be considered as professional advice. Please consult a professional for technical, financial, or legal matters.',
        intellectualPropertyRights: 'Intellectual Property Rights',
        intellectualPropertyRightsContent:
          'All trademarks, logos, and content are the intellectual property of CGF BioEnergy Pvt. Ltd. We reserve the right to modify these terms at any time without prior notice. By using BioSarthi® AI Engine, you consent to these terms and agree to the disclaimers mentioned above.'
      },
      patentsData: {
        title: {
          firstPart: 'Our',
          secondPart: 'Patents'
        },
        introduction:
          'Discover our innovative patents that are revolutionizing the biogas technology industry. Our intellectual property portfolio demonstrates our commitment to advancing sustainable energy solutions.',
        patents: [
          {
            id: 1,
            title: 'BioSarthi® Real-Time Monitoring System',
            abstract:
              'An advanced monitoring system designed to optimize biogas plant operations and enhance sustainability through real-time data collection and analysis.',
            features: [
              'Integrates ultrasonic flow meters, pressure sensors, and temperature sensors',
              'Delivers accurate, real-time data on plant performance',
              'Advanced analytics for operational optimization',
              'Predictive maintenance capabilities'
            ]
          }
        ]
      }
    },
    hi: {
      title: {
        part1: 'बायोगैस क्रांति: ',
        part2: 'स्वच्छ ऊर्जा की नई उड़ान',
        part3: 'बायोगैस GPT'
      },
      aboutUs: {
        title: {
          part1: 'बायोसार्थी',
          part2: 'के बारे में',
          subtitle: ' बायोगैस प्रौद्योगिकी समाधानों में क्रांति की ओर अगुआई'
        },
        sectionTitles: {
          vision: 'दृष्टि',
          mission: 'लक्ष्य',
          offerings: 'हमारी सेवाएं'
        },
        Vision:
          'बायोसार्थी का उद्देश्य बायोगैस नवाचार के माध्यम से ऊर्जा पारिस्थितिकी तंत्र में परिवर्तन का नेतृत्व करना है, भारत और वैश्विक स्तर पर समुदायों को सशक्त बनाते हुए एक सतत भविष्य की ओर बढ़ना।',
        Mission:
          'बायोसार्थी का मिशन नवाचार, स्थिरता और उत्कृष्टता में नए मानक स्थापित करते हुए भारत की बायोगैस क्रांति को सशक्त बनाना है। कंपनी का उद्देश्य बायोगैस उद्योग में क्रांति लाना है, मुख्य समस्याओं जैसे गैस उत्पादन की असंगति, वास्तविक समय डेटा की कमी, और संयंत्र रखरखाव की अक्षमताओं को दूर करना।',
        Offerings: [
          {
            title: 'बायोसार्थी® रियल-टाइम मॉनिटरिंग सिस्टम',
            description:
              'एक उन्नत मॉनिटरिंग सिस्टम जो बायोगैस संयंत्र संचालन को अनुकूलित करने और स्थिरता को बढ़ाने के लिए डिज़ाइन किया गया है।',
            features: [
              'अल्ट्रासोनिक फ्लो मीटर, प्रेशर सेंसर और तापमान सेंसर को एकीकृत करता है',
              'संयंत्र के प्रदर्शन पर सटीक, वास्तविक समय डेटा प्रदान करता है',
              'पूर्वानुमानित रखरखाव और बेहतर दक्षता सक्षम करता है',
              'सौर ऊर्जा से चलने वाली IoT कनेक्टिविटी की सुविधा',
              'निरंतर निगरानी के लिए क्लाउड-आधारित डेटा ट्रांसमिशन',
              'बड़े वाणिज्यिक संयंत्रों में मौजूदा PLC और SCADA सिस्टम के साथ संगत'
            ]
          }
        ]
      },
      searchPlaceholders: [
        'बायोगैस संयंत्र रखरखाव के बारे में पूछें...',
        'बायोगैस उत्पादन को कैसे अनुकूलित करें?',
        'बायोगैस संयंत्रों के लिए सुरक्षा प्रोटोकॉल क्या हैं?',
        'बायोगैस सब्सट्रेट मिश्रण अनुपात के बारे में जानें...'
      ],
      footerLinks: {
        successStories: 'सफलता की कहानियाँ',
        monitoring: 'रीयल टाइम मॉनिटरिंग सिस्टम',
        chat: 'अभी चैट करें',
        privacy: 'गोपनीयता',
        terms: 'नियम और शर्तें',
        patent: 'पेटेंट',
        copyright: 'कॉपीराइट'
      },
      contactUs: {
        title: {
          part1: 'संपर्क',
          part2: 'करें'
        },
        subtitle:
          'कोई प्रश्न है? हमें संदेश भेजें और हम जल्द से जल्द जवाब देंगे।',
        email: 'ईमेल',
        phone: 'फोन',
        address: 'पता',
        sendMessage: 'संदेश भेजें',
        messagePlaceholder: 'अपना संदेश यहाँ टाइप करें...',
        whatsappPlaceholder: 'WhatsApp पर संदेश भेजें'
      },
      Terms: {
        title: {
          part1: 'नियम और',
          part2: 'शर्तें'
        },
        subtitle:
          'BioSarthi® AI इंजन, जिसे CGF BioEnergy Pvt. Ltd. द्वारा विकसित किया गया है, केवल जानकारीात्मक उद्देश्यों के लिए प्रदान किया गया है। इस सेवा का उपयोग करके, आप इन उपयोग की शर्तों और अस्वीकरण से सहमत होते हैं।',
        disclaimer: 'दायित्व का अस्वीकरण',
        disclaimerContent:
          'CGF BioEnergy Pvt. Ltd. किसी भी निर्णय या क्रियाओं के लिए जिम्मेदार नहीं है जो AI-जनित प्रतिक्रियाओं के आधार पर लिया गया हो। कंपनी प्रदान की गई जानकारी की सटीकता या पूर्णता की गारंटी नहीं देती। साझा की गई जानकारी को पेशेवर सलाह के रूप में नहीं माना जाना चाहिए। कृपया तकनीकी, वित्तीय या कानूनी मामलों के लिए एक पेशेवर से परामर्श करें।',
        intellectualPropertyRights: 'बौद्धिक संपदा अधिकार',
        intellectualPropertyRightsContent:
          'इस सेवा, सामग्री और जानकारी पर सभी बौद्धिक संपदा अधिकार (जैसे कॉपीराइट, ट्रेडमार्क, पेटेंट, आदि) CGF BioEnergy Pvt. Ltd. या संबंधित पक्षों के पास सुरक्षित हैं। बिना स्पष्ट अनुमति के, इस सामग्री को पुनः उत्पादित, वितरित, संशोधित या किसी अन्य उद्देश्य के लिए उपयोग नहीं किया जा सकता। उपयोगकर्ता को इस सेवा के किसी भी हिस्से को पुनः प्रस्तुत करने, पुनः प्रसार करने या व्यावसायिक लाभ के लिए उपयोग करने का कोई अधिकार नहीं है, सिवाय इसके कि यह शर्तों और उपयोग नीति के तहत अनुमत हो।'
      },
      patentsData: {
        title: {
          firstPart: 'BioSarthi®',
          secondPart: 'के पेटेंट'
        },
        introduction:
          'हमारे नवीन पेटेंट खोजें जो बायोगैस तकनीकी उद्योग में क्रांति ला रहे हैं। हमारा बौद्धिक संपदा पोर्टफोलियो सतत ऊर्जा समाधानों को आगे बढ़ाने की हमारी प्रतिबद्धता को दर्शाता है।',
        patents: [
          {
            id: 1,
            title: 'BioSarthi® रियल-टाइम मॉनिटरिंग सिस्टम',
            abstract:
              'एक उन्नत मॉनिटरिंग सिस्टम, जिसे बायोगैस प्लांट संचालन को अनुकूलित करने और रीयल-टाइम डेटा संग्रह व विश्लेषण के माध्यम से स्थिरता बढ़ाने के लिए डिज़ाइन किया गया है।',
            features: [
              'अल्ट्रासोनिक फ्लो मीटर, प्रेशर सेंसर और टेम्परेचर सेंसर को एकीकृत करता है',
              'प्लांट प्रदर्शन पर सटीक, रियल-टाइम डेटा प्रदान करता है',
              'संचालन अनुकूलन के लिए उन्नत विश्लेषण',
              'पूर्वानुमानित रखरखाव क्षमताएं'
            ]
          }
        ]
      }
    }
  }
}))

export default useLanguageStore
