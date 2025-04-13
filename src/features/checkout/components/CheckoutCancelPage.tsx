import { useNavigate } from "react-router-dom";

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