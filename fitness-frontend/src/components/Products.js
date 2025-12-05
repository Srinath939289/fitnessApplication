import React from "react";

const Products = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="products-container">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="image-placeholder">{product.name.charAt(0)}</div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">Rs. {product.price}</p>
              <p className="stock">
                Stock: <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                  {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
                </span>
              </p>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="add-to-cart-btn"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
