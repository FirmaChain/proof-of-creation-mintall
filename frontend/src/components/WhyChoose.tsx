import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Users, Globe, ShieldCheck, Lightbulb, TrendingUp } from 'lucide-react'

const WhyChoose: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const reasons = [
    {
      icon: Search,
      title: 'Real-world Implementation Focus',
      description: 'Bridging the gap between blockchain technology and practical applications',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Research',
      description: 'Dedicated to solving real-world challenges in digital authenticity',
    },
    {
      icon: Users,
      title: 'Community-driven Development',
      description: 'Building with feedback from creators and enterprises',
    },
    {
      icon: ShieldCheck,
      title: 'Decentralized Trust',
      description: 'No single point of failure or control',
    },
    {
      icon: Globe,
      title: 'Global Standards Compliance',
      description: 'Ensuring international compatibility',
    },
    {
      icon: TrendingUp,
      title: 'Future-proof Technology',
      description: 'Adaptable to emerging technologies and standards',
    },
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The Importance of Web3 Governance
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            In the evolving landscape of Web3 certification and provenance,
            establishing a trusted ecosystem is paramount
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Research & Innovation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 lg:p-10"
          >
            <div className="mb-6">
              <div className="inline-flex p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Research & Innovation
              </h3>
            </div>
            <div className="space-y-4">
              {reasons.slice(0, 3).map((reason, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <reason.icon className="w-5 h-5 text-primary-600 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{reason.title}</h4>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Governance Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-10 text-white"
          >
            <div className="mb-6">
              <div className="inline-flex p-3 bg-white/10 rounded-lg mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Governance Vision
              </h3>
            </div>
            <div className="space-y-4">
              {reasons.slice(3, 6).map((reason, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <reason.icon className="w-5 h-5 text-primary-300 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{reason.title}</h4>
                    <p className="text-gray-300 text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 lg:p-12 text-white text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Positioning at the Forefront of Web3 Certification
          </h3>
          <p className="max-w-3xl mx-auto text-lg text-white/90 mb-8">
            Proof of Creation positions itself at the forefront of the Web3 certification
            ecosystem, combining cutting-edge technology with practical implementation
            to create a trusted, decentralized future for digital content authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-all">
              Read Whitepaper
            </button>
            <button className="px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
              Join Community
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {[
            { value: '100%', label: 'C2PA Compliant' },
            { value: '2-Layer', label: 'Security Model' },
            { value: '24/7', label: 'Verification' },
            { value: 'Global', label: 'Coverage' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChoose