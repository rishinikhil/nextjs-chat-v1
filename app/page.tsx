'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Search, Mic, X, ArrowRight, Compass } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import useSearchStore from './store/useSearchStore'
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

const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearchStore()
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams()
      searchParams.append('q', searchQuery)
      window.location.href = `/chats?${searchParams.toString()}`
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

  return (
    <div className="h-[92vh] flex flex-col overflow-hidden items-center justify-center bg-white">
      {/* Headline */}
      <div className="h-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center mx-auto"
        >
          <span style={{ color: '#318832' }}>Transforming</span>{' '}
          <span style={{ color: '#DD2E29' }}>BioGas Future</span>
        </motion.h1>

        {/* Search Container */}
        <motion.div
          ref={searchRef}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl relative mx-auto"
        >
          {/* Search Box */}
          <div className="flex items-center w-full px-4 py-3 rounded-t-full rounded-b-full border hover:shadow-md focus-within:shadow-lg transition-shadow duration-300 relative z-10 bg-white">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="flex-grow mx-4 outline-none text-lg"
              placeholder="Search for anything"
            />
            {searchQuery && (
              <X
                className="text-gray-400 cursor-pointer hover:scale-110 transition-transform"
                size={20}
                onClick={() => setSearchQuery('')}
              />
            )}
            <Mic
              className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
              size={20}
            />
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-full bg-white border-x border-b rounded-b-2xl shadow-lg mt-[-1px] z-20 max-h-[400px] overflow-y-auto"
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

          {/* Language Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-4 space-x-4 text-sm mx-auto"
          >
            <span className="text-gray-600">BioSarthi offered in:</span>
            <Link href="#" className="text-blue-600 hover:underline">
              English
            </Link>
            <Link href="#" className="text-blue-600 hover:underline">
              हिंदी
            </Link>
            <Link href="#" className="text-blue-600 hover:underline">
              বাংলা
            </Link>
            <Link href="#" className="text-blue-600 hover:underline">
              ગુજરાતી
            </Link>
            <Link href="#" className="text-blue-600 hover:underline">
              मराठी
            </Link>
          </motion.div>
        </motion.div>
      </div>
      {/* Footer remains the same */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-100 mt-auto border-t border-gray-200 w-full"
      >
        <div className="px-6 py-3 flex justify-between text-gray-600">
          <div className="flex space-x-6">
            <Link
              href="/marketplace"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/vishal ka naam"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Real Time Monitoring System
            </Link>
            <Link
              href="/chats"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              ChatNow
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/patent"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Patent
            </Link>
            <Link
              href="/copyright"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Copyright
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default SearchPage
