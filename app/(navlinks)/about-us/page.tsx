'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import useLanguageStore from '@/app/store/useLanguageStore'

const AboutUs = () => {
  const { currentLanguage, translations } = useLanguageStore()
  const content = translations[currentLanguage]

  return (
    <div className="min-h-[92vh] flex flex-col bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          <span style={{ color: '#318832' }}>
            {content.aboutUs.title.part1}{' '}
          </span>{' '}
          <span style={{ color: '#DD2E29' }}>
            {content.aboutUs.title.part2}{' '}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center"
        >
          {content.aboutUs.title.subtitle}{' '}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-grow px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {content.aboutUs.sectionTitles.vision}
            </h2>
            <p className="text-gray-600">{content.aboutUs.Vision}</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {content.aboutUs.sectionTitles.mission}
            </h2>
            <p className="text-gray-600">{content.aboutUs.Mission}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {content.aboutUs.sectionTitles.offerings}
        </h2>

        <div className="space-y-8 mb-16">
          {content.aboutUs.Offerings.map((offering, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-xl mb-4">{offering.title}</h3>
              <p className="text-gray-600 mb-4">{offering.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {offering.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-800">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-100 border-t border-gray-200 w-full"
      >
        <div className="px-6 py-3 flex justify-between text-gray-600">
          <div className="flex space-x-6">
            <Link
              href="/marketplace"
              className="hover:underline hover:text-blue-500"
            >
              {content.footerLinks.successStories}
            </Link>
            <Link
              href="/monitoringsystem"
              className="hover:underline hover:text-blue-500"
            >
              {content.footerLinks.monitoring}
            </Link>
            <Link href="/chats" className="hover:underline hover:text-blue-500">
              {content.footerLinks.chat}
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:underline hover:text-blue-500"
            >
              {content.footerLinks.privacy}
            </Link>
            <Link href="/terms" className="hover:underline hover:text-blue-500">
              {content.footerLinks.terms}
            </Link>
            <Link
              href="/patent"
              className="hover:underline hover:text-blue-500"
            >
              {content.footerLinks.patent}
            </Link>
            <Link
              href="/copyright"
              className="hover:underline hover:text-blue-500"
            >
              {content.footerLinks.copyright}
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default AboutUs
