import { useNavigate } from "react-router-dom";

// Users can either hit the back arrow within stripe checkout to reach this page, or stripe redirects here on unsuccessful checkout
const CheckoutCancelPage = () => {
    const navigate = useNavigate();

    const handleReturnHomeClick = () => {
        navigate("/")
    }
    return (
        <div>
            <h1>Checkout Error</h1>
            <p>Please try again!</p>
            <button onClick={handleReturnHomeClick}>
                Continue Shopping
            </button>
        </div>
    )
}
export default CheckoutCancelPage;