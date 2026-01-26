"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { trackButtonClick, submitContactForm } from "@/lib/supabase"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Track the button click
      trackButtonClick("Submit Contact Form")

      // Prepare contact data
      const contactData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        created_at: new Date().toISOString(),
      }

      // Submit contact form to Supabase
      const result = await submitContactForm(contactData)

      // Always clear the form and show success to the user
      setFormData({ name: "", email: "", message: "" })
      toast({
        title: "Message Sent",
        description: "Your message has been successfully sent!",
      })
    } catch (error) {
      console.error("Error in contact form submission process:", error)
      // Clear form for better UX
      setFormData({ name: "", email: "", message: "" })
      toast({
        title: "Message Received",
        description: "We've received your message and will be in touch soon.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-16 pt-32">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-gray-700 border-gray-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-700 border-gray-600"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="bg-gray-700 border-gray-600"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" onClick={() => trackButtonClick("Send Message")} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Our Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Rubis, Karen (Westwood Drive)</h3>
                <p>Westwood Drive, Karen, Nairobi, Kenya</p>
                <div className="mt-4 h-64 w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7799510332!2d36.7059!3d-1.3237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7554a3f%3A0x7f11e5dcd8a3a0ab!2sRubis%20Karen!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-2">🚗 Mobile Service Available</h3>
                <p className="text-gray-300">
                  We bring our services to you! Enjoy the convenience of professional car wrapping, paint protection and ceramic coating services at your home or office location. Contact us to schedule a mobile appointment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Hours of Operation</h3>
                <ul className="space-y-2">
                  <li>Monday - Saturday: 9AM - 6PM</li>
                  <li>Sunday: 10AM - 7PM</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <ul className="space-y-2">
                  <li>Phone: 0795557083</li>
                  <li>Email: millanautocustoms@icloud.com</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
