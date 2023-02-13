import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import HomeScreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <BrowserRouter>

      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?/:qty?" element={<CartScreen />} />
          </Routes>
        </Container>
        <Footer />
      </main>

    </BrowserRouter>
  );
}

export default App;
