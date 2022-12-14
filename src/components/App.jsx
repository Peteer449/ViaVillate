import Navbar from "./NavAndFooter/Navbar"
import Footer from './NavAndFooter/Footer';
import { ItemsListContainer } from './Item/ItemsListContainer';
import ItemDetailContainer from './Item/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home';
import { GaleryContainer } from './Galery/GaleryContainter';
import GaleryCategoryContainer from './Galery/GaleryCategoryContainer';
import { CartProvider } from './Context/CartContext';
import CartList from './Cart/CartList';
import Checkout from "./Cart/Checkout";
function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element ={<Home/>} />
            <Route path='/productos' element={<ItemsListContainer />} />
            <Route path='/productos/:id' element={<ItemDetailContainer/>}/>
            <Route path="/galeria" element={<GaleryContainer/>}/>
            <Route path="/galeria/:category" element={<GaleryCategoryContainer/>}/>
            <Route path="/carrito" element={<CartList/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
