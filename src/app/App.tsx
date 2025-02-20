import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../features/products/components/HomePage'
import ProductPage from '../features/products/components/ProductPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App
