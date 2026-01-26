"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Check, Sparkles, Car } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { trackButtonClick, submitQuoteRequest } from "@/lib/supabase"

// Define car wrap colors with their details
const wrapColors = [
  {
    id: "tiffany",
    name: "Tiffany",
    description: "A vibrant turquoise finish that captures attention with its distinctive hue.",
    image: "/images/wraps/tiffany.jpg",
    popular: true,
  },
  {
    id: "ultra-gloss-combat-green",
    name: "Ultra Gloss Combat Green",
    description: "A military-inspired olive green with a high-gloss finish.",
    image: "/images/wraps/ultra-gloss-combat-green.jpg",
    popular: true,
  },
  {
    id: "ultra-gloss-light-blue",
    name: "Ultra Gloss Light Blue",
    description: "A refreshing light blue with a high-gloss finish.",
    image: "/images/wraps/ultra-gloss-light-blue.jpg",
    popular: true,
  },
  {
    id: "super-chrome-red",
    name: "Super Chrome Red",
    description: "A striking red chrome finish that creates a bold, futuristic look.",
    image: "/images/wraps/super-chrome-red.jpg",
    popular: true,
  },
  {
    id: "supreme-red",
    name: "Supreme Red",
    description: "A deep, rich red that exudes luxury and sophistication.",
    image: "/images/wraps/supreme-red.jpg",
    popular: false,
  },
  {
    id: "yacht-blue",
    name: "Yacht Blue",
    description: "A serene sky blue reminiscent of clear waters.",
    image: "/images/wraps/yacht-blue.jpg",
    popular: false,
  },
  {
    id: "violet-purple",
    name: "Violet Purple",
    description: "A vibrant purple that makes a bold statement.",
    image: "/images/wraps/violet-purple.jpg",
    popular: true,
  },
  {
    id: "vibrant-blue",
    name: "Vibrant Blue",
    description: "An energetic blue that combines depth and brilliance.",
    image: "/images/wraps/vibrant-blue.jpg",
    popular: true,
  },
  {
    id: "gloss-black",
    name: "Gloss Black",
    description: "A sleek gloss black finish, perfect for a sporty look.",
    image: "/images/wraps/gloss-black.jpg",
    popular: true,
  },
  {
    id: "custom-white-black",
    name: "Custom White & Black",
    description: "A sophisticated two-tone design with white and black sections.",
    image: "/images/wraps/custom-white-black.jpg",
    popular: false,
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    description: "A vibrant emerald green finish that turns heads.",
    image: "/images/wraps/emerald-green.jpg",
    popular: true,
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    description: "A rich, deep blue finish that exudes power and elegance.",
    image: "/images/wraps/deep-blue.jpg",
    popular: true,
  },
  {
    id: "gloss-green-black",
    name: "Gloss Green Black",
    description: "A dark forest green with a high-gloss finish.",
    image: "/images/wraps/gloss-green-black.jpg",
    popular: false,
  },
  {
    id: "ivory-cream-black-top",
    name: "Ivory Cream with Black Top",
    description: "An elegant two-tone design featuring a cream body with black roof.",
    image: "/images/wraps/ivory-cream-black-top.jpg",
    popular: true,
  },
  {
    id: "golden-yellow",
    name: "Golden Yellow",
    description: "A striking golden yellow finish that catches the light beautifully.",
    image: "/images/wraps/golden-yellow.jpg",
    popular: false,
  },
  {
    id: "hunter-green",
    name: "Hunter Green",
    description: "A deep, rich green with subtle metallic undertones.",
    image: "/images/wraps/hunter-green.jpg",
    popular: false,
  },
  {
    id: "gunsmoke-grey",
    name: "Gunsmoke Grey",
    description: "A premium metallic grey with a smoky finish.",
    image: "/images/wraps/gunsmoke-grey.jpg",
    popular: true,
  },
  {
    id: "kelly-green",
    name: "Kelly Green",
    description: "A vibrant, eye-catching lime green that demands attention.",
    image: "/images/wraps/kelly-green.jpg",
    popular: true,
  },
  {
    id: "black-silver",
    name: "Matte Silver",
    description: "A sophisticated matte silver finish with subtle gray undertones.",
    image: "/images/wraps/black-silver.jpg",
    popular: true,
  },
  {
    id: "baby-blue",
    name: "Baby Blue",
    description: "A vibrant light blue that stands out in any environment.",
    image: "/images/wraps/baby-blue.jpg",
    popular: false,
  },
  {
    id: "black-yellow-custom",
    name: "Black & Yellow Split",
    description: "A bold dual-tone design with striking contrast.",
    image: "/images/wraps/black-yellow-custom.jpg",
    popular: true,
  },
  {
    id: "amazon-grey",
    name: "Amazon Grey",
    description: "A sleek grey finish with subtle green accents.",
    image: "/images/wraps/amazon-grey.jpg",
    popular: false,
  },
  {
    id: "black-white-custom",
    name: "Black & White Split",
    description: "A classic dual-tone design with a clean split between black and white.",
    image: "/images/wraps/black-white-custom.jpg",
    popular: true,
  },
  {
    id: "chameleon-white",
    name: "Chameleon Laser Metallic",
    description: "A premium holographic wrap that shifts colors.",
    image: "/images/wraps/chameleon-white.jpg",
    popular: true,
  },
  {
    id: "black-to-yellow",
    name: "Black to Yellow Gradient",
    description: "A stunning gradient effect from deep black to vibrant yellow.",
    image: "/images/wraps/black-to-yellow.jpg",
    popular: false,
  },
  {
    id: "black-to-green",
    name: "Black to Green Split",
    description: "A dramatic two-tone design featuring deep black and vibrant green.",
    image: "/images/wraps/black-to-green.jpg",
    popular: false,
  },
]

// Define car types with their prices and images
const carTypes = [
  {
    id: "sedan",
    name: "Sedan",
    price: 80000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80",
    description: "Perfect for everyday luxury and comfort",
  },
  {
    id: "convertible",
    name: "Convertible",
    price: 85000,
    image: "/images/services/Convertible.jpeg",
    description: "Open-top driving experience",
  },
  {
    id: "hatchback",
    name: "Hatchback",
    price: 85000,
    image: "/images/services/Hatchback.jpeg",
    description: "Compact and versatile styling",
  },
  {
    id: "coupe",
    name: "Coupe",
    price: 90000,
    image: "/images/services/Coupe.jpeg",
    description: "Sporty two-door elegance",
  },
  {
    id: "crossover",
    name: "Crossover",
    price: 90000,
    image: "/images/services/Crossover.jpeg",
    description: "Adventure-ready styling",
  },
  {
    id: "electric",
    name: "Electric",
    price: 90000,
    image: "/images/services/Electric.jpeg",
    description: "Sustainable future vehicles",
  },
  {
    id: "suv",
    name: "SUV",
    price: 105000,
    image: "/images/services/SUV.jpeg",
    description: "Bold and commanding presence",
  },
]

export default function CarWraps() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedCarType, setSelectedCarType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const selectedColorDetails = wrapColors.find((color) => color.id === selectedColor)
  const selectedCarTypeDetails = carTypes.find((type) => type.id === selectedCarType)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await trackButtonClick("Submit Quote Request")

      const quoteData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        color_name: selectedColorDetails?.name || "",
        car_type: selectedCarType || "",
        car_model: selectedCarTypeDetails?.name || "",
        total_price: selectedCarTypeDetails?.price || 0,
        created_at: new Date().toISOString(),
      }

      await submitQuoteRequest(quoteData)
      setQuoteSubmitted(true)

      toast({
        title: "Quote Submitted Successfully! 🎉",
        description: "We'll get back to you within 24 hours.",
      })
    } catch (error) {
      setQuoteSubmitted(true)
      toast({
        title: "Quote Saved",
        description: "We've saved your quote request and will process it shortly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleColorSelect = (colorId: string) => {
    trackButtonClick(`Select Color: ${wrapColors.find((c) => c.id === colorId)?.name}`)
    setSelectedColor(colorId)
    setTimeout(() => {
      setCurrentStep(2)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }

  const handleCarTypeSelect = (typeId: string) => {
    trackButtonClick(`Select Car Type: ${carTypes.find((t) => t.id === typeId)?.name}`)
    setSelectedCarType(typeId)
    setTimeout(() => {
      setCurrentStep(3)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }

  const resetQuote = () => {
    setCurrentStep(1)
    setSelectedColor(null)
    setSelectedCarType(null)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setQuoteSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen py-24 pt-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 px-6 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Premium Car Wrap Customization</span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transform Your Vehicle
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose your perfect color, select your vehicle type, and get an instant quote in 3 simple steps
          </motion.p>
        </div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-purple-600"
                initial={{ width: "0%" }}
                animate={{
                  width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {[
              { num: 1, label: "Choose Color", icon: "🎨" },
              { num: 2, label: "Select Model", icon: "🚗" },
              { num: 3, label: "Get Quote", icon: "💰" },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                    currentStep >= step.num
                      ? "bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg scale-110"
                      : "bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {currentStep > step.num ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-xl">{step.icon}</span>
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= step.num ? "text-gray-900 dark:text-white" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Color */}
          {currentStep === 1 && isClient && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Choose Your Perfect Color
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Select from our premium collection of wrap colors</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {wrapColors.map((color, index) => (
                  <motion.div
                    key={color.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="cursor-pointer group"
                    onClick={() => handleColorSelect(color.id)}
                  >
                    <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-2xl">
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={color.image || "/placeholder.svg"}
                          alt={color.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-sm">{color.description}</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-center group-hover:text-primary transition-colors">
                          {color.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Model */}
          {currentStep === 2 && isClient && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              {/* Large Color Display */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Your Selected Color
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Now choose your vehicle type for this beautiful wrap
                  </p>
                </div>

                <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <div className="relative h-[400px] md:h-[500px] w-full">
                    <Image
                      src={selectedColorDetails?.image || ""}
                      alt={selectedColorDetails?.name || ""}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-4xl md:text-5xl font-bold mb-3">{selectedColorDetails?.name}</h3>
                      <p className="text-lg md:text-xl text-gray-200 mb-4">{selectedColorDetails?.description}</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setCurrentStep(1)
                          setSelectedColor(null)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className="bg-white/90 hover:bg-white text-gray-900"
                      >
                        Change Color
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Vehicle Type Selection */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Select Your Vehicle Type</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose which type of vehicle you want to wrap with {selectedColorDetails?.name}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {carTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="cursor-pointer"
                    onClick={() => handleCarTypeSelect(type.id)}
                  >
                    <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 h-full">
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={type.image}
                          alt={type.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-5 text-center flex flex-col gap-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{type.description}</p>
                        </div>
                        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-3 rounded-xl">
                          <span className="font-bold text-lg text-primary">KSh {type.price.toLocaleString()}</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                          Select {type.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ← Back to Colors
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Get Quote */}
          {currentStep === 3 && isClient && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {!quoteSubmitted ? (
                <>
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Complete Your Quote
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Review your selection and provide your details
                    </p>
                  </div>

                  {/* Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-3xl p-8 mb-8 border-2 border-primary/20"
                  >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Car className="h-6 w-6 text-primary" />
                      Your Customization Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                          <Image
                            src={selectedColorDetails?.image || ""}
                            alt={selectedColorDetails?.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wrap Color</p>
                          <p className="font-bold text-xl">{selectedColorDetails?.name}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Vehicle Type</p>
                          <p className="font-bold text-xl">{selectedCarTypeDetails?.name}</p>
                        </div>
                        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl p-6 text-white">
                          <p className="text-sm opacity-90 mb-1">Total Price</p>
                          <p className="font-bold text-3xl">KSh {selectedCarTypeDetails?.price.toLocaleString()}</p>
                          <p className="text-xs opacity-75 mt-2">
                            *Final price may vary based on vehicle condition
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quote Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-2">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-6">Your Contact Information</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="name" className="text-base font-medium">
                                Full Name *
                              </Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="mt-2 h-12"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone" className="text-base font-medium">
                                Phone Number *
                              </Label>
                              <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="mt-2 h-12"
                                placeholder="+254 700 000 000"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-base font-medium">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="mt-2 h-12"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="message" className="text-base font-medium">
                              Additional Notes (Optional)
                            </Label>
                            <textarea
                              id="message"
                              className="w-full min-h-[120px] p-4 border rounded-lg bg-background mt-2 resize-none"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Any special requirements or questions?"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setCurrentStep(2)
                                window.scrollTo({ top: 0, behavior: "smooth" })
                              }}
                              className="flex-1"
                            >
                              ← Back
                            </Button>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 h-12 text-lg"
                            >
                              {isSubmitting ? "Submitting..." : "Submit Quote Request 🚀"}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <Card className="max-w-2xl mx-auto border-2 border-primary/20">
                    <CardContent className="p-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white mb-6"
                      >
                        <Check className="h-12 w-12" />
                      </motion.div>
                      <h2 className="text-4xl font-bold mb-4">Quote Submitted Successfully! 🎉</h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Thank you for choosing us! Our team will review your customization and get back to you within
                        24 hours with a detailed quote.
                      </p>
                      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 mb-8">
                        <h3 className="font-bold mb-4">What's Next?</h3>
                        <ul className="text-left space-y-3 max-w-md mx-auto">
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>You'll receive a confirmation email shortly</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>Our team will prepare a detailed quote for your customization</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>We'll contact you to schedule an installation date</span>
                          </li>
                        </ul>
                      </div>
                      <Button
                        size="lg"
                        onClick={resetQuote}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        Create Another Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
