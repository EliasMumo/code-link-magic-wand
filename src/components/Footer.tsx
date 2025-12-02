import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Gold accent line */}
      <div className="h-1 bg-accent" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: 'var(--gradient-gold)' }}>
                <Home className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-2xl font-bold text-background">DwellMerge</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Premium property rentals connecting discerning tenants with exceptional landlords. 
              Your journey to the perfect home starts here.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="p-2.5 rounded-lg bg-background/10 hover:bg-accent hover:text-foreground transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-background/70 group-hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background border-b border-accent/30 pb-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Browse Properties', 'List Your Property', 'How It Works', 'Pricing', 'FAQs'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-background/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background border-b border-accent/30 pb-3">
              Support
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-background/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background border-b border-accent/30 pb-3">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span className="text-background/70">
                  123 Property Lane<br />
                  Real Estate City, RE 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <a href="tel:+1234567890" className="text-background/70 hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <a href="mailto:hello@dwellmerge.com" className="text-background/70 hover:text-accent transition-colors">
                  hello@dwellmerge.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} DwellMerge. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <span className="text-background/30">|</span>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <span className="text-background/30">|</span>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
