import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import OrderNow from "./Components/OrderNow";
import { useState } from "react";

function App() {
  // Cart states
  const [cart, setCart] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  // Handle add to cart function
  const handleAddToCart = (item: any) => {
    const existingItem = cart.find((i) => i.id === item.id);
    let newCart;

    if (existingItem) {
      // Item exists, increase quantity
      newCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    setCartCount(newCart.length > 0);
    console.log(newCart);
    setCartTotal(newCart.reduce((acc, item) => acc + item.quantity, 0))
    setCartTotalPrice(newCart.reduce((acc, item) => acc + item.price * item.quantity, 0))
    console.log(cartTotal);
  };

  // Handle remove all from cart function
  const handleRemoveAllFromCart = (item: any) => {
    const newCart = cart.filter((i) => i.id !== item.id);
    if (newCart.some((i) => i.id === item.id)) {
      newCart.find((i) => i.id === item.id).quantity = 0;
    }
    setCart(newCart);
    if (newCart.length === 0) {
      setCartCount(false)
    } else {
      setCartCount(true)
    }
    setCartTotal(newCart.reduce((acc, item) => acc + item.quantity, 0))
    setCartTotalPrice(newCart.reduce((acc, item) => acc + item.price * item.quantity, 0))
    console.log(cartTotal);
  };

  // Handle remove one from cart function
  const handleRemoveFromCart = (item: any) => {
    const existingItem = cart.find((i) => i.id === item.id);
    let newCart;

    if (existingItem && existingItem.quantity > 1) {
      newCart = cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    } else {
      // Remove item completely if quantity is 1 or less
      newCart = cart.filter((i) => i.id !== item.id);
    }

    setCart(newCart);
    setCartCount(newCart.length > 0);
    setCartTotal(newCart.reduce((acc, item) => acc + item.quantity, 0));
    setCartTotalPrice(newCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    console.log(cartTotal);
  };

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Nav cart={cart} handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={handleAddToCart} handleRemoveAllFromCart={handleRemoveAllFromCart} cartCount={cartCount} cartTotal={cartTotal} cartTotalPrice={cartTotalPrice} />
        <main style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          // padding: '4rem 0',
          backgroundColor: '#f5f5f5'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order-now" element={<OrderNow handleAddToCart={handleAddToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
