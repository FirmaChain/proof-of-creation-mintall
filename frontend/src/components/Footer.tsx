import { Github, Twitter, Linkedin, ExternalLink, Mail, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    developers: [
      { name: 'API Documentation', href: '/API specification.md' },
      { name: 'GitHub Repository', href: '#' },
      { name: 'Technical Support', href: '#' },
      { name: 'SDK Downloads', href: '#' },
    ],
    business: [
      { name: 'Contact Sales', href: '#' },
      { name: 'Request Demo', href: '#' },
      { name: 'Partnership Inquiries', href: '#' },
      { name: 'Enterprise Solutions', href: '#' },
    ],
    resources: [
      { name: 'Blog', href: 'https://www.mintall.ai/blog', external: true },
      { name: 'Whitepaper', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Case Studies', href: '#' },
    ],
    company: [
      { name: 'About Firmachain', href: 'https://firmachain.org', external: true },
      { name: 'About Mintall', href: 'https://www.mintall.ai', external: true },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Proof of Creation
                </h3>
                <p className="mt-3 text-gray-400 text-sm">
                  Secure your digital creations with blockchain-verified authenticity.
                  Combining C2PA standards with Firmachain technology.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Silicon Valley, CA</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:contact@proofofcreation.io" className="hover:text-primary-400">
                    contact@proofofcreation.io
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* For Developers */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  For Developers
                </h4>
                <ul className="space-y-2">
                  {footerLinks.developers.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Business */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  For Business
                </h4>
                <ul className="space-y-2">
                  {footerLinks.business.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Resources
                </h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-primary-400 text-sm transition-colors inline-flex items-center"
                      >
                        {link.name}
                        {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-primary-400 text-sm transition-colors inline-flex items-center"
                      >
                        {link.name}
                        {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} Firmachain. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer