import React from 'react';
import ProductCard from './ProductCard'; // Ensure ProductCard is imported
import products from '../productsata'; // Import product data

const ProductGrid = ({ addToCart, searchQuery }) => {
  // Filter products based on the search query
  const filteredProducts = products.filter(product => 
    product.Product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="sr-only">รายการสินค้า</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">ไม่พบสินค้า</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
