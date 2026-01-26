"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const features = [
  {
    title: "Self-Healing Technology",
    description:
      "Our PPF features advanced self-healing properties that automatically repair minor scratches and swirl marks with heat application.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/repair.jpg-LtV2Tg01jKjb0cqpsehDkqRUEkHU2G.jpeg",
  },
  {
    title: "Superior Protection",
    description:
      "Compare the difference between protected and unprotected surfaces. Our PPF provides ultimate protection against environmental damage.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/with%20or%20without%20ppf.jpg-B2JZJVFenYoLNOYFJZ02YDwZEG57lj.jpeg",
  },
]

const ppfTypes = [
  {
    name: "Gloss PPF",
    description: "Crystal clear protection that enhances your vehicle's natural shine",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gloss%20ppf.jpg-kwmNzrTjnKwcwcFbuGmBgTXEn3pS4b.jpeg",
  },
  {
    name: "Matte PPF",
    description: "Sophisticated matte finish while maintaining full protection",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matte%20ppf.jpg-r7s6rl9m1y4WoFZzwIWB6VFQI1x1WF.jpeg",
  },
  {
    name: "Gloss Black PPF",
    description: "Sleek black finish with superior protection capabilities",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gloss%20black%20ppf.jpg-3pERD7OLGvgDarivew8Hwv1kQW1uac.jpeg",
  },
]

export default function PaintProtection() {
  const [featureAnimations] = useState(() =>
    features.map(() => ({
      opacity: 0,
      y: 20,
    })),
  )
  const [ppfTypeAnimations] = useState(() =>
    ppfTypes.map(() => ({
      opacity: 0,
      scale: 0.9,
    })),
  )

  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const ppfTypeRefs = useRef<(HTMLDivElement | null)[]>([])

  const isElementInViewport = useCallback((el: HTMLElement | null) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }, [])

  const animateOnScroll = useCallback(() => {
    features.forEach((_, index) => {
      const element = featureRefs.current[index]
      if (element && isElementInViewport(element) && featureAnimations[index].opacity === 0) {
        featureAnimations[index] = { opacity: 1, y: 0 }
      }
    })
    ppfTypes.forEach((type, index) => {
      const element = ppfTypeRefs.current[index]
      if (element && isElementInViewport(element) && ppfTypeAnimations[index].opacity === 0) {
        ppfTypeAnimations[index] = { opacity: 1, scale: 1 }
      }
    })
  }, [isElementInViewport, featureAnimations, ppfTypeAnimations])

  useEffect(() => {
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Initial check

    return () => window.removeEventListener("scroll", animateOnScroll)
  }, [animateOnScroll])

  return (
    <div className="min-h-screen py-16 pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Paint Protection Film
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protect your vehicle's paint with our state-of-the-art PPF technology, offering unmatched protection against
            scratches, chips, and environmental damage.
          </p>
        </motion.div>
      </section>

      {/* Professional Installation Showcase */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            <img
              src="/images/services/ppf-bmw-installation.JPG"
              alt="Professional PPF installation on luxury BMW"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Professional Installation Excellence
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl">
                  Our expert technicians use precision techniques and premium materials to ensure flawless protection
                  for your vehicle. Every installation is performed with meticulous attention to detail.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <p className="text-sm text-gray-300">Expert Installation</p>
                    <p className="text-lg font-bold">Certified Technicians</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <p className="text-sm text-gray-300">Quality Guarantee</p>
                    <p className="text-lg font-bold">Premium Materials</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                    <p className="text-sm text-gray-300">Installation Time</p>
                    <p className="text-lg font-bold">2-3 Days</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits of PPF */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Benefits of Paint Protection Film
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Industry-leading protection for your vehicle</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">☀️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">UV Protection</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Maintain the condition of your vehicle's paint from harmful UV exposure, effectively reducing sunburn
                and fading over time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Enhanced Gloss</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Enhance the gloss finish of your vehicle, providing a deeper, more vibrant appearance that maintains its
                brilliance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Temperature Resistance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Provide high-temperature resistance, ensuring your paint protection remains effective even in extreme
                heat conditions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PPF Types Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our PPF Solutions</h2>
            <p className="text-gray-600 dark:text-gray-300">Choose the perfect finish for your vehicle</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ppfTypes.map((ppf, index) => (
              <motion.div
                key={ppf.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-2xl h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={ppf.image}
                      alt={ppf.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{ppf.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-center">{ppf.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Advanced PPF Technology
            </h2>
            <p className="text-gray-600 dark:text-gray-300">See the difference our protection makes</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 bg-white dark:bg-gray-800">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PPF Products and Pricing */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">PPF Products & Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300">Choose the protection level that fits your needs</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pp1">
                <AccordionTrigger>PP1 (7.5 mil) - 140,000 Kshs | 1 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Premium entry-level paint protection film offering excellent value and performance.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>7.5 mil thickness for reliable protection against minor impacts</li>
                      <li>Self-healing properties for minor scratches and swirl marks</li>
                      <li>Crystal clear finish that maintains paint visibility</li>
                      <li>UV resistant coating prevents yellowing and degradation</li>
                      <li>Easy maintenance and cleaning</li>
                      <li><strong>8 years of durability</strong></li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 1 year coverage against peeling, cracking, and yellowing
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp2">
                <AccordionTrigger>PP2 (8.5 mil) - 180,000 Kshs | 1.5 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Enhanced protection with superior durability and advanced self-healing technology.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>8.5 mil thickness provides enhanced impact resistance</li>
                      <li>Advanced self-healing formula repairs scratches with heat activation</li>
                      <li>Superior optical clarity with anti-glare properties</li>
                      <li>Enhanced UV protection with anti-yellowing technology</li>
                      <li>Improved adhesion for long-lasting application</li>
                      <li>Stain and chemical resistance</li>
                      <li><strong>10 years of durability</strong></li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 1.5 year coverage against peeling, cracking, yellowing, and adhesion
                      failure
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp3">
                <AccordionTrigger>PP3 (10 mil) - 220,000 Kshs | 2 Year Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Premium maximum protection film with industry-leading durability and performance.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>10 mil thickness offers maximum protection against rock chips and impacts</li>
                      <li>Professional-grade self-healing technology with rapid recovery</li>
                      <li>Ultra-clear finish with enhanced depth and gloss</li>
                      <li>Superior UV blocking prevents paint fading and oxidation</li>
                      <li>Advanced polymer construction for extreme durability</li>
                      <li>Hydrophobic surface for easy cleaning and maintenance</li>
                      <li>Temperature resistant from -40°F to 200°F</li>
                      <li><strong>10 years of durability</strong></li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <strong>Warranty:</strong> 2 year comprehensive coverage against all defects and performance
                      issues
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Quote System */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get a Quote</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardContent className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" />
                </div>
                <div>
                  <Label htmlFor="ppf-type">PPF Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select PPF type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pp1">PP1 (7.5 mil) - 140,000 Kshs</SelectItem>
                      <SelectItem value="pp2">PP2 (8.5 mil) - 180,000 Kshs</SelectItem>
                      <SelectItem value="pp3">PP3 (10 mil) - 220,000 Kshs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Get Quote</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-8">Ready to Protect Your Vehicle?</h2>
            <p className="text-xl mb-8">Experience the ultimate protection with our premium PPF solutions.</p>
            <Button size="lg" variant="secondary" className="transform transition-all hover:scale-105 hover:shadow-lg">
              Schedule Installation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
