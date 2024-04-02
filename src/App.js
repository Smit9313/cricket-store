import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
      />
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;