import { motion } from 'framer-motion'
import { Shield, Lock, ChevronRight, PlayCircle } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
          >
            <Shield className="w-4 h-4 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">C2PA Compliant • Blockchain Secured</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Secure Your Digital Creations with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Blockchain-Verified
            </span>{' '}
            Authenticity
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600"
          >
            Proof of Creation combines C2PA global standards with Firmachain's blockchain technology
            to protect and verify digital content authenticity in the AI era.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/landing/API_USAGE_EXAMPLES.md"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Get Started
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.mintall.ai/blog/proof-of-creation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Learn More
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">X.509 Digital Signatures</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Tamper-Proof Protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">On-Chain Certificates</span>
            </div>
          </motion.div>

          {/* Floating Elements Animation */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg opacity-10 transform rotate-12" />
          </div>
          <div className="absolute bottom-1/4 right-10 animate-float animation-delay-2000">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero