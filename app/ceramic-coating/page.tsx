"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CeramicCoating() {
  const [activeTab, setActiveTab] = useState("before")
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 5)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 5) % 5)
  }

  const features = [
    {
      title: "UV Protection",
      description: "Shield your car wrap from harmful UV rays that cause fading and discoloration.",
      icon: "☀️",
    },
    {
      title: "Water Repellency",
      description:
        "Enjoy a hydrophobic effect that repels water, dirt, and grime, keeping your vehicle cleaner for longer.",
      icon: "💧",
    },
    {
      title: "Scratch Resistance",
      description: "Minimize swirl marks and minor scratches with a durable, protective layer.",
      icon: "🛡️",
    },
    {
      title: "Easy Maintenance",
      description: "Simplify cleaning with a surface that resists stains and requires less effort to maintain.",
      icon: "🧽",
    },
    {
      title: "Enhanced Gloss",
      description: "Achieve a mirror-like finish that boosts the visual appeal of your car wrap.",
      icon: "✨",
    },
  ]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ceramic Coating Excellence</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Elevate your vehicle's protection and appearance with our advanced ceramic coating services. Experience
            unparalleled durability and a showroom-worthy shine that lasts for years.
          </p>
          <p className="text-2xl font-semibold text-primary mb-8">Protect Today, Shine Forever</p>
          <Button size="lg" className="text-lg">
            Schedule Your Coating
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features of Our Ceramic Coating</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-3xl mr-2">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ceramic Coating + Car Wrap Benefits */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-4">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-primary text-2xl mr-2">✓</span>
                  <span>Extended paint life: Protect your investment for years to come</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-primary text-2xl mr-2">✓</span>
                  <span>Improved aesthetics: Enhance the depth and clarity of your paint color</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-primary text-2xl mr-2">✓</span>
                  <span>Added value: Increase your vehicle's resale value with superior protection</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start"
                >
                  <span className="text-primary text-2xl mr-2">✓</span>
                  <span>Easier maintenance: Keep your wrapped vehicle looking pristine with minimal effort</span>
                </motion.li>
              </ul>
            </div>
            <div className="relative h-[600px] md:h-[700px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ceramic%202.jpg-BlASlp8R8LJUK60FVe8wT348bqBazF.jpeg"
                alt="Professional ceramic coating application"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visuals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See the Difference</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[
                    {
                      before:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%201.jpg-Qfj7IsrgxiezHw860G9ZBwvvtArG85.jpeg",
                      title: "Enhanced Clarity & Reflection",
                    },
                    {
                      before:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%202.jpg-ZKFpZpvhZElCotwH7842JiTdamtoTo.jpeg",
                      title: "Dust Resistance Protection",
                    },
                    {
                      before:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%203.jpg-ayQztLXOxjQXoOlGA2ZnTGo81YgG6Z.jpeg",
                      title: "Hydrophobic Effect",
                    },
                    {
                      before:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%205.jpg-PFz5VzZlZDGCLTb6x6uyMUMFVIeFPC.jpeg",
                      title: "Interior Protection",
                    },
                    {
                      before:
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/co%206.jpg-p45doaARMlOFoXvwnT78Uey2U8fPgT.jpeg",
                      title: "Scratch Resistance",
                    },
                  ].map((image, index) => (
                    <motion.div
                      key={index}
                      className="flex-shrink-0 w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-[600px] md:h-[700px]">
                        <Image
                          src={image.before || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center mt-4">{image.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 text-white"
                onClick={handlePrevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 text-white"
                onClick={handleNextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`w-3 h-3 rounded-full p-0 ${currentSlide === index ? "bg-gray-800" : "bg-gray-300"}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crystal Interior Coating Results */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Crystal Interior Coating Results</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h3 className="text-2xl font-semibold text-center mb-8">Remarkable Effect on Interior Surfaces</h3>
              <div className="relative aspect-[16/9] w-full mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/be1.jpg-dKyjaxGvVEGcDM7c0YmrlXz6CUxbvk.jpeg"
                  alt="Dashboard before and after crystal coating"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <p className="text-lg text-center text-gray-600 dark:text-gray-300">
                Experience the dramatic transformation of your vehicle's dashboard. Our Crystal Interior Coating
                restores the deep, rich appearance of interior surfaces while providing lasting protection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-center mb-8">Surface Coating & Gloss Renewal</h3>
              <div className="relative aspect-[16/9] w-full mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/be2.jpg-JsxECovgwIuTJzdbpJNa55KQ8u2m5A.jpeg"
                  alt="Leather surface before and after crystal coating"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <p className="text-lg text-center text-gray-600 dark:text-gray-300">
                Our Crystal Interior Coating doesn't just protect - it revitalizes. See the difference in leather and
                vinyl surfaces, with enhanced gloss and a protective layer that maintains that fresh look.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h4 className="text-xl font-semibold mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Restores original shine and color depth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Protects against UV damage and fading</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Repels dust and reduces cleaning frequency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Long-lasting protection for up to 12 months</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h4 className="text-xl font-semibold mb-4">Suitable Surfaces</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Dashboard and console surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Leather and vinyl upholstery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Door panels and trim pieces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Plastic and rubber components</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and Quote Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing & Quotes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="9h">
                  <AccordionTrigger>9H Ceramic Coating - 35,000 Kshs</AccordionTrigger>
                  <AccordionContent>
                    <p>Entry-level ceramic coating perfect for those new to paint protection.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="10h">
                  <AccordionTrigger>10H Glass Coating - 40,000 Kshs</AccordionTrigger>
                  <AccordionContent>
                    <p>Specialized coating for maximum glass protection and clarity.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="12h">
                  <AccordionTrigger>12H Graphene Coating - 50,000 Kshs</AccordionTrigger>
                  <AccordionContent>
                    <p>Advanced protection with graphene technology for superior durability.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="20h">
                  <AccordionTrigger>20H Premium Coating - 70,000 Kshs</AccordionTrigger>
                  <AccordionContent>
                    <p>Our flagship coating offering the ultimate in protection and durability.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="crystal">
                  <AccordionTrigger>Crystal Interior Coating - 20,000 Kshs</AccordionTrigger>
                  <AccordionContent>
                    <p>Specialized coating for interior surfaces and plastic components.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Get a Quote</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Label htmlFor="coating-type">Coating Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coating type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9h">9H Ceramic Coating - 35,000 Kshs</SelectItem>
                        <SelectItem value="10h">10H Glass Coating - 40,000 Kshs</SelectItem>
                        <SelectItem value="12h">12H Graphene Coating - 50,000 Kshs</SelectItem>
                        <SelectItem value="20h">20H Premium Coating - 70,000 Kshs</SelectItem>
                        <SelectItem value="crystal">Crystal Interior Coating - 20,000 Kshs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Get Quote</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-8">Ready to Elevate Your Vehicle's Protection?</h2>
            <p className="text-xl mb-8">Experience the ultimate in paint protection and visual enhancement.</p>
            <Button size="lg" variant="secondary" className="text-lg">
              Schedule Your Ceramic Coating
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
