"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageCircle } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { trackButtonClick } from "@/lib/supabase"

const testimonials = [
  { name: "John D.", text: "Millan Customz transformed my car! The quality is outstanding." },
  { name: "Sarah M.", text: "I love how my car looks now. Professional service and amazing results!" },
  { name: "Mike T.", text: "The team at Millan Customz are true artists. Highly recommended!" },
]

const services = [
  { name: "Car Wraps", path: "/car-wraps" },
  { name: "Paint Protection Film", path: "/paint-protection" },
  { name: "Ceramic Coating", path: "/ceramic-coating" },
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showServices, setShowServices] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Close services dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setShowServices(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1210897610-612x612.jpg-gUwZgQW1Iy1KsgDi2IUkSWyi1ezyHJ.jpeg"
            alt="Professional car wrap installation"
            fill
            className="object-cover object-center filter brightness-[0.85] contrast-[1.1]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold">Millan Customz</h1>
          </motion.div>
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform Your Ride
          </motion.h3>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Premium Car Wraps, Paint Protection, and More
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="text-lg transform transition-all hover:scale-105 hover:shadow-lg bg-white text-black hover:bg-gray-200"
              onClick={() => trackButtonClick("Explore Car Wraps")}
            >
              <Link href="/car-wraps">
                Explore Car Wraps <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Car Wraps",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/custom%20wrap.jpg-hs7o1EY8VqQ4Uuk8mJxZLYCJGDSN6r.jpeg",
                description: "Professional car wrap installation with precision and care",
                link: "/car-wraps",
              },
              {
                title: "Paint Protection",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ppf.jpg-VL7GR7ndXyXB0QamHMH79DIT2G42zo.jpeg",
                description: "Superior paint protection film installation for lasting protection",
                link: "/paint-protection",
              },
              {
                title: "Ceramic Coating",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ceramic-83F9IM1DmDWKE5Z5BmeYNfPPFDipbe.webp",
                description: "Advanced ceramic coating for ultimate shine and protection",
                link: "/ceramic-coating",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <Button
                    asChild
                    className="w-full transform transition-all hover:scale-105 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                    onClick={() => trackButtonClick(`View ${service.title}`)}
                  >
                    <Link href={service.link} className="flex items-center justify-center">
                      View {service.title} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800 dark:bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl mb-4">"{testimonials[currentTestimonial].text}"</p>
                <p className="font-semibold">- {testimonials[currentTestimonial].name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl mb-8 dark:text-gray-300">Experience the Millan Customz difference today!</p>
          <div className="relative" ref={servicesRef}>
            <Button
              size="lg"
              className="text-lg transform transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => {
                trackButtonClick("View Services")
                setShowServices(!showServices)
              }}
            >
              View Our Services <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 left-1/2 transform -translate-x-1/2"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.path}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        role="menuitem"
                        onClick={() => {
                          trackButtonClick(`Service: ${service.name}`)
                          setShowServices(false)
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-primary text-white hover:bg-primary-dark"
          onClick={() => trackButtonClick("Chat Button")}
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>
    </motion.div>
  )
}
