import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Palette, Camera, FileImage, Scale, Shield, Package } from 'lucide-react'

const UseCases: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const useCases = [
    {
      icon: Palette,
      title: 'Digital Art & NFTs',
      description: 'Prove original creation and ownership',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Protect professional work from unauthorized use',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileImage,
      title: 'Content Creation',
      description: 'Secure social media and marketing content',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Scale,
      title: 'Legal Documentation',
      description: 'Create verifiable digital evidence',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Brand Protection',
      description: 'Combat counterfeit products and designs',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Package,
      title: 'Supply Chain',
      description: 'Track product authenticity from source',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  return (
    <section id="use-cases" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Real-World Applications
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            From digital art to legal documentation, Proof of Creation provides the trust
            and verification needed across industries
          </p>
        </motion.div>

        {/* Current Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full mb-6">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Currently Live: DesignDash Integration
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Proof of Creation is currently integrated with DesignDash, Mintall's creative platform,
              serving real users in Silicon Valley. Experience the future of digital authenticity today.
            </p>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105">
              Try DesignDash
            </button>
          </div>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${useCase.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            Just as C2PA is already supported in Adobe Photoshop and Google's image information features,
            PoC is being developed for seamless integration with various services requiring content authenticity.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default UseCases