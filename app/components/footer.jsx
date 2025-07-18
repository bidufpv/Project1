import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-100 border-t text-gray-700">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo and About */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <img
            className="h-16 w-auto object-contain bg-transparent"
            src="/logo.jpg"
            alt="Logo"
          />
          <p className="text-sm text-center md:text-left leading-relaxed">
            M-electronics - Your one-stop solution for modern gadgets and accessories.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-600"><Facebook size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Instagram size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Twitter size={18} /></a>
            <a href="#" className="hover:text-blue-600"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-blue-700 font-semibold text-lg mb-1">Contact Us</h3>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-blue-500" />
            <span className="text-sm">+91 910 XXXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-500" />
            <span className="text-sm">bidufpv@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            <span className="text-sm">Bhubaneswar, India</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-blue-700 font-semibold text-lg mb-1">Quick Links</h3>
          <a href="#" className="text-sm hover:text-blue-500 transition">Home</a>
          <a href="#" className="text-sm hover:text-blue-500 transition">Products</a>
          <a href="#" className="text-sm hover:text-blue-500 transition">About Us</a>
          <a href="#" className="text-sm hover:text-blue-500 transition">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-blue-700 font-semibold text-lg mb-1">Subscribe</h3>
          <p className="text-sm text-center md:text-left">
            Get updates about our latest products and offers.
          </p>
          <form className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 flex-1 text-sm rounded-l-md border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 rounded-r-md text-sm hover:bg-blue-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-blue-200 py-4 text-center text-xs text-gray-600 bg-blue-50">
        © 2025 M-electronics. All rights reserved.
      </div>
    </footer>
  );
}
