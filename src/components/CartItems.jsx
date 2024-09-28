// components/CartItems.js

import React from 'react';

// eslint-disable-next-line react/prop-types
const CartItems = ({ cart, updateQuantity, removeFromCart }) => {
  return (
    <div>
      {cart.length === 0 ? (
        <p className="text-red-500">กระเป๋าว่างเปล่า</p> // Message when cart is empty
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-gray-200 p-4 mb-2 rounded">
            <div>
              <h2 className="font-semibold">{item.Product}</h2>
              <p className="text-gray-600">ราคา: {item.Price} บาท</p>
              <p className="text-gray-600">จำนวน: {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, 1)} // Increase quantity
                className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition duration-300"
              >
                +
              </button>
              <button
                onClick={() => updateQuantity(item.id, -1)} // Decrease quantity
                className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600 transition duration-300"
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition duration-300"
              >
                ลบ
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
