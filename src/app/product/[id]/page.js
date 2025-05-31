'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { CartContext } from '../../../context/CartContext';
import { products } from '../../../data/products';

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        <button 
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
   
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />);
    }
    
    for (let i = fullStars; i < 5; i++) {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
    }
    
    return stars;
  };

  const productImages = [
    product.image,
    product.image, 
    product.image
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={productImages[selectedImage] || '/images/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        
          <div className="flex space-x-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-300'
                }`}
              >
                <Image
                  src={img || '/images/placeholder.png'}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {renderStars(product.rating || 4)}
              </div>
              <span className="text-gray-600">({product.rating || 4})</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200"
          >
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}