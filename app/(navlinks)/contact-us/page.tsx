'use client'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Mail className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@biosarthi.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Phone className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+91 (800) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <MapPin className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Green Energy Street, Tech Park
                    <br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <Input placeholder="Your Name" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" />
            </div>
            <div>
              <Input placeholder="Subject" />
            </div>
            <div>
              <Textarea placeholder="Your Message" className="min-h-[150px]" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
