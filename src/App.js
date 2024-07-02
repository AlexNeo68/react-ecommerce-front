import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route Component={HomeScreen} path="/" exact />
            <Route Component={ProductScreen} path="/products/:id" />
            <Route Component={CartScreen} path="/cart/:id?" />
          </Routes>
        </Container>
      </main>
      
      <Footer />
    </>
  );
}

export default App;
