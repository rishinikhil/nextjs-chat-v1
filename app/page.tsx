'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Search, Mic, X, ArrowRight, Compass } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import useSearchStore from './store/useSearchStore'
import { GridSmallBackgroundDemo } from '@/components/ui/grid-background'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholderAndVanish'
import { Button, MovingBorder } from '@/components/ui/moving-border'
import useLanguageStore from './store/useLanguageStore'
import { useRouter } from 'next/navigation'
// Preset search items with icons and routes
const presetItems = [
  { icon: Compass, text: 'Marketplace', route: '/marketplace' },
  {
    icon: Compass,
    text: 'Real Time Monitoring System',
    route: '/monitoringsystem'
  },
  { icon: Search, text: 'ChatNow', route: '/chats' },
  { icon: Search, text: 'Privacy Policy', route: '/privacy' },
  { icon: Search, text: 'Terms & Conditions', route: '/terms' },
  { icon: Search, text: 'Patent Information', route: '/patent' },
  { icon: Search, text: 'Copyright Details', route: '/copyright' }
]

// Type definitions for Speech Recognition
interface IWindow extends Window {
  webkitSpeechRecognition?: typeof SpeechRecognition
  SpeechRecognition?: typeof SpeechRecognition
}

declare const window: IWindow

type SpeechRecognitionEvent = {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
      }
    }
  }
  error?: string
}

// Add this declaration for SpeechRecognition
declare class SpeechRecognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  onstart: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: { error: string }) => void
  onend: () => void
  start: () => void
  stop: () => void
}

const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchStore()
  const { currentLanguage, setLanguage, translations } = useLanguageStore()
  const [isListening, setIsListening] = useState<boolean>(false)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const router = useRouter()

  // Get current translations
  const currentTranslations = translations[currentLanguage]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Store the search query in sessionStorage
      sessionStorage.setItem('initialChatMessage', searchQuery.trim())
      // Navigate to the chats page
      router.push('/chats')
    }
  }

  // Filter suggestions based on search query
  // Filter through the presetItems array to find matching suggestions
  // 1. presetItems.filter() creates a new array containing only items that match the condition
  // 2. For each item, convert both the item text and search query to lowercase
  // 3. Check if the item text includes the search query as a substring
  // 4. Returns array of matching items that will be used for suggestions
  const filteredSuggestions = presetItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // This useEffect hook handles clicking outside the search component
  // It closes the suggestions dropdown when clicking anywhere else on the page
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSpeechRecognition = (): void => {
    const SpeechRecognitionAPI =
      window.webkitSpeechRecognition || window.SpeechRecognition

    if (SpeechRecognitionAPI) {
      try {
        // Stop any existing recognition session
        if (recognitionRef.current) {
          recognitionRef.current.stop()
          recognitionRef.current = null
          setIsListening(false)
          return
        }

        const recognition = new SpeechRecognitionAPI()
        recognitionRef.current = recognition

        recognition.lang = 'en-US'
        recognition.interimResults = false
        recognition.continuous = false

        recognition.onstart = (): void => {
          setIsListening(true)
        }

        recognition.onresult = (event: SpeechRecognitionEvent): void => {
          const transcript = event.results[0][0].transcript
          setSearchQuery(transcript)
          setIsListening(false)
          recognitionRef.current = null
        }

        recognition.onerror = (event: { error: string }): void => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          recognitionRef.current = null
        }

        recognition.onend = (): void => {
          setIsListening(false)
          recognitionRef.current = null
        }

        recognition.start()
      } catch (error) {
        console.error('Speech recognition error:', error)
        setIsListening(false)
        recognitionRef.current = null
      }
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  // Cleanup function for speech recognition
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
    }
  }, [])

  // Add these placeholders
  const searchPlaceholders = [
    'Ask about biogas plant maintenance...',
    'How to optimize biogas production?',
    'What are the safety protocols for biogas plants?',
    'Learn about biogas substrate mixing ratios...'
  ]

  // Inside the SearchPage component, add a new handler for input focus
  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  return (
    <div className="h-screen w-full absolute top-0">
      <GridSmallBackgroundDemo>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow flex items-center justify-center px-4">
            <div className="w-full">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-12 text-center"
              >
                <span className="text-[#318832]">
                  {currentTranslations.title.part1}
                </span>{' '}
                <span className="text-[#DD2E29]">
                  {currentTranslations.title.part2}
                </span>
              </motion.h1>

              <motion.div
                ref={searchRef}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-2xl mx-auto relative"
              >
                <div className="w-full relative">
                  <div className="absolute inset-0">
                    {/* First ball at the start */}
                    <MovingBorder duration={4000} rx="1rem" ry="1rem">
                      <div className="h-[12px] w-[12px] opacity-[0.3] bg-[radial-gradient(#000000_40%,transparent_60%)]" />
                    </MovingBorder>

                    {/* Second ball at 50% offset */}
                    <MovingBorder
                      duration={4000}
                      rx="1rem"
                      ry="1rem"
                      offset={2000}
                    >
                      <div className="h-[12px] w-[12px] opacity-[0.3] bg-[radial-gradient(#000000_40%,transparent_60%)]" />
                    </MovingBorder>
                  </div>
                  <div className="relative z-10">
                    <PlaceholdersAndVanishInput
                      placeholders={currentTranslations.searchPlaceholders}
                      onChange={e => {
                        setSearchQuery(e.target.value)
                        setShowSuggestions(true)
                      }}
                      onSubmit={e => {
                        e.preventDefault()
                        handleSearch()
                      }}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute w-full bg-white border-x border-b rounded-2xl shadow-lg mt-1 z-20 max-h-[400px] overflow-y-auto"
                      style={{
                        width: 'calc(100% - 2px)',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0'
                      }}
                    >
                      {searchQuery === '' ? (
                        // Show preset items when no search query
                        presetItems.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => (window.location.href = item.route)}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                          >
                            <item.icon
                              className="text-gray-400 group-hover:text-gray-600"
                              size={18}
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                              {item.text}
                            </span>
                            <ArrowRight
                              className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100"
                              size={18}
                            />
                          </div>
                        ))
                      ) : // Show filtered suggestions or redirect to chat if no matches
                      filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => (window.location.href = item.route)}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                          >
                            <item.icon
                              className="text-gray-400 group-hover:text-gray-600"
                              size={18}
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                              {item.text}
                            </span>
                            <ArrowRight
                              className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100"
                              size={18}
                            />
                          </div>
                        ))
                      ) : (
                        <div
                          onClick={handleSearch}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                        >
                          <Search
                            className="text-gray-400 group-hover:text-gray-600"
                            size={18}
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                            Chat about "{searchQuery}"
                          </span>
                          <ArrowRight
                            className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100"
                            size={18}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-4 space-x-4 text-sm mx-auto"
                >
                  <span className="text-gray-600">
                    {currentLanguage === 'en'
                      ? 'BioSarthi offered in:'
                      : 'बायोसारथी उपलब्ध है:'}
                  </span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`${
                      currentLanguage === 'en'
                        ? 'text-blue-600 font-semibold'
                        : 'text-blue-500'
                    } hover:underline`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`${
                      currentLanguage === 'hi'
                        ? 'text-blue-600 font-semibold'
                        : 'text-blue-500'
                    } hover:underline`}
                  >
                    हिंदी
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full bg-white/60 backdrop-blur-sm border-t border-gray-200"
          >
            <div className="w-full mx-auto px-4 py-3">
              <div className="flex flex-wrap gap-6 justify-between text-gray-700">
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/marketplace"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.marketplace}
                  </Link>
                  <Link
                    href="/monitoringsystem"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.monitoring}
                  </Link>
                  <Link
                    href="/chats"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.chat}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/privacy"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.privacy}
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.terms}
                  </Link>
                  <Link
                    href="/patent"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.patent}
                  </Link>
                  <Link
                    href="/copyright"
                    className="hover:underline hover:text-blue-500 transition-colors"
                  >
                    {currentTranslations.footerLinks.copyright}
                  </Link>
                </div>
              </div>
            </div>
          </motion.footer>
        </div>
      </GridSmallBackgroundDemo>
    </div>
  )
}

export default SearchPage
