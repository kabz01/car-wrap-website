"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

interface CarModel {
  id: string
  name: string
  image: string
  price: number
}

interface WrapColor {
  id: string
  name: string
  color: string
  hex: string
  cars: CarModel[]
}

const wrapColors: WrapColor[] = [
  {
    id: "metallic-shadow-blue",
    name: "Metallic Shadow Blue",
    color: "bg-[#4682B4]",
    hex: "#4682B4",
    cars: [
      {
        id: "rolls-royce-ghost",
        name: "Rolls-Royce Ghost",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Metallic_shadow_blue_Rolls-Royce_Ghost-removebg-preview-kEQwjJDsSQ1w3C3j1fdyFWY8SgtS8w.png",
        price: 150000,
      },
    ],
  },
  {
    id: "ultra-gloss-black",
    name: "Ultra Gloss Black",
    color: "bg-[#000000]",
    hex: "#000000",
    cars: [
      {
        id: "mercedes-s-class",
        name: "Mercedes-Benz S-Class",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ultra_gloss_black-Mercedes_benz_s-class-removebg-preview-jMMOxabiXnsSJ6l6xpSd6YsPsztK1x.png",
        price: 120000,
      },
      {
        id: "volkswagen-golf",
        name: "Volkswagen Golf",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ultra_gloss_black_volkswagen-removebg-preview-PHpZPGlj1NOznYm4TxKoXpKinqW1vu.png",
        price: 75000,
      },
    ],
  },
  {
    id: "satin-military-green",
    name: "Satin Military Green",
    color: "bg-[#4B5320]",
    hex: "#4B5320",
    cars: [
      {
        id: "volvo-ec40",
        name: "Volvo EC40",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/satin_military_green_Volvo_EC40-removebg-preview-5HIOdOUsQgZit1aM7mLxgX6xNNHIsB.png",
        price: 82000,
      },
    ],
  },
  {
    id: "mirror-chrome-blue",
    name: "Mirror Chrome Blue",
    color: "bg-[#4169E1]",
    hex: "#4169E1",
    cars: [
      {
        id: "porsche-911",
        name: "Porsche 911",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mirror_chrome_blue_Porsche_911-removebg-preview-LfpEvYy8WE0A3PWf2olboEPZ8uUsuX.png",
        price: 130000,
      },
    ],
  },
  {
    id: "rainbow-chrome-green",
    name: "Rainbow Chrome Green",
    color: "bg-[#50C878]",
    hex: "#50C878",
    cars: [
      {
        id: "bmw-m3",
        name: "BMW M3",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rainbow_chrome_green_BMW_M3-removebg-preview-e7TEnGtjEFuCIviR3oxEqr4ZmRAb6Z.png",
        price: 95000,
      },
    ],
  },
  {
    id: "shadow-blue",
    name: "Shadow Blue",
    color: "bg-[#4B0082]",
    hex: "#4B0082",
    cars: [
      {
        id: "jeep-wrangler",
        name: "Jeep Wrangler",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shadow_blue_Jeep_Wrangler-removebg-preview-piPG7JCkTO4QjHNDCERd839S0fuZSj.png",
        price: 85000,
      },
    ],
  },
  {
    id: "satin-blue",
    name: "Satin Blue",
    color: "bg-[#4169E1]",
    hex: "#4169E1",
    cars: [
      {
        id: "mazda-cx60",
        name: "Mazda CX-60",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Satin_blue_Mazda_CX-60-removebg-preview-h4zGGdz24BTaPem00w6SceMc676nTR.png",
        price: 82000,
      },
    ],
  },
  {
    id: "satin-red",
    name: "Satin Red",
    color: "bg-[#B22222]",
    hex: "#B22222",
    cars: [
      {
        id: "mercedes-benz-coupe",
        name: "Mercedes-Benz Coupe",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/satin_red-mercedes_benz-removebg-preview-TmefZF8FbNb7YHZ0qv1eLtqlMpg5jl.png",
        price: 95000,
      },
    ],
  },
  {
    id: "ultra-gloss-cream-white",
    name: "Ultra Gloss Cream White",
    color: "bg-[#FFFFF0]",
    hex: "#FFFFF0",
    cars: [
      {
        id: "mercedes-c200",
        name: "Mercedes-Benz C200",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ultra_gloss_cream_white_Mercedes-Benz_C200-removebg-preview-twLsRqR9GMCxy1CnpFQ5KjHcf7zi46.png",
        price: 85000,
      },
    ],
  },
  {
    id: "gloss-metallic-graphite-grey",
    name: "Gloss Metallic Graphite Grey",
    color: "bg-[#414A4C]",
    hex: "#414A4C",
    cars: [],
  },
  {
    id: "gloss-midnight-gold",
    name: "Gloss Midnight Gold",
    color: "bg-[#DAA520]",
    hex: "#DAA520",
    cars: [],
  },
  {
    id: "white-iridescent-gold",
    name: "White Iridescent Gold",
    color: "bg-[#F0E68C]",
    hex: "#F0E68C",
    cars: [],
  },
  {
    id: "gloss-combat-green",
    name: "Gloss Combat Green",
    color: "bg-[#4B5320]",
    hex: "#4B5320",
    cars: [],
  },
  {
    id: "rainbow-chrome-green",
    name: "Rainbow Chrome Green",
    color: "bg-[#50C878]",
    hex: "#50C878",
    cars: [],
  },
  {
    id: "yellow-green",
    name: "Yellow Green",
    color: "bg-[#9ACD32]",
    hex: "#9ACD32",
    cars: [],
  },
  {
    id: "satin-military-green",
    name: "Satin Military Green",
    color: "bg-[#4B5320]",
    hex: "#4B5320",
    cars: [],
  },
  {
    id: "gloss-metallic-black-rose",
    name: "Gloss Metallic Black Rose",
    color: "bg-[#1A1A1A]",
    hex: "#1A1A1A",
    cars: [],
  },
  {
    id: "gloss-metallic-bright-orange",
    name: "Gloss Metallic Bright Orange",
    color: "bg-[#FF4500]",
    hex: "#FF4500",
    cars: [],
  },
  {
    id: "gloss-metallic-champagne-gold",
    name: "Gloss Metallic Champagne Gold",
    color: "bg-[#BDB76B]",
    hex: "#BDB76B",
    cars: [],
  },
  {
    id: "gloss-metallic-gunmetal",
    name: "Gloss Metallic Gunmetal Grey",
    color: "bg-[#2C3539]",
    hex: "#2C3539",
    cars: [],
  },
  {
    id: "satin-red",
    name: "Satin Red",
    color: "bg-[#B22222]",
    hex: "#B22222",
    cars: [],
  },
  {
    id: "mirror-chrome-blue",
    name: "Mirror Chrome Blue",
    color: "bg-[#4169E1]",
    hex: "#4169E1",
    cars: [],
  },
  {
    id: "chameleon-purple-blue",
    name: "Chameleon Purple Blue",
    color: "bg-[#800080]",
    hex: "#800080",
    cars: [],
  },
  {
    id: "satin-blue",
    name: "Satin Blue",
    color: "bg-[#4169E1]",
    hex: "#4169E1",
    cars: [],
  },
  {
    id: "cobalt-blue",
    name: "Cobalt Blue",
    color: "bg-[#0047AB]",
    hex: "#0047AB",
    cars: [],
  },
  {
    id: "gloss-ice-blue",
    name: "Gloss Ice Blue",
    color: "bg-[#A5D6E7]",
    hex: "#A5D6E7",
    cars: [],
  },
  {
    id: "shadow-blue",
    name: "Shadow Blue",
    color: "bg-[#4B0082]",
    hex: "#4B0082",
    cars: [],
  },
  {
    id: "gloss-metallic-midnight-purple",
    name: "Gloss Metallic Midnight Purple",
    color: "bg-[#2E1A47]",
    hex: "#2E1A47",
    cars: [
      {
        id: "bmw-x6",
        name: "BMW X6",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_metallic_midnight_purple_bmx_x6-removebg-preview-WINURNZ1XZxxwwMvQBwbZSlM2UGoFJ.png",
        price: 90000,
      },
      {
        id: "bmw-m5",
        name: "BMW M5",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_metallic_midnight_purple_BMW_M5-removebg-preview-zWWBbVPMXPPwDt956yj7ArY1YDjpJE.png",
        price: 95000,
      },
    ],
  },
  {
    id: "matte-metallic-brown",
    name: "Matte Metallic Brown",
    color: "bg-[#4A3C30]",
    hex: "#4A3C30",
    cars: [
      {
        id: "mercedes-gle-350",
        name: "Mercedes-Benz GLE 350",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Matte_metallic_brown-Gle_350-removebg-preview-I1V20idr6OmgkUwS2qxsSlC2bohAxq.png",
        price: 88000,
      },
    ],
  },
  {
    id: "gloss-soul-red",
    name: "Gloss Soul Red",
    color: "bg-[#B22222]",
    hex: "#B22222",
    cars: [
      {
        id: "subaru-legacy",
        name: "Subaru Legacy",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_soul_red_subaru_legacy-removebg-preview-EqLCzfDddeWZmPgbdXgS5x6QZOpZEq.png",
        price: 75000,
      },
      {
        id: "mercedes-amg",
        name: "Mercedes-AMG",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_soul_red-mercedes_benz-removebg-preview-vRMWPxKe0pTTTvpPzuAQ4UZl9u13ly.png",
        price: 95000,
      },
    ],
  },
  {
    id: "gloss-nardo-grey",
    name: "Gloss Nardo Grey",
    color: "bg-[#7A7A7A]",
    hex: "#7A7A7A",
    cars: [
      {
        id: "range-rover-sport",
        name: "Range Rover Sport",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_nardo_grey_range-removebg-preview-tRYYtWxKkZk4KZc1lhQdKwB9eGvGJ3.png",
        price: 98000,
      },
    ],
  },
  {
    id: "gloss-pearl-white",
    name: "Gloss Pearl White",
    color: "bg-[#F8F8FF]",
    hex: "#F8F8FF",
    cars: [
      {
        id: "mercedes-gle",
        name: "Mercedes-Benz GLE",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_pearl_white_gle-removebg-preview-SVUhzANzt0uyl2ASarTxM1QKHCKZcu.png",
        price: 88000,
      },
      {
        id: "toyota-v8",
        name: "Toyota Land Cruiser V8",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_pearl_white_v8-removebg-preview-SZgn6kSnk7JullcMCziK90ZfcxcMrA.png",
        price: 100000,
      },
    ],
  },
  {
    id: "metal-vampire-red",
    name: "Metal Vampire Red",
    color: "bg-[#8B0000]",
    hex: "#8B0000",
    cars: [
      {
        id: "toyota-aygo",
        name: "Toyota Aygo X",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/metal_vampire_red_Toyota_Aygo_X-removebg-preview-ez8nYdN7RjsttaByPNQxmFo8A2xIlm.png",
        price: 65000,
      },
    ],
  },
  {
    id: "gloss-sonoma-green",
    name: "Gloss Sonoma Green",
    color: "bg-[#355E3B]",
    hex: "#355E3B",
    cars: [
      {
        id: "porsche-macan",
        name: "Porsche Macan",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_sonoma_green_Ford_Capri-removebg-preview-JMpmjqgBug8hLpuLyIwGdU3wL4JF6e.png",
        price: 110000,
      },
    ],
  },
  {
    id: "gloss-yellow",
    name: "Gloss Yellow",
    color: "bg-[#FFD700]",
    hex: "#FFD700",
    cars: [
      {
        id: "subaru-forester",
        name: "Subaru Forester",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gloss_yellowSubaru_Forester-removebg-preview-tQlMUWIngk9nWjySpWqcTFhOzxIx5I.png",
        price: 78000,
      },
    ],
  },
]

export default function Customize() {
  const [selectedColor, setSelectedColor] = useState<WrapColor | null>(null)
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null)
  const [previewZoom, setPreviewZoom] = useState(1)
  const [previewRotation, setPreviewRotation] = useState(0)
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })

  return (
    <div className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Perfect Wrap
        </motion.h1>

        {/* Color Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Select Wrap Color</h2>
          <div className="relative">
            <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 p-4">
              {wrapColors.map((color) => (
                <motion.div key={color.id} className="relative group" whileHover={{ scale: 1.1 }}>
                  <div
                    className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${
                      selectedColor?.id === color.id ? "border-primary" : "border-transparent"
                    } ${color.color}`}
                    onClick={() => {
                      setSelectedColor(color)
                      setSelectedCar(null)
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {color.name}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* Available Cars */}
        {selectedColor && selectedColor.cars.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Available Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              <AnimatePresence mode="wait">
                {selectedColor.cars.map((car) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all h-full ${
                        selectedCar?.id === car.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedCar(car)}
                    >
                      <CardContent className="p-4">
                        <div className="relative w-full aspect-[16/9] mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{car.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Starting from KSH {car.price.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Preview Section */}
        {selectedCar && selectedColor && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Preview</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="relative h-96 mb-6">
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <Button variant="outline" size="icon" onClick={() => setPreviewZoom((z) => Math.min(z + 0.1, 1.5))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setPreviewZoom((z) => Math.max(z - 0.1, 0.5))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setPreviewRotation((r) => r + 90)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: `scale(${previewZoom}) rotate(${previewRotation}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Image
                    src={selectedCar.image || "/placeholder.svg"}
                    alt={selectedCar.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Summary and Contact Form */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Summary</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Model:</dt>
                      <dd>{selectedCar.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Color:</dt>
                      <dd>{selectedColor.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Price:</dt>
                      <dd>KSH {selectedCar.price.toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        value={contactDetails.name}
                        onChange={(e) => setContactDetails((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        type="email"
                        value={contactDetails.email}
                        onChange={(e) => setContactDetails((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        type="tel"
                        value={contactDetails.phone}
                        onChange={(e) => setContactDetails((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number"
                      />
                    </div>
                    <Button className="w-full">Get Quote</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
