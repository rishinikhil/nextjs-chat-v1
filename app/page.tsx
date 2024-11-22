// page.tsx
'use client'
import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import Link from 'next/link'
const colors = {
  primary: '#DD2C2C', // Red from logo
  secondary: '#2A8A2A' // Green from logo
}

const BioSarthiLanding = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 transition-all duration-300 hover:scale-105">
              <span style={{ color: colors.primary }}>Transforming </span>
              <span style={{ color: colors.secondary }}>Biogas Future</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 transition-all duration-300">
              Your intelligent companion in the biogas revolution
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-red-600 to-green-600 text-white px-8 py-4 rounded-full 
                       font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Map features */}
            {[
              {
                title: 'Smart Solutions',
                description: 'AI-powered biogas optimization',
                color: colors.primary
              },
              {
                title: 'Marketplace',
                description: 'Connect with verified suppliers',
                color: colors.secondary
              },
              {
                title: '24/7 Support',
                description: 'Always here to help you',
                color: colors.primary
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                         transform hover:-translate-y-1"
                style={{ borderLeft: `4px solid ${feature.color}` }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chat Interface */}
      {isChatOpen && (
        <div
          className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col 
                      transition-all duration-300 animate-slideIn"
        >
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-red-600 to-green-600 rounded-t-2xl">
            <div className="text-white">
              <h3 className="font-semibold">BioSarthi Assistant</h3>
              <p className="text-sm opacity-90">Online</p>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-all duration-300 hover:shadow-md">
              <p className="text-gray-800">
                Welcome to BioSarthi! How can I assist you today?
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-green-600 transition-all duration-300"
              />
              <button
                className="bg-gradient-to-r from-red-600 to-green-600 text-white p-2 rounded-lg 
                         transition-all duration-300 hover:shadow-md"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Chat Button */}
      {!isChatOpen && (
        <button
          //   onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-red-600 to-green-600 text-white p-4 
                   rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
        >
          <Link href={'/chats'}>
            {' '}
            <MessageCircle className="h-6 w-6" />
          </Link>
        </button>
      )}
    </div>
  )
}

export default BioSarthiLanding
