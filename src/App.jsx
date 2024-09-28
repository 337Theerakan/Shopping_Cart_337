import React, { useEffect, useState } from 'react';
import products from './productsata';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Notification from './components/Notification';

const App = ({ cart, setCart }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      if (cart[existingProductIndex].quantity < product.stock) {
        const newCart = [...cart];
        newCart[existingProductIndex].quantity += 1;
        setCart(newCart);
        showNotification(`${product.Product} เพิ่มลงไปในกระเป๋าเเย้ว`);
      } else {
        showNotification(` สินค้าหมดรอต่อไป `);
      }
    } else if (product.stock > 0) {
      setCart([...cart, { ...product, quantity: 1 }]);
      showNotification(`${product.Product} เพิ่มลงไปในกระเป๋าเล้ว`);
    } else {
      showNotification(`สินค้าหมดรอต่อไปอีก 1 `);
    }
  };

  const updateQuantity = (id, amount) => {
    const existingProductIndex = cart.findIndex(item => item.id === id);
    const newCart = [...cart];

    if (existingProductIndex !== -1) {
      if (newCart[existingProductIndex].quantity + amount > 0) {
        newCart[existingProductIndex].quantity += amount;
        setCart(newCart);
        showNotification(` ${newCart[existingProductIndex].Product} ถูกเเก้ไขเเย้ว`);
      } else {
        removeFromCart(id);
      }
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showNotification('สินค้าถูกนำออกจากกระเป๋า');
  };

  const clearCart = () => {
    setCart([]);
    showNotification('ทิ้งกระเป๋าเเล้ว!!');
  };

  const total = cart.reduce((sum, { Price, quantity }) =>
    sum + (parseFloat(Price.replace(',', '')) * quantity), 0
  );

  const showNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4 relative bg-gray-100 text-black min-h-screen">
      <header className="flex justify-between items-center border-b border-gray-700 mb-4 pb-2">
        <div className="flex items-center bg-gradient-to-r from-red-500 to-black p-4 rounded-lg shadow-lg w-full">
          <h1 className="text-3xl font-bold text-white mr-auto">Fate/FiguShop</h1>
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-800"
            style={{ width: '250px' }}
          />
        </div>
      </header>

      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 bg-green-600 text-black p-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
      >
        กระเป๋าใส่สินค้า ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      <ProductGrid 
        products={products} 
        addToCart={addToCart} 
        searchQuery={debouncedSearchQuery} 
      />

      <Cart
        open={open}
        setOpen={setOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        total={total}
      />

      {/* Notification section */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 space-y-2">
          {notifications.map((notification, index) => (
            <Notification key={index} message={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
