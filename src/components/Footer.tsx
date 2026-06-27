import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Heart className="w-8 h-8 text-primary-500 fill-primary-500 transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold text-white">
                Blood<span className="text-primary-500">Life</span>
              </span>
            </Link>
            <p className="text-secondary-400 leading-relaxed">
              Connecting donors with those in need. Every drop counts, every donor saves lives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-colors group">
                <Facebook className="w-5 h-5 text-secondary-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-colors group">
                <Twitter className="w-5 h-5 text-secondary-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-colors group">
                <Instagram className="w-5 h-5 text-secondary-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-colors group">
                <Linkedin className="w-5 h-5 text-secondary-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">Register as Donor</Link>
              </li>
              <li>
                <Link to="/request" className="hover:text-primary-400 transition-colors">Request Blood</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary-400 transition-colors">Find Donors</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary-400 transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Eligibility Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Donation Process</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>123 Medical Center Drive, Health City, HC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>contact@bloodlife.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-400 text-sm">
            &copy; {currentYear} BloodLife. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
