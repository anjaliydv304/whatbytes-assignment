import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002C5F] text-gray-200 py-8"> 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">Filters </h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">All</a></li>
              <li><a href="#" className="hover:text-white">Electronic</a></li>
          
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={24} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={24} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={24} /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 ">
          <p>&copy; 2024 American</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;