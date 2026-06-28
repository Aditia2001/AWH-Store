function CartSidebar({
  cart,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  return (
    <aside className="cart-sidebar">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Cart masih kosong.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Rp {Number(item.price).toLocaleString("id-ID")}</p>
                </div>

                <div className="cart-actions">
                  <button onClick={() => onDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
          </div>

          <button className="btn-primary full-width" onClick={onCheckout}>
            Checkout Cash
          </button>
        </>
      )}
    </aside>
  );
}

export default CartSidebar;
