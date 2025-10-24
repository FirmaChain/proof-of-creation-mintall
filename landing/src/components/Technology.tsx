import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Layers, Cpu, Shield, ArrowRight } from 'lucide-react'

const Technology = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const techStack = [
    {
      step: '01',
      title: 'C2PA Credentials',
      description: 'Add traceable metadata to your unique image assets',
      icon: Layers,
      color: 'from-blue-500 to-blue-600',
    },
    {
      step: '02',
      title: 'Firmachain NFTs',
      description: 'Issue on-chain certificates as NFTs for enhanced transparency',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
    },
    {
      step: '03',
      title: 'Dual Verification',
      description: 'Two independent verification layers for ultimate security',
      icon: Shield,
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <section id="technology" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Double Security with Firmachain
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            What sets Proof of Creation apart is the combination of on-chain certificates
            with C2PA standards, providing maximum reliability
          </p>
        </motion.div>

        {/* Tech Stack Process */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="text-4xl font-bold text-gray-200 mb-4">{tech.step}</div>

                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${tech.color} mb-4`}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-gray-600">{tech.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < techStack.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-primary-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Architecture</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Decentralized Storage</h4>
              <p className="text-gray-300 text-sm">Immutable records on Firmachain blockchain</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Smart Contract Verification</h4>
              <p className="text-gray-300 text-sm">Automated authenticity checks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">API Integration</h4>
              <p className="text-gray-300 text-sm">Easy integration with existing creative workflows</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Technology