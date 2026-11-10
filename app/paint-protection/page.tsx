"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Check, ChevronLeft, ChevronRight, Palette } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { trackButtonClick, submitQuoteRequest } from "@/lib/supabase"

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

// Generate catalog image paths (1-328)
const catalogImages = Array.from({ length: 328 }, (_, i) => ({
  id: i + 1,
  path: `/images/catalog/catalog-${i + 1}.png`,
  name: `FANCHI TPU Color #${i + 1}`,
}))

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

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    ppfType: "",
    vehicleModel: "",
  })

  // Selected PPF Color from catalogue
  const [selectedColor, setSelectedColor] = useState<{ id: number; path: string; name: string } | null>(null)
  const [catalogSearch, setCatalogSearch] = useState("")
  const [catalogPage, setCatalogPage] = useState(1)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsPerPage = 12
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const ppfTypeRefs = useRef<(HTMLDivElement | null)[]>([])
  const quoteSectionRef = useRef<HTMLDivElement | null>(null)

  // Filtered catalogue items
  const filteredCatalog = catalogImages.filter((item) => {
    if (!catalogSearch.trim()) return true
    const q = catalogSearch.toLowerCase()
    return item.name.toLowerCase().includes(q) || item.id.toString().includes(q)
  })

  const totalCatalogPages = Math.ceil(filteredCatalog.length / itemsPerPage)
  const displayedCatalog = filteredCatalog.slice((catalogPage - 1) * itemsPerPage, catalogPage * itemsPerPage)

  const handleSelectColor = (color: { id: number; path: string; name: string }) => {
    setSelectedColor(color)
    setQuoteForm((prev) => ({ ...prev, ppfType: "pp4" }))
    trackButtonClick(`Select Color from Catalogue: ${color.name}`)

    toast({
      title: "Color Selected! 🎨",
      description: `${color.name} selected. Fill your contact details below to get your WhatsApp quote.`,
    })

    if (quoteSectionRef.current) {
      quoteSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleGetQuote = async () => {
    setIsSubmitting(true)

    const ppfTypeLabels: { [key: string]: string } = {
      pp1: "PPF1 (Basic) - 125,000 Kshs",
      pp2: "PPF2 (Standard) - 150,000 Kshs",
      pp3: "PPF3 (Premium) - 175,000 Kshs",
      pp4: selectedColor ? `Colored PPF (${selectedColor.name}) - 215,000 Kshs` : "Colored PPF - 215,000 Kshs",
      colored: selectedColor ? `Colored PPF (${selectedColor.name}) - 215,000 Kshs` : "Colored PPF - 215,000 Kshs",
    }

    const ppfPrices: { [key: string]: number } = {
      pp1: 125000,
      pp2: 150000,
      pp3: 175000,
      pp4: 215000,
      colored: 215000,
    }

    const selectedPPFLabel = quoteForm.ppfType ? ppfTypeLabels[quoteForm.ppfType] : (selectedColor ? `Colored PPF (${selectedColor.name}) - 215,000 Kshs` : "Not selected")
    const totalPrice = quoteForm.ppfType ? (ppfPrices[quoteForm.ppfType] || 215000) : 215000

    // 1. Record the quote in Supabase database
    const quoteData = {
      name: quoteForm.name || "Customer",
      email: quoteForm.email || "",
      phone: quoteForm.phone || "",
      message: quoteForm.vehicleModel 
        ? `Vehicle Model: ${quoteForm.vehicleModel}${selectedColor ? ` | Selected Color: ${selectedColor.name}` : ""}` 
        : (selectedColor ? `Selected Color: ${selectedColor.name}` : ""),
      color_name: selectedColor ? selectedColor.name : selectedPPFLabel,
      car_type: "Paint Protection Film",
      car_model: quoteForm.vehicleModel || "Vehicle",
      total_price: totalPrice,
      created_at: new Date().toISOString(),
    }

    try {
      await trackButtonClick("Get PPF Quote via WhatsApp")
      await submitQuoteRequest(quoteData)

      // Also trigger email notification asynchronously
      fetch("/api/send-quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteForm.name || "Customer",
          email: quoteForm.email || "",
          phone: quoteForm.phone || "",
          message: quoteData.message,
          colorName: selectedColor ? selectedColor.name : selectedPPFLabel,
          carType: quoteForm.vehicleModel || "Vehicle",
          totalPrice: totalPrice,
        }),
      }).catch((e) => console.log("Email error:", e))

      toast({
        title: "Quote Recorded! 🎉",
        description: "Your quote has been saved. Opening WhatsApp...",
      })
    } catch (err) {
      console.error("Error recording quote to Supabase:", err)
    } finally {
      setIsSubmitting(false)
    }

    // 2. Prepare WhatsApp message
    const message = `Hello! I would like to get a quote for PPF installation.

*Name:* ${quoteForm.name || "Not provided"}
*Email:* ${quoteForm.email || "Not provided"}
*Phone:* ${quoteForm.phone || "Not provided"}
*PPF Type:* ${selectedPPFLabel}
${quoteForm.vehicleModel ? `*Vehicle Model:* ${quoteForm.vehicleModel}\n` : ""}
Please provide me with more details. Thank you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = "254795557083"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // 3. Open WhatsApp
    window.open(whatsappUrl, "_blank")
  }

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
    <div className="min-h-screen pb-16 pt-44 md:pt-48">
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
            <Accordion type="single" collapsible className="w-full" defaultValue="pp4">
              <AccordionItem value="pp1">
                <AccordionTrigger>PPF1 (Basic) - 125,000 Kshs</AccordionTrigger>
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
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp2">
                <AccordionTrigger>PPF2 (Standard) - 150,000 Kshs</AccordionTrigger>
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
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp3">
                <AccordionTrigger>PPF3 (Premium) - 175,000 Kshs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Premium maximum protection film with industry-leading durability and performance.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>9.5 mil thickness offers maximum protection against rock chips and impacts</li>
                      <li>Professional-grade self-healing technology with rapid recovery</li>
                      <li>Ultra-clear finish with enhanced depth and gloss</li>
                      <li>Superior UV blocking prevents paint fading and oxidation</li>
                      <li>Advanced polymer construction for extreme durability</li>
                      <li>Hydrophobic surface for easy cleaning and maintenance</li>
                      <li>Temperature resistant from -40°F to 200°F</li>
                      <li><strong>10 years of durability</strong></li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pp4">
                <AccordionTrigger>Colored PPF - 215,000 Kshs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="font-medium">
                      Bold colored paint protection film that combines a head-turning custom finish with full
                      protection.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>9.5 mil thickness with a premium colored topcoat</li>
                      <li>Available in gloss, matte, and satin color finishes</li>
                      <li>Complete rock chip and scratch protection with a custom look</li>
                      <li>Self-healing technology repairs minor scratches and swirl marks</li>
                      <li>UV resistant coating prevents fading and color degradation</li>
                      <li>Hydrophobic surface for easy cleaning and maintenance</li>
                    </ul>

                    {/* FEATURE: CHOOSE COLOR FROM PPF COLOR CATALOGUE */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Palette className="h-5 w-5 text-primary" />
                            <h4 className="text-xl font-bold">Choose a Color from our PPF Catalogue</h4>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Browse over 300+ FANCHI TPU colors. Click any color below to configure your quote.
                          </p>
                        </div>
                        <div className="relative w-full sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Search color # (e.g. 23)..."
                            value={catalogSearch}
                            onChange={(e) => {
                              setCatalogSearch(e.target.value)
                              setCatalogPage(1)
                            }}
                            className="pl-8 text-xs h-9 bg-gray-50 dark:bg-gray-900"
                          />
                        </div>
                      </div>

                      {/* Selected Color Alert Banner */}
                      {selectedColor && (
                        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/20 shrink-0">
                              <Image src={selectedColor.path} alt={selectedColor.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary">Selected Color:</p>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedColor.name}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              if (quoteSectionRef.current) {
                                quoteSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
                              }
                            }}
                            className="text-xs bg-white hover:bg-gray-100 text-black font-extrabold shadow-sm px-4"
                          >
                            Proceed to Get Quote <Check className="ml-1 h-3.5 w-3.5 text-black stroke-[3]" />
                          </Button>
                        </div>
                      )}

                      {/* Color Catalogue Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {displayedCatalog.map((color) => {
                          const isSelected = selectedColor?.id === color.id
                          return (
                            <div
                              key={color.id}
                              className={`group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer border-2 transition-all ${
                                isSelected
                                  ? "border-primary ring-2 ring-primary scale-[1.02]"
                                  : "border-transparent hover:border-primary/50"
                              }`}
                              onClick={() => handleSelectColor(color)}
                            >
                              <Image
                                src={color.path}
                                alt={color.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute top-1.5 right-1.5 flex items-center space-x-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setLightboxImage(color.id)
                                  }}
                                  className="p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                                  title="Enlarge"
                                >
                                  <Eye className="h-3 w-3" />
                                </button>
                                <span className="bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                  #{color.id}
                                </span>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                                <p className="text-[11px] font-bold truncate">{color.name}</p>
                                <button
                                  type="button"
                                  onClick={() => handleSelectColor(color)}
                                  className={`mt-1.5 w-full py-1 text-[10px] font-extrabold rounded transition-colors ${
                                    isSelected
                                      ? "bg-green-600 text-white"
                                      : "bg-white hover:bg-gray-200 text-black shadow-sm"
                                  }`}
                                >
                                  {isSelected ? "Selected ✓" : "Select Color"}
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Pagination Controls */}
                      {totalCatalogPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 pt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={catalogPage === 1}
                            onClick={() => setCatalogPage((p) => Math.max(1, p - 1))}
                            className="text-xs h-8"
                          >
                            <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous
                          </Button>
                          <span className="text-xs font-semibold px-3 text-gray-500">
                            Page {catalogPage} of {totalCatalogPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={catalogPage === totalCatalogPages}
                            onClick={() => setCatalogPage((p) => Math.min(totalCatalogPages, p + 1))}
                            className="text-xs h-8"
                          >
                            Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Quote System */}
      <section ref={quoteSectionRef} id="quote-section" className="py-16 bg-gray-100 dark:bg-gray-900">
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
                  <Input 
                    id="name" 
                    placeholder="Your name"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone number"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="ppf-type">PPF Type</Label>
                  <Select 
                    value={quoteForm.ppfType} 
                    onValueChange={(value) => {
                      setQuoteForm({ ...quoteForm, ppfType: value })
                      if (value !== "pp4") setSelectedColor(null)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select PPF type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pp1">PPF1 (Basic) - 125,000 Kshs</SelectItem>
                      <SelectItem value="pp2">PPF2 (Standard) - 150,000 Kshs</SelectItem>
                      <SelectItem value="pp3">PPF3 (Premium) - 175,000 Kshs</SelectItem>
                      <SelectItem value="pp4">Colored PPF - 215,000 Kshs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* If a color was selected from the catalogue */}
                {selectedColor && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center space-x-3">
                    <div className="relative h-12 w-12 rounded overflow-hidden shrink-0 border border-white/20">
                      <Image src={selectedColor.path} alt={selectedColor.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-primary">Selected Color:</p>
                      <p className="text-sm font-bold truncate">{selectedColor.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedColor(null)}
                      className="text-xs text-gray-400 hover:text-red-500 font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div>
                  <Label htmlFor="vehicle-model">Vehicle Model (Optional)</Label>
                  <Input 
                    id="vehicle-model" 
                    placeholder="e.g. BMW M4, Land Cruiser, Golf, etc."
                    value={quoteForm.vehicleModel}
                    onChange={(e) => setQuoteForm({ ...quoteForm, vehicleModel: e.target.value })}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGetQuote}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Recording Quote..." : "Get Quote"}
                </Button>
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
            <Button
              size="lg"
              variant="secondary"
              className="transform transition-all hover:scale-105 hover:shadow-lg"
              onClick={() => {
                const eventTitle = encodeURIComponent("Paint Protection Film Installation - Millan Auto Customs")
                const eventDetails = encodeURIComponent("Paint Protection Film (PPF) installation appointment at Millan Auto Customs.\n\nLocation: Mokoyeti Road West, Karen, Nairobi\nPhone: 0795557083\nEmail: millanautocustoms@icloud.com\n\nPlease arrive 10 minutes early. Our expert technicians will provide professional PPF installation with premium materials.")
                const location = encodeURIComponent("Mokoyeti Road West, Karen, Nairobi, Kenya")
                const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&location=${location}&add=millanautocustoms@icloud.com`
                window.open(calendarUrl, "_blank")
              }}
            >
              Schedule Installation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal for Color Enlargement */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 text-white">
              <h4 className="text-lg font-bold">FANCHI TPU PPF Color #{lightboxImage}</h4>
              <button
                onClick={() => setLightboxImage(null)}
                className="text-gray-400 hover:text-white text-2xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="relative h-[65vh] w-full rounded-xl overflow-hidden bg-black">
              <Image
                src={`/images/catalog/catalog-${lightboxImage}.png`}
                alt={`PPF Color #${lightboxImage}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">Colored TPU PPF - KSh 215,000</span>
              <Button
                onClick={() => {
                  const id = lightboxImage
                  setLightboxImage(null)
                  handleSelectColor({
                    id,
                    path: `/images/catalog/catalog-${id}.png`,
                    name: `FANCHI TPU Color #${id}`,
                  })
                }}
                className="bg-white hover:bg-gray-100 text-black font-extrabold shadow-md px-5"
              >
                Choose This Color & Get Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
