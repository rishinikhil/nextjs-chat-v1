'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const AboutUs = () => {
  return (
    <div className="min-h-[92vh] flex flex-col bg-white">
      {/* Hero Section */}
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
          <span style={{ color: '#318832' }}>About</span>{' '}
          <span style={{ color: '#DD2E29' }}>BioSarthi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-center text-gray-600 mb-12"
        >
          Leading the revolution in biogas technology and sustainable energy
          solutions
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-grow px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              At BioSarthi, we're committed to transforming the biogas industry
              through innovative technology and sustainable practices. Our
              platform connects stakeholders, provides real-time monitoring, and
              promotes efficient resource utilization.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            <p className="text-gray-600">
              We envision a future where biogas technology plays a crucial role
              in sustainable energy production, contributing to environmental
              conservation and rural development across India and beyond.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Marketplace</h3>
              <p className="text-gray-600">
                Connect with suppliers, buyers, and service providers in the
                biogas ecosystem
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Monitoring System</h3>
              <p className="text-gray-600">
                Real-time monitoring and analytics for biogas plants
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-3">ChatNow Support</h3>
              <p className="text-gray-600">
                24/7 expert assistance and community support
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
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
              className="hover:underline hover:text-blue-500 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/monitoringsystem"
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

export default AboutUs
