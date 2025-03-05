import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartListContext } from "../app/App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Navbar is a global component used throughout the application
const Navbar = () => {
  const { cartList } = useContext(CartListContext)!;
  const cartItemCount = cartList?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const navigate = useNavigate();

    const handleNavCartIconClick = () => {
        navigate('/cart')
    }
    const handleNavTextClick = () => {
        navigate('/')
    }
    

  return (
    <div className="d-flex justify-content-between m-5">
      <div onClick={handleNavTextClick} style={{ cursor: 'pointer' }}>livelymoss | printed parts</div>

      {/* font awesome icon with updated product quantity */}
      <div 
        className="position-relative" 
        onClick={handleNavCartIconClick} 
        style={{ cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartItemCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItemCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
