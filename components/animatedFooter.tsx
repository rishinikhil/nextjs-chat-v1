'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'
import useLanguageStore from '@/app/store/useLanguageStore'

const AnimatedFooter = () => {
  const { currentLanguage, setLanguage, translations } = useLanguageStore()
  // Get current translations
  const currentTranslations = translations[currentLanguage]
  return (
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
              href="/monitoringsystem"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              {currentTranslations.footerLinks.monitoring}
            </Link>
            <Link
              href="/patent"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              {currentTranslations.footerLinks.patent}
            </Link>

            <Link
              href="/successSotries"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              {currentTranslations.footerLinks.successStories}
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
              href="/copyright"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              {currentTranslations.footerLinks.copyright}
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default AnimatedFooter
