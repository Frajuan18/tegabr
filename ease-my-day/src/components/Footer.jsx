// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Services", href: "#services" },
        { name: "How it works", href: "#how-it-works" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Pricing", href: "/pricing" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Student Guide", href: "/guide" },
        { name: "FAQ", href: "/faq" },
        { name: "Support", href: "#contact" },
        { name: "Community", href: "/community" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Security", href: "/security" }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com/tegbar", color: "#1DA1F2" },
    { icon: FaLinkedin, href: "https://linkedin.com/company/tegbar", color: "#0077B5" },
    { icon: FaGithub, href: "https://github.com/tegbar", color: "#333" },
    { icon: FaInstagram, href: "https://instagram.com/tegbar", color: "#E4405F" }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#1C1C1E] text-white font-outfit">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top section with logo and newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/10">
          {/* Logo and description */}
          <div>
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight hover:text-[#6C63FF] transition-colors">
              Tegbar
            </Link>
            <p className="text-gray-400 mt-4 max-w-md">
              Empowering students to achieve academic excellence through smart tools and AI-powered assistance.
            </p>
            
            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-400">
                <FaEnvelope className="h-4 w-4 mr-3 text-[#6C63FF]" />
                <span className="text-sm">support@tegbar.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FaPhone className="h-4 w-4 mr-3 text-[#6C63FF]" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="h-4 w-4 mr-3 text-[#6C63FF]" />
                <span className="text-sm">Stanford, California</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold mb-4">Stay updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news and updates about new features.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#6C63FF] text-white rounded-2xl font-semibold hover:bg-[#5A52E0] transition-colors shadow-[0_4px_0_#4A42C0] hover:translate-y-1 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.href.startsWith('#') ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} Tegbar. All rights reserved. Made with <FaHeart className="inline h-3 w-3 text-[#FF6B6B] mx-1" /> for students.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors group"
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </a>
              );
            })}
          </div>

          {/* Language/Region */}
          <select className="bg-white/10 text-gray-400 text-sm rounded-2xl px-3 py-2 border border-white/20 focus:outline-none focus:border-[#6C63FF]">
            <option value="en">English (US)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </footer>
  );
}