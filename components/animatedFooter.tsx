'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React from 'react'
import useLanguageStore from '@/app/store/useLanguageStore'
import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaWhatsapp
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
const AnimatedFooter = () => {
  const { currentLanguage, setLanguage, translations } = useLanguageStore()
  const currentTranslations = translations[currentLanguage]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="w-full bg-white/60 backdrop-blur-sm border-t border-gray-200"
    >
      <div className="w-full mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 text-gray-700">
          {/* Left Links */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
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
              href="/chats"
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              {currentTranslations.footerLinks.chat}
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 justify-center">
            <Link
              href="https://www.youtube.com/@biosarthi"
              target="_blank"
              className="hover:text-red-600"
            >
              <FaYoutube size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/biosarthi/"
              target="_blank"
              className="hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="https://whatsapp.com/channel/0029Vam77IZHrDZm08DrL646"
              target="_blank"
              className="hover:text-[#25d366]"
            >
              <FaWhatsapp size={24} />
            </Link>

            <Link
              href="https://www.instagram.com/biosarthi"
              target="_blank"
              className="hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://x.com/BioSarthi"
              target="_blank"
              className="hover:text-blue-600"
            >
              <FaXTwitter size={24} />
            </Link>
            <Link
              href="https://www.facebook.com/people/BioSarthi/61571977633976/"
              target="_blank"
              className="hover:text-blue-600"
            >
              <FaFacebook size={24} />
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
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
