'use client'
import { Card } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            At BioSarthi, we collect various types of information to provide and
            improve our services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Personal identification information (Name, email address, phone
              number)
            </li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
            <li>Biogas plant operational data</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            Your information helps us provide and improve our services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </Card>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: March 15, 2024
        </p>
      </div>
    </div>
  )
}
