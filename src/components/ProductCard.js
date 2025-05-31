'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { name, price, image, id, rating } = product;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const renderStars = () => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const starsArray = [];
    
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-current" />);
    }
    
    for (let i = starsArray.length; i < 5; i++) {
      starsArray.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return <div className="flex items-center space-x-1">{starsArray}</div>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <Link href={`/product/${id}`} className="block relative w-full h-48">
        <Image
          src={image || '/images/placeholder.png'} 
          alt={name}
          fill
          className="object-cover hover:opacity-90 transition-opacity duration-200"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          <Link href={`/product/${id}`} className="hover:text-blue-600">
            {name}
          </Link>
        </h3>
        
        <p className="text-xl font-bold text-gray-900 mb-2">${price.toFixed(2)}</p>
        
        {rating && (
          <div className="mb-3 flex items-center space-x-2">
            {renderStars()}
            <span className="text-sm text-gray-600">({rating})</span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-[#0859A8] hover:bg-blue-950 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition duration-150 ease-in-out"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;