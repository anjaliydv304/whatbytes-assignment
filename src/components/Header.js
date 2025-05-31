import Link from 'next/link';
import { Search, ShoppingCart, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        <div className="relative flex-grow max-w-xl mx-4">
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full p-2 pl-10 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative flex items-center hover:text-gray-300">
            <ShoppingCart size={24} />
            <span className="ml-1">Cart</span>
          </Link>

          <button className="flex items-center hover:text-gray-300">
            <UserCircle size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
