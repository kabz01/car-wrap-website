import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-28 w-72 mb-2 transform transition-transform hover:scale-105">
                <Image
                  src="/images/millan-customz-logo.png"
                  alt="Millan Customz Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 192px"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/services" className="hover:text-gray-300">
              Services
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
