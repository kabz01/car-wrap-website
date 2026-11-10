"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Shield, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react"

const services = [
  {
    title: "Paint Protection Film (PPF)",
    badge: "Most Popular",
    icon: Shield,
    description:
      "Protect your car's paint from rock chips, road debris, scratches, and harsh weather with state-of-the-art self-healing TPU technology.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ppf.jpg-VL7GR7ndXyXB0QamHMH79DIT2G42zo.jpeg",
    link: "/paint-protection",
    buttonText: "Configure PPF & Get Quote",
    features: [
      "High-clarity optical finish (Clear Gloss & Stealth Matte)",
      "Instant self-healing against light scratches & swirls",
      "Over 300+ FANCHI TPU color finishes available",
      "Superior UV blocking to stop fading & oxidation",
      "Up to 10 years guaranteed durability",
    ],
  },
  {
    title: "Ceramic Coating",
    badge: "Hydrophobic Shield",
    icon: Sparkles,
    description:
      "Enhance your vehicle's gloss with a durable nanoceramic protective layer that repels water, mud, dirt, and environmental contaminants.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ceramic-83F9IM1DmDWKE5Z5BmeYNfPPFDipbe.webp",
    link: "/ceramic-coating",
    buttonText: "Explore Ceramic Packages",
    features: [
      "Extreme mirror-like gloss and paint depth",
      "Hydrophobic self-cleaning water beading effect",
      "Chemical, acid rain, and bird dropping resistance",
      "Prevents paint oxidation and minor UV staining",
      "Multi-year warranty packages available",
    ],
  },
]

export default function Services() {
  return (
    <div className="container mx-auto px-6 pb-16 pt-44 md:pt-48">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm font-semibold tracking-wider uppercase text-primary mb-2 block">
          Precision Protection
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
          Our Protection Services
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Specialized in advanced Paint Protection Film (PPF) and professional nanoceramic coatings engineered to keep your vehicle in showroom condition.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2.5">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start space-x-2.5 text-sm text-gray-700 dark:text-gray-200">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-md hover:shadow-xl transition-all"
                  >
                    <Link href={service.link} className="flex items-center justify-center">
                      {service.buttonText} <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
