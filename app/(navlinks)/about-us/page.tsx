'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import useLanguageStore from '@/app/store/useLanguageStore'
import { Badge } from '@/components/ui/badge' // Assuming Badge component exists
import AnimatedFooter from '@/components/animatedFooter'

const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

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
            {content.aboutUs.title.part2}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center"
        >
          {content.aboutUs.title.subtitle}
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

        <motion.section
          className="space-y-12 mb-24"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center">Our Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div className="text-center space-y-4" variants={fadeIn}>
              <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center">
                <Link href={'/patent'} className="hover:underline">
                  <Image
                    src="/bioSarthiPatent.png"
                    alt="patent@BioSarthi"
                    width={160}
                    height={80}
                    className="object-contain"
                  />
                </Link>
              </div>
              <p className="font-medium">Patented Technology</p>
            </motion.div>
            <motion.div className="text-center space-y-4" variants={fadeIn}>
              <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center">
                <Image
                  src="/nasscom.png"
                  alt="NASSCOM"
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="font-medium">NASSCOM CoE Incubated</p>
            </motion.div>
            <motion.div className="text-center space-y-4" variants={fadeIn}>
              <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center">
                <Image
                  src="/startUpIndia.png"
                  alt="DPIIT"
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="font-medium">DPIIT Recognized</p>
            </motion.div>
            <motion.div className="text-center space-y-4" variants={fadeIn}>
              <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center justify-center">
                <Image
                  src="/JpalCerti.png"
                  alt="JPAL"
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="font-medium">Supported by JPAL</p>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <AnimatedFooter />
    </div>
  )
}

export default AboutUs
