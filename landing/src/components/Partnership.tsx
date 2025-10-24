import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Globe, Rocket, Users, ExternalLink } from 'lucide-react'

const Partnership = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlights = [
    {
      icon: Award,
      title: 'Official C2PA Member',
      description: 'Direct participation in global standard development',
    },
    {
      icon: Globe,
      title: 'US Market Expertise',
      description: 'Deep understanding of compliance and regulations',
    },
    {
      icon: Rocket,
      title: 'Mintall Integration',
      description: 'Beta testing with real-world creative platform',
    },
    {
      icon: Users,
      title: 'Research & Development',
      description: 'Continuous innovation in Web3 certification',
    },
  ]

  return (
    <section id="partnership" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Strategic Partnership with Mintall
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Proof of Creation is developed in collaboration with Mintall, an official C2PA member
            and Silicon Valley startup pioneering Web3 certification solutions.
          </p>
        </motion.div>

        {/* Partnership Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 lg:p-12 text-white">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-2">Mintall</h3>
                  <p className="text-primary-100 text-lg">Silicon Valley Innovation Partner</p>
                </div>
                <p className="text-white/90 mb-6">
                  As an official member of the Coalition for Content Provenance and Authenticity (C2PA),
                  Mintall brings cutting-edge expertise in blockchain technology and digital certification
                  to the Proof of Creation ecosystem.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.mintall.ai/blog/proof-of-creation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
                  >
                    PoC Introduction
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                  <a
                    href="https://www.mintall.ai/blog/mintall-firmachain-partnership"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
                  >
                    Partnership Details
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Image/Pattern */}
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-primary-700 to-primary-900">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full" />
                </div>
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white/20 mb-2">C2PA</div>
                    <div className="text-lg text-white/60 font-semibold">Official Member</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-4 bg-white rounded-xl shadow-md mb-4">
                <highlight.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h4>
              <p className="text-gray-600 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partnership