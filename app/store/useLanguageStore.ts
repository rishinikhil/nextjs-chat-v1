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
      monitoringData: {
        title: {
          firstPart: string
          secondPart: string
        }
        introduction: string
        headers: string[]
        rows: string[][]
      }
      copyrightData: {
        title: string
        content: string
        sections: {
          heading: string
          text: string
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
      },
      monitoringData: {
        title: {
          firstPart: 'BioSarthi®',
          secondPart: 'Monitoring System Comparison'
        },
        introduction:
          'Compare the BioSarthi® Monitoring System with other available solutions to understand its advantages and benefits.',
        headers: [
          'Parameter',
          'BioSarthi Monitoring System For Biogas Plants',
          'BioSarthi Monitoring System For CBG Plants',
          'Other Monitoring Systems'
        ],
        rows: [
          [
            'Flow Meter Technology',
            'Ultrasonic (±1.5% precision)',
            'Connects with existing flow meters',
            'Varies: Differential, Electromagnetic, Thermal Mass (±1.5% to ±7%)'
          ],
          [
            'Pressure & Temperature Sensitivity',
            'Low, real-time data',
            'High, connects with existing sensors',
            'Medium to High, delayed data'
          ],
          [
            'Data Transmission',
            '4G, real-time cloud-based',
            '4G, real-time cloud-based',
            'Local, periodic updates'
          ],
          [
            'Power Source',
            'Solar with robust backup',
            'Solar with robust backup, connects with inhouse power source as well',
            'Solar, often needs external power'
          ],
          [
            'Filtration System',
            'Included, low-cost',
            'Connects with PLC of existing purification system',
            'Requires separate purchase'
          ],
          [
            'Data Storage & Backup',
            'Cloud-based with backup',
            'Cloud-based with backup',
            'Local storage, limited backup'
          ],
          [
            'Maintenance & Support',
            'Automated alerts, comprehensive',
            'Automated alerts, comprehensive',
            'Manual alerts, limited support'
          ],
          [
            'Data Security',
            'Strong encryption, secure cloud',
            'Strong encryption, secure cloud',
            'Basic security, potential vulnerabilities'
          ],
          [
            'Integration with Control Systems',
            'Seamless with PLC and SCADA',
            'Seamless with PLC and SCADA',
            'Basic to moderate integration'
          ],
          [
            'Cost-Effectiveness',
            'Low cost, high value',
            'Low cost, high value',
            'High cost'
          ],
          [
            'Long-Term Benefit',
            'High, durable components',
            'High, durable components',
            'Medium, with more frequent replacements'
          ],
          [
            'Warranty & Reliability',
            'Comprehensive warranty, high reliability',
            'Comprehensive warranty, high reliability',
            'Limited warranty, varied reliability'
          ],
          [
            'Training & Onboarding',
            'Extensive documentation and training content available',
            'Extensive documentation and training content available',
            'Basic, limited training resources'
          ],
          [
            'Scalability',
            'Easily scalable, supports multiple plants',
            'Easily scalable, supports multiple flow meters, gas analysers, multiple PLCs, SCADA systems as well as analog devices',
            'Varies: Differential, Electromagnetic, Thermal Mass (±1.5% to ±7%)'
          ]
        ]
      },
      copyrightData: {
        title: 'Terms of Use & Disclaimer',
        content:
          'BioSarthi® AI Engine, developed by CGF BioEnergy Pvt. Ltd., is provided for informational purposes only. By using this service, you agree to these Terms of Use and Disclaimer. CGF BioEnergy Pvt. Ltd. is not liable for any decisions or actions taken based on AI-generated responses. The company does not guarantee the accuracy or completeness of the information provided. The information shared should not be considered as professional advice. Please consult a professional for technical, financial, or legal matters. All trademarks, logos, and content are the intellectual property of CGF BioEnergy Pvt. Ltd. We reserve the right to modify these terms at any time without prior notice. By using BioSarthi® AI Engine, you consent to these terms and agree to the disclaimers mentioned above. For any questions or concerns, please contact us at hello[at]biosarthi.com.',
        sections: [
          {
            heading: 'Intellectual Property Rights',
            text: 'All content, including text, graphics, logos, and software, is owned by CGF BioEnergy Pvt. Ltd. and is protected under applicable copyright laws.'
          },
          {
            heading: 'Usage Restrictions',
            text: 'You may not copy, reproduce, distribute, or modify any part of the BioSarthi® AI Engine without prior written consent from CGF BioEnergy Pvt. Ltd.'
          },
          {
            heading: 'Limitation of Liability',
            text: 'We do not assume responsibility for any inaccuracies, omissions, or reliance on the information provided. The use of our AI Engine is at your own risk.'
          },
          {
            heading: 'Third-Party Links & Services',
            text: 'Our platform may contain links to third-party services or websites. We are not responsible for the content or policies of these external sources.'
          },
          {
            heading: 'Changes & Updates',
            text: 'CGF BioEnergy Pvt. Ltd. reserves the right to update or modify these terms at any time. Users are encouraged to review this page periodically.'
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
      },
      monitoringData: {
        title: {
          firstPart: 'BioSarthi®',
          secondPart: 'मॉनिटरिंग सिस्टम तुलना'
        },
        introduction:
          'अन्य उपलब्ध समाधानों की तुलना में BioSarthi® मॉनिटरिंग सिस्टम के लाभों और विशेषताओं को समझें।',
        headers: [
          'पैरामीटर',
          'बायोसार्थी मॉनिटरिंग सिस्टम बायोगैस प्लांट्स के लिए',
          'बायोसार्थी मॉनिटरिंग सिस्टम CBG प्लांट्स के लिए',
          'अन्य मॉनिटरिंग सिस्टम'
        ],
        rows: [
          [
            'फ्लो मीटर टेक्नोलॉजी',
            'अल्ट्रासोनिक (±1.5% सटीकता)',
            'मौजूदा फ्लो मीटर से कनेक्ट होता है',
            'विभिन्न प्रकार: डिफरेंशियल, इलेक्ट्रोमैग्नेटिक, थर्मल मास (±1.5% से ±7%)'
          ],
          [
            'दबाव और तापमान संवेदनशीलता',
            'कम, वास्तविक समय डेटा',
            'उच्च, मौजूदा सेंसर से कनेक्ट होता है',
            'मध्यम से उच्च, विलंबित डेटा'
          ],
          [
            'डेटा ट्रांसमिशन',
            '4G, वास्तविक समय क्लाउड-आधारित',
            '4G, वास्तविक समय क्लाउड-आधारित',
            'स्थानीय, आवधिक अपडेट'
          ],
          [
            'पावर स्रोत',
            'सौर ऊर्जा के साथ मजबूत बैकअप',
            'सौर ऊर्जा के साथ मजबूत बैकअप, इनहाउस पावर स्रोत से भी कनेक्ट होता है',
            'सौर ऊर्जा, अक्सर बाहरी पावर की आवश्यकता होती है'
          ],
          [
            'फिल्टरेशन सिस्टम',
            'शामिल, कम लागत',
            'मौजूदा शुद्धिकरण प्रणाली के PLC से कनेक्ट होता है',
            'अलग से खरीदना आवश्यक'
          ],
          [
            'डेटा स्टोरेज और बैकअप',
            'क्लाउड-आधारित बैकअप के साथ',
            'क्लाउड-आधारित बैकअप के साथ',
            'स्थानीय स्टोरेज, सीमित बैकअप'
          ],
          [
            'रखरखाव और समर्थन',
            'स्वचालित अलर्ट, व्यापक',
            'स्वचालित अलर्ट, व्यापक',
            'मैनुअल अलर्ट, सीमित समर्थन'
          ],
          [
            'डेटा सुरक्षा',
            'मजबूत एन्क्रिप्शन, सुरक्षित क्लाउड',
            'मजबूत एन्क्रिप्शन, सुरक्षित क्लाउड',
            'मूलभूत सुरक्षा, संभावित कमजोरियां'
          ],
          [
            'नियंत्रण प्रणालियों के साथ एकीकरण',
            'PLC और SCADA के साथ सहज',
            'PLC और SCADA के साथ सहज',
            'मूल से मध्यम एकीकरण'
          ],
          [
            'लागत प्रभावशीलता',
            'कम लागत, उच्च मूल्य',
            'कम लागत, उच्च मूल्य',
            'उच्च लागत'
          ],
          [
            'दीर्घकालिक लाभ',
            'उच्च, टिकाऊ घटक',
            'उच्च, टिकाऊ घटक',
            'मध्यम, बार-बार प्रतिस्थापन की आवश्यकता'
          ],
          [
            'वारंटी और विश्वसनीयता',
            'व्यापक वारंटी, उच्च विश्वसनीयता',
            'व्यापक वारंटी, उच्च विश्वसनीयता',
            'सीमित वारंटी, विविध विश्वसनीयता'
          ],
          [
            'प्रशिक्षण और ऑनबोर्डिंग',
            'व्यापक दस्तावेज़ और प्रशिक्षण सामग्री उपलब्ध',
            'व्यापक दस्तावेज़ और प्रशिक्षण सामग्री उपलब्ध',
            'मूलभूत, सीमित प्रशिक्षण संसाधन'
          ],
          [
            'विस्तार योग्यता',
            'आसानी से स्केलेबल, कई प्लांट्स का समर्थन करता है',
            'आसानी से स्केलेबल, कई फ्लो मीटर, गैस विश्लेषक, कई PLCs, SCADA सिस्टम और एनालॉग डिवाइसेस का समर्थन करता है',
            'विभिन्न प्रकार: डिफरेंशियल, इलेक्ट्रोमैग्नेटिक, थर्मल मास (±1.5% से ±7%)'
          ]
        ]
      },
      copyrightData: {
        title: 'उपयोग की शर्तें और अस्वीकरण',
        content:
          'BioSarthi® AI Engine, CGF BioEnergy Pvt. Ltd. द्वारा विकसित, केवल सूचना उद्देश्यों के लिए प्रदान किया गया है। इस सेवा का उपयोग करके, आप इन उपयोग की शर्तों और अस्वीकरण से सहमत होते हैं। CGF BioEnergy Pvt. Ltd. AI-जनित प्रतिक्रियाओं के आधार पर लिए गए निर्णयों या कार्यों के लिए उत्तरदायी नहीं है। कंपनी प्रदान की गई जानकारी की सटीकता या पूर्णता की गारंटी नहीं देती है। यह जानकारी पेशेवर सलाह के रूप में नहीं मानी जानी चाहिए। कृपया तकनीकी, वित्तीय या कानूनी मामलों के लिए किसी विशेषज्ञ से परामर्श करें। सभी ट्रेडमार्क, लोगो और सामग्री CGF BioEnergy Pvt. Ltd. की बौद्धिक संपत्ति हैं।',
        sections: [
          {
            heading: 'बौद्धिक संपत्ति अधिकार',
            text: 'सभी सामग्री, जिसमें पाठ, ग्राफिक्स, लोगो और सॉफ्टवेयर शामिल हैं, CGF BioEnergy Pvt. Ltd. के स्वामित्व में है और लागू कॉपीराइट कानूनों के तहत संरक्षित है।'
          },
          {
            heading: 'उपयोग प्रतिबंध',
            text: 'आप CGF BioEnergy Pvt. Ltd. की पूर्व लिखित अनुमति के बिना BioSarthi® एआई इंजन के किसी भी भाग की प्रतिलिपि, पुनरुत्पादन, वितरण या संशोधन नहीं कर सकते।'
          },
          {
            heading: 'दायित्व की सीमा',
            text: 'हम किसी भी अशुद्धियों, चूकों, या प्रदान की गई जानकारी पर निर्भरता के लिए जिम्मेदार नहीं हैं। हमारे एआई इंजन का उपयोग आपकी अपनी जोखिम पर है।'
          },
          {
            heading: 'तृतीय-पक्ष लिंक और सेवाएं',
            text: 'हमारे प्लेटफॉर्म में तृतीय-पक्ष सेवाओं या वेबसाइटों के लिंक हो सकते हैं। हम इन बाहरी स्रोतों की सामग्री या नीतियों के लिए उत्तरदायी नहीं हैं।'
          },
          {
            heading: 'परिवर्तन और अपडेट',
            text: 'CGF BioEnergy Pvt. Ltd. किसी भी समय इन शर्तों को अपडेट या संशोधित करने का अधिकार सुरक्षित रखता है। उपयोगकर्ताओं को समय-समय पर इस पृष्ठ की समीक्षा करने की सलाह दी जाती है।'
          }
        ]
      }
    }
  }
}))

export default useLanguageStore
