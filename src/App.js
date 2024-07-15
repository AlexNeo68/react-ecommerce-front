import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route Component={HomeScreen} path="/" exact />
            <Route Component={LoginScreen} path="/login" />
            <Route Component={ProfileScreen} path="/profile" />
            <Route Component={RegisterScreen} path="/register" />
            <Route Component={ProductScreen} path="/products/:id" />
            <Route Component={CartScreen} path="/cart/:id?" />
            <Route Component={ShippingScreen} path="/shipping" />
            <Route Component={PaymentScreen} path="/payment" />
          </Routes>
        </Container>
      </main>
      
      <Footer />
    </>
  );
}

export default App;
