import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Circle, ArrowRight } from 'lucide-react'

interface RoadmapPhase {
  phase: string
  title: string
  status: 'completed' | 'current' | 'future'
  items: string[]
}

const Roadmap: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const phases: RoadmapPhase[] = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      status: 'completed',
      items: [
        'C2PA standard implementation',
        'Firmachain integration',
        'Basic API development',
        'DesignDash beta integration'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Expansion',
      status: 'current',
      items: [
        'Enhanced API features',
        'Multi-platform SDK development',
        'Performance optimization',
        'User dashboard creation'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Ecosystem Growth',
      status: 'future',
      items: [
        'Major platform partnerships',
        'Mobile SDK release',
        'Advanced analytics dashboard',
        'Enterprise solutions'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Global Adoption',
      status: 'future',
      items: [
        'Multi-chain support',
        'AI-powered verification',
        'Government partnerships',
        'Industry standard establishment'
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    } else if (status === 'current') {
      return (
        <div className="relative">
          <Circle className="w-6 h-6 text-primary-600" />
          <div className="absolute inset-0 w-6 h-6 bg-primary-600 rounded-full animate-ping opacity-25" />
        </div>
      )
    }
    return <Circle className="w-6 h-6 text-gray-400" />
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-50 border-green-200'
    if (status === 'current') return 'bg-primary-50 border-primary-200'
    return 'bg-gray-50 border-gray-200'
  }

  return (
    <section id="roadmap" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Building the Future of Digital Trust
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Our roadmap to establishing Proof of Creation as the global standard
            for digital content authenticity
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300" />

            {/* Phases */}
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className={`border rounded-xl p-6 ${getStatusColor(phase.status)} hover:shadow-lg transition-shadow`}>
                    <div className="flex items-center mb-4">
                      {getStatusIcon(phase.status)}
                      <h3 className="ml-3 text-xl font-bold text-gray-900">
                        {phase.phase}: {phase.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            phase.status === 'completed' ? 'bg-green-500' :
                            phase.status === 'current' ? 'bg-primary-600' : 'bg-gray-400'
                          }`} />
                          <span className={`text-sm ${
                            phase.status === 'completed' ? 'text-gray-700' :
                            phase.status === 'current' ? 'text-gray-900 font-medium' : 'text-gray-500'
                          }`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className={`w-12 h-12 rounded-full border-4 ${
                    phase.status === 'completed' ? 'bg-green-500 border-green-200' :
                    phase.status === 'current' ? 'bg-primary-600 border-primary-200' : 'bg-gray-400 border-gray-200'
                  } flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105">
            Join Our Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Roadmap