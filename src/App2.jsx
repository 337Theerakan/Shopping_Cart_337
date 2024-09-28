import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import CartItems from './components/CartItems';

const App2 = ({ cart, setCart, showNotification }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
    showNotification('สินค้าถูกลบออกจากกระเป๋าเเย้ว');
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.id === id);

      if (itemIndex === -1) return prevCart; 

      const availableStock = parseInt(newCart[itemIndex].stock);
      const currentQuantity = newCart[itemIndex].quantity;
      const newQuantity = currentQuantity + amount;

      if (newQuantity > availableStock) {
        showNotification(` ${newCart[itemIndex].Product} มีสินค้าไม่เพียงพอ`);
        return prevCart;
      }

      if (newQuantity > 0) {
        newCart[itemIndex].quantity = newQuantity;
      } else {
        newCart.splice(itemIndex, 1);
      }

      return newCart;
    });
  };

  const applyCoupon = () => {
    if (coupon === "IwanToD1E") { 
      setDiscount(0.1); 
      setCouponMessage('คูปองส่วนลด 10% ถูกใช้แล้ว');
    } else {
      setCouponMessage('คูปองไม่ถูกต้อง');
    }
    setCoupon(''); 
  };

  const clearCart = () => {
    setCart([]);
    showNotification('สินค้าถูกลบเเย้ว');
  };

  const totalPrice = cart.reduce((sum, item) => 
    sum + (item.quantity * parseFloat(item.Price.replace(',', ''))), 
    0
  );

  const discountedPrice = totalPrice * (1 - discount);
  const shippingCost = totalPrice > 0 ? 100 : 0; 
  const finalPrice = discountedPrice + shippingCost;

  return (
    <div className="container mx-auto p-6 bg-pink-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">กระเป๋าใส่สินค้า</h1>

      <CartItems 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
      />

      <div className="mt-6 bg-gray-300 p-4 rounded-lg shadow">
        <label className="block mb-2 text-black font-semibold">กรอกคูปองส่วนลด</label>
        <div className="flex">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="p-2 border border-gray-600 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="กรอกรหัสคูปอง"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 transition duration-300"
          >
            ใช้คูปอง
          </button>
        </div>
        {couponMessage && <p className="mt-2 text-red-500">{couponMessage}</p>}
      </div>

      <div className="mt-6 bg-gray-500 p-4 rounded-lg shadow">
        <p className="text-lg text-white">ราคาสินค้า: <span className="font-semibold">{totalPrice.toLocaleString('th-TH')} บาท</span></p>
        <p className="text-lg text-white">ค่าจัดส่ง: <span className="font-semibold">{shippingCost.toLocaleString('th-TH')} บาท</span></p>
        <p className="text-lg font-bold text-white">เงินที่หายไปทั้งหมด: <span className="text-red-200">{finalPrice.toLocaleString('th-TH')} บาท</span></p>
      </div>

      <div className="flex justify-between mt-4">
        <Link to="/" className="inline-block bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition duration-300">
          กลับไปยังหน้าหลัก
        </Link>

        <button
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        >
          จัดส่ง
        </button>
      </div>
    </div>
  );
};

export default App2;
//IwanToD1E