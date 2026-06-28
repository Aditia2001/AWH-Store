function ProductCard({ product, onAddToCart }) {
  const imageUrl =
    product.image ||
    "https://images.unsplash.com/photo-1763757933292-d8290692edde?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={product.name} />
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
