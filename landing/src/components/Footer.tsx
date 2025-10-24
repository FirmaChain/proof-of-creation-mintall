import { Github, Send, ExternalLink, Mail, MapPin, BookOpen } from 'lucide-react'

// Custom X (Twitter) icon component
const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    documentation: [
      { name: 'API Documentation', href: 'https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/landing/API_USAGE_EXAMPLES.md', external: true },
      { name: 'GitHub Repository', href: 'https://github.com/FirmaChain/mintall-nft-cert-api', external: true },
      { name: 'README', href: 'https://github.com/FirmaChain/mintall-nft-cert-api/blob/main/README.md', external: true },
    ],
    resources: [
      { name: 'Proof of Creation Blog', href: 'https://www.mintall.ai/blog/proof-of-creation', external: true },
      { name: 'Verify Credentials', href: 'https://credentials.mintall.ai/verify/', external: true },
      { name: 'C2PA Standards', href: 'https://c2pa.org/', external: true },
      { name: 'Content Credentials', href: 'https://contentcredentials.org/', external: true },
    ],
    company: [
      { name: 'Firmachain', href: 'https://firmachain.org', external: true },
      { name: 'Mintall', href: 'https://www.mintall.ai', external: true },
      { name: 'Telegram Community', href: 'https://t.me/firmachain_global', external: true },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/FirmaChain', label: 'GitHub' },
    { icon: XIcon, href: 'https://twitter.com/FirmaChain', label: 'X (Twitter)' },
    { icon: Send, href: 'https://t.me/firmachain_global', label: 'Telegram' },
    { icon: BookOpen, href: 'https://medium.com/firmachain', label: 'Medium' },
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
                  <a href="mailto:info@firmachain.org" className="hover:text-primary-400">
                    info@firmachain.org
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
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Documentation */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Documentation
                </h4>
                <ul className="space-y-2">
                  {footerLinks.documentation.map((link) => (
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
          <div className="text-center">
            <div className="text-sm text-gray-400">
              © {currentYear} Firmachain. All rights reserved.
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Open Source Project - MIT License
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer