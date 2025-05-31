'use client';

import { useContext, Suspense } from 'react';
import { CartContext } from '../../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

function CartContent() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image 
                  src={item.image || '/images/placeholder.png'} 
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <p className="font-semibold text-gray-800 min-w-20">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</span>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>
        
        <button className="w-full bg-[#0859A8] hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Loading cart...</div>
      </div>
    }>
      <CartContent />
    </Suspense>
  );
}