import handleCartCheckout from "../utils/checkoutService";
import { useContext } from "react";
import { CartListContext } from "../../../app/App";
import Navbar from "../../../components/Navbar";

const CheckoutInformation = () => {
    const { cartList } = useContext(CartListContext)!; // global state tracking list of products
    
    return (
        <div className="container-fluid d-flex justify-content-center py-4" style={{ minHeight: "100vh" }}>
            <div className="bg-light shadow rounded" style={{ width: "75vw", padding: "40px" }}>
                <Navbar />
                
                <div className="row mt-4">
                    {/* Checkout Form Column */}
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                {/* Contact Information Section */}
                                <div className="mb-4">
                                    <h3 className="mb-3">Contact Information</h3>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                
                                {/* Shipping Information Section */}
                                <div className="mb-4">
                                    <h3 className="mb-3">Shipping Address</h3>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className="form-select" id="country" defaultValue="">
                                            <option value="" disabled>Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="MX">Mexico</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="fullName" 
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Street Address</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="address" 
                                            placeholder="Street Address"
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="apartment" className="form-label">Apartment, suite, etc. (optional)</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="apartment" 
                                            placeholder="Apartment, suite, etc."
                                        />
                                    </div>
                                    
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="city" 
                                                placeholder="City"
                                            />
                                        </div>
                                        
                                        <div className="col-md-3">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <select className="form-select" id="state" defaultValue="">
                                                <option value="" disabled>Select</option>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                        
                                        <div className="col-md-3">
                                            <label htmlFor="zip" className="form-label">ZIP Code</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="zip" 
                                                placeholder="ZIP"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            id="phone" 
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                </div>
                                
                                <div className="d-grid">
                                    <button 
                                        className="btn btn-primary py-2" 
                                        onClick={() => handleCartCheckout(cartList)}
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Order Summary Column */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title mb-3">Order Summary</h3>
                                
                                {/* Display cart items if any */}
                                {cartList && cartList.length > 0 ? (
                                    <>
                                        <div className="mb-3">
                                            {cartList.map((item) => (
                                                <div key={item.id} className="d-flex justify-content-between mb-2">
                                                    <div>
                                                        <span className="fw-bold">{item.quantity}x</span> {item.name}
                                                    </div>
                                                    <div>${(item.amount * item.quantity / 100).toFixed(2)}</div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <hr />
                                        
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal</span>
                                            <span>${(cartList.reduce((acc, item) => acc + (item.amount * item.quantity) / 100, 0)).toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping</span>
                                            <span>Calculated at next step</span>
                                        </div>
                                        
                                        <hr />
                                        
                                        <div className="d-flex justify-content-between mb-2 fw-bold">
                                            <span>Total</span>
                                            <span>${(cartList.reduce((acc, item) => acc + (item.amount * item.quantity) / 100, 0)).toFixed(2)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-5">
                                        <p className="fs-5">Your cart is empty</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutInformation;