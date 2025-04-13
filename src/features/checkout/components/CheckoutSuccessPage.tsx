import { useNavigate } from "react-router-dom";

// to do: create unique order ID, hashing function to decode it into its matching sales transaction ID
const CheckoutSuccessPage = () => {
    const navigate = useNavigate()

    const handleReturnHomeClick = () => {
        navigate("/")
    }
    return (
        <div>
            <h1>Checkout Successful.</h1>
            <p>Thank you for your purchase!</p>
            <p>Order #: insert number here</p>
            <button onClick={handleReturnHomeClick}>
                Continue Shopping
            </button>
        </div>
    )
}
export default CheckoutSuccessPage;