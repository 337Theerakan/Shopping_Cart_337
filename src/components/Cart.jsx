import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Cart = ({ open, setOpen, cart, updateQuantity, clearCart, total }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 bg-gray-500 bg-opacity-75">
      <div className="fixed inset-y-0 right-0 w-screen max-w-md bg-gray-800 shadow-xl p-6 overflow-y-auto max-h-[90%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">สินค้าทั้งหมด</h2>
          <XMarkIcon onClick={() => setOpen(false)} className="h-6 w-6 cursor-pointer text-gray-500" />
        </div>
        <ul className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-white">
                <span>
                  {item.Product} - {item.quantity} ชิ้น - {parseFloat(item.Price.replace(',', '')).toLocaleString('th-TH')} บาท
                </span>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    className="bg-red-600 text-white p-1 rounded hover:bg-red-700 mr-2"
                  >
                    ลบ
                  </button>
                  <span className="text-gray-400">{`(ในสต็อก: ${item.stock})`}</span> {/* Show stock */}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่มีอะไรเลย</p>
          )}
        </ul>
        <div className="mt-6">
          <p className="text-lg font-semibold text-white">รวมทั้งหมด: {total.toLocaleString('th-TH')} บาท</p>
          <button onClick={clearCart} className="w-full mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700">นำสินค้าออกทั้งหมด</button>
          <Link to="/payment">
            <button className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">ทำการชำระเงิน</button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
