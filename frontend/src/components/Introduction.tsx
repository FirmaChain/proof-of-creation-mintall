import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, FileCheck, Scale, Link } from 'lucide-react'

const Introduction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Shield,
      title: 'Tamper-proof Protection',
      description: 'Immutable metadata embedded directly into your creations',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileCheck,
      title: 'Complete Provenance Chain',
      description: 'Track creation, editing, and distribution history',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Scale,
      title: 'Legal Evidence',
      description: 'Provide indisputable proof in legal and commercial disputes',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Link,
      title: 'Blockchain Security',
      description: 'Dual-layer protection with on-chain certificates',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <section id="introduction" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What is Proof of Creation?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Proof of Creation (PoC) is a revolutionary authenticity solution designed to protect your
            creative works in the era of generative AI. By embedding tamper-proof metadata into images
            and recording provenance information from the moment of creation using cryptographic technology,
            PoC provides irrefutable evidence for legal and commercial disputes.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 lg:mr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Protecting Creativity in the AI Era
              </h3>
              <p className="text-gray-700">
                As AI-generated content becomes increasingly sophisticated, proving authenticity
                and ownership of original work has never been more critical. Proof of Creation
                provides the tools you need to secure your digital assets.
              </p>
            </div>
            <button className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Introduction