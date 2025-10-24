import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  scrolled: boolean
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Features', href: '#introduction' },
    { name: 'Standards', href: '#standards' },
    { name: 'Technology', href: '#technology' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'API Docs', href: 'https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/landing/API_USAGE_EXAMPLES.md', external: true },
    { name: 'GitHub', href: 'https://github.com/FirmaChain/mintall-nft-cert-api', external: true },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent`}>
                Proof of Creation
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/landing/API_USAGE_EXAMPLES.md"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-primary-600`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white rounded-lg shadow-lg mt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/landing/API_USAGE_EXAMPLES.md"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header