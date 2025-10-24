import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Wifi, Package, Clock, FileJson, Image, FileText, Video } from 'lucide-react'

const TechSpecs: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const apiFeatures = [
    { icon: Code, title: 'RESTful API', description: 'Easy integration with existing systems' },
    { icon: Wifi, title: 'WebSocket Support', description: 'Real-time verification updates' },
    { icon: Package, title: 'Batch Processing', description: 'Handle multiple assets efficiently' },
    { icon: Clock, title: 'Webhook Notifications', description: 'Automated workflow triggers' },
  ]

  const supportedFormats = [
    { icon: Image, name: 'Images', formats: 'JPEG, PNG, WebP' },
    { icon: FileText, name: 'Documents', formats: 'PDF files' },
    { icon: Video, name: 'Video', formats: 'Coming soon' },
    { icon: FileJson, name: 'Audio', formats: 'Coming soon' },
  ]

  const integrationTime = [
    { time: '< 1 day', description: 'Basic integration' },
    { time: '3-5 days', description: 'Full implementation' },
    { time: '2-4 weeks', description: 'Enterprise customization' },
  ]

  return (
    <section id="tech-specs" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Technical Specifications
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Built for developers, designed for scale
          </p>
        </motion.div>

        {/* API Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            API Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-primary-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supported Formats & Integration Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Supported Formats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Supported Formats</h3>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="space-y-4">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center">
                      <format.icon className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="font-medium text-gray-900">{format.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{format.formats}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Integration Time */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Integration Time</h3>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="space-y-4">
                {integrationTime.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-20">
                      <span className="text-2xl font-bold text-primary-600">{item.time}</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-700 font-medium">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Start Example</h3>
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap break-words">
              <code>{`// Mint NFT Certificate for digital content
const api_key = 'YOUR_API_KEY';
const certificateData = {
  imageHash: 'd59fb850442d09d25d34f31df8eeb8d2043bfa221546d9ef8c0ab9b12960f6db',
  imagePerceptualHash: '91ec30336dd5f176834818cc64ff6bb01b2ef0c7c3410ebe712b99664a9ab60f',
  version: '1.0',
  creatorName: 'Artist Name',
  imageUrl: 'https://example.com/artwork.png',
  c2paMetadata: {
    creator: 'Artist Name',
    timestamp: new Date().toISOString()
  }
};

// Mint NFT Certificate on blockchain
const mintResponse = await fetch('https://mintall-api.firmachain.dev/api/mint/create', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${api_key}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(certificateData)
});

const mintResult = await mintResponse.json();
console.log('NFT Token ID:', mintResult.data.tokenId);
console.log('Transaction Hash:', mintResult.data.transactionHash);

// Verify NFT Certificate
const verifyResponse = await fetch(\`https://mintall-api.firmachain.dev/api/verification/check?key=tokenId&value=\${mintResult.data.tokenId}\`, {
  headers: { 'Authorization': \`Bearer \${api_key}\` }
});

const verificationResult = await verifyResponse.json();
console.log('Verification Result:', verificationResult.data);`}</code>
            </pre>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/FirmaChain/proof-of-creation-mintall/blob/main/API%20specification.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
          >
            View Full API Documentation
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TechSpecs
