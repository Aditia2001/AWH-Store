function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>No Image</span>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description || "Tidak ada deskripsi produk."}</p>

        <div className="product-meta">
          <strong>Rp {Number(product.price).toLocaleString("id-ID")}</strong>
          <span>Stock: {product.stock}</span>
        </div>

        <button
          className="btn-primary full-width"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
