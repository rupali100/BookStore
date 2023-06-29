import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [bookData, setBookData] = useState([]);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(
        " https://8230hr9rdb.execute-api.ap-south-1.amazonaws.com/Dev/getbooksdetails"
      ); // Replace with your API endpoint URL
      console.log("response", response);
      setBookData(response.data.Items);
      console.log("bookdata", bookData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCart = async () => {
    const response = await axios.get(
      "https://8230hr9rdb.execute-api.ap-south-1.amazonaws.com/Dev/getcartdetails"
    );
    console.log("cart", response);
    setCart(response.data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await axios.post(
      "https://8230hr9rdb.execute-api.ap-south-1.amazonaws.com/Dev/addtocart",
      { productId: productId, quantity: quantity }
    );

    setCart(item.data);
  };

  // const handleUpdateCartQty = async (lineItemId, quantity) => {
  //   const response = await commerce.cart.update(lineItemId, { quantity });

  //   setCart(response.cart);
  // };

  const handleRemoveFromCart = async (lineItemId) => {
    console.log("lineItemId", lineItemId);
    const item = await axios.delete(
      "https://8230hr9rdb.execute-api.ap-south-1.amazonaws.com/Dev/removefromcart",
      { lineItemId: lineItemId }
    );
    console.log("lineItemId", item);
    setCart(item);
  };

  // const handleEmptyCart = async () => {
  //   const response = await commerce.cart.empty();

  //   setCart([]);
  // };

  // const refreshCart = async () => {
  //   const newCart = await commerce.cart.refresh();

  //   setCart(newCart);
  // };

  // const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  //   try {
  //     const incomingOrder = await commerce.checkout.capture(
  //       checkoutTokenId,
  //       newOrder
  //     );

  //     setOrder(incomingOrder);

  //     refreshCart();
  //   } catch (error) {
  //     setErrorMessage(error.data.error.message);
  //   }
  // };

  useEffect(() => {
    fetchBookData();
    fetchCart();
  }, []);

  return (
    <>
      <Router>
        <div data-testid="app-test-id" ba style={{ display: "flex" }}>
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products
                products={bookData}
                onAddToCart={handleAddToCart}
                handleUpdateCartQty
              />
            </Route>
            <Route exact path="/cart">
              <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            </Route>
            
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
