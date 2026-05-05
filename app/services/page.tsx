"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"

const services = [
  {
    title: "Car Wrapping",
    description:
      "Transform your vehicle with our premium vinyl wraps. Choose from a wide range of colors and finishes.",
  },
  {
    title: "Paint Protection Film",
    description: "Protect your car's paint from chips, scratches, and environmental damage with our high-quality PPF.",
  },
  {
    title: "Ceramic Coating",
    description:
      "Enhance your car's shine and protect it from the elements with our professional ceramic coating service.",
  },
]

// Generate catalog image paths (1-328)
const catalogImages = Array.from({ length: 328 }, (_, i) => ({
  id: i + 1,
  path: `/images/catalog/catalog-${i + 1}.png`,
  alt: `PPF Color ${i + 1}`,
}))

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('ppf-catalog')
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        Our Services
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className={`bg-gray-800 border-gray-700 h-full ${index === 1 ? 'cursor-pointer hover:border-blue-500 transition-colors' : ''}`}
              onClick={index === 1 ? scrollToCatalog : undefined}
            >
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">{service.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* PPF Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">Paint Protection Film (PPF)</CardTitle>
                <CardDescription className="text-gray-400">Premium protection for your vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">Basic</h3>
                    <p className="text-sm text-gray-400">Essential protection</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 125,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">Standard</h3>
                    <p className="text-sm text-gray-400">Enhanced coverage</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 150,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg border-2 border-blue-500">
                  <div>
                    <h3 className="font-semibold text-lg">Premium</h3>
                    <p className="text-sm text-gray-400">Complete protection</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 175,000</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ceramic Coating Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">Ceramic Coating</CardTitle>
                <CardDescription className="text-gray-400">Long-lasting shine and protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">10H Basic Coating</h3>
                    <p className="text-sm text-gray-400">Entry-level protection</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 30,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">12H Standard Coating</h3>
                    <p className="text-sm text-gray-400">Advanced durability</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 42,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg border-2 border-blue-500">
                  <div>
                    <h3 className="font-semibold text-lg">20H Premium Coating</h3>
                    <p className="text-sm text-gray-400">Maximum hardness</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 56,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">Crystal Interior Coating</h3>
                    <p className="text-sm text-gray-400">Interior protection</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">KSh 20,000</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Catalog Gallery Section */}
      <motion.div
        id="ppf-catalog"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-center mb-4">PPF Colors</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Explore our premium FANCHI TPU PPF collection featuring stunning colors and finishes on real vehicles.
          From glossy to matte, metallic to color-shift - find the perfect look for your ride.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {catalogImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.path}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.6vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="text-xs font-semibold">Color #{image.id}</p>
                  <p className="text-[10px] opacity-80">Click to enlarge</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                #{image.id}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={`/images/catalog/catalog-${selectedImage}.png`}
                alt={`PPF Color ${selectedImage}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev && prev > 1 ? prev - 1 : 328))
                }}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-white self-center">Color {selectedImage} of 328</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage((prev) => (prev && prev < 328 ? prev + 1 : 1))
                }}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
