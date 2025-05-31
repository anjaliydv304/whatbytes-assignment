'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, UserCircle } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import SearchBar from './SearchBar';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart } = useContext(CartContext); 
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (query) => {
    const params = new URLSearchParams(searchParams);
    
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    
    const newURL = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newURL);
  };

  const currentSearch = searchParams.get('search') || '';

  return (
    <header className="bg-[#0859A8] text-white shadow-md"> 
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Logo
          </Link>

          <div className="hidden md:block flex-grow mx-8">
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={currentSearch}
              placeholder="Search for products..."
            />
          </div>

          <div className="flex items-center space-x-4">
          <button className=''>
            <Link href="/cart" className="relative flex items-center hover:text-gray-300 transition-colors">
              <ShoppingCart size={24} />
              <span className="ml-2 hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </button>
            
            
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;