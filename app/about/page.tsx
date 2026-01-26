"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-6 py-16 pt-32">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Millan Customz
      </motion.h1>
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 space-y-6 text-lg">
            <p>
              Millan Customz is a leading car wrap company dedicated to transforming vehicles with high-quality wraps, paint
              protection films, and ceramic coatings. With years of experience and a passion for automotive aesthetics,
              we've built a reputation for excellence in the industry.
            </p>
            <p>
              Our team of skilled professionals uses cutting-edge technology and premium materials to ensure that every
              vehicle we work on receives the best possible treatment. We pride ourselves on our attention to detail,
              customer service, and commitment to delivering outstanding results.
            </p>
            <p>
              At Millan Customz, we believe that your car is an extension of your personality. That's why we offer a wide
              range of customization options, allowing you to express yourself through your vehicle's appearance while
              also protecting its original paint.
            </p>
            <p>
              Whether you're looking to stand out from the crowd with a bold new look or protect your investment with
              our advanced protective solutions, Millan Customz is here to exceed your expectations and bring your vision to
              life.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
