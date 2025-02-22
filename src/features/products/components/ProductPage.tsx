import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ProductContext } from "../../../app/App";

/**
 * Page that allows a user to add a product to their cart
 *
 * @returns
 */
const ProductPage = () => {
  const { selectedProduct } = useContext(ProductContext)!;

  // remove when bypass of useContext is implmented
  if (!selectedProduct) {
    return <Navigate to="/" replace />;
  }
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        className="container-fluid p-3 mb-2 bg-secondary text-white"
        style={{ maxWidth: "1200px" }}
      >
        <div className="row">
          <div className="col-md-8">
            <div className="container mt-4">
              <div className="card p-3 mb-2 bg-dark text-white">
                <img
                  src={selectedProduct.imgUrl}
                  className="card-img-top"
                  alt={selectedProduct.descriptionShort}
                />
                <div className="card-body">
                  <h2 className="card-title">
                    {selectedProduct.descriptionLong}
                  </h2>
                  <p className="card-text">Price: ${selectedProduct.price}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Offcanvas side bar to display shopping cart */}
          <div className="col-md-4 mb-2 bg-dark text-white">
            <button
              className="btn btn-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Add to cart
            </button>

            <div
              className="offcanvas offcanvas-end bg-dark text-white"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Added to Cart!</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="">product image</div>
                <div className="">product description</div>
                <div className="">quantity just added</div>
                <div className="">price</div>
                <div className="">
                  cart subtotal (# of items): $price
                </div>
                <div className="">See more similar products:</div>
                <div className="">product image, description, price, view oroduct</div>
                <div className="">product image, description, price, view oroduct</div>
                <div className="">product image, description, price, view oroduct</div>
                <div className="">product image, description, price, view oroduct</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
