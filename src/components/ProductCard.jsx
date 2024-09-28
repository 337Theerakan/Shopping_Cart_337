import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
      <img 
        src={product.img} 
        alt={product.Product} 
        className="w-full h-48 object-cover rounded-md mb-2" 
        onError={(e) => { e.target.src = 'fallback-image.jpg'; }}  // Show fallback image on error
      />
      <h2 className="text-xl font-bold text-white text-center">{product.Product}</h2>
      <p className="text-gray-400 text-center">{product.Price}</p>
      <button 
        onClick={() => addToCart(product)}
        className="mt-2 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-all duration-200"
      >
        ใส่กระเป๋า
      </button>
    </div>
  );
};

export default ProductCard;
