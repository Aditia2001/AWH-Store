import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeroSection from "../../components/customer/HeroSection";
import ProductCard from "../../components/customer/ProductCard";
import CartSidebar from "../../components/customer/CartSidebar";

import { getProducts } from "../../services/productService";
import { checkout } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (search = "") => {
    try {
      setLoading(true);

      const response = await getProducts({ search });
      const productData = response.data?.data || response.data || [];

      setProducts(productData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengambil produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(keyword);
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("Stok produk habis");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error("Jumlah melebihi stok tersedia");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast.success("Produk ditambahkan ke cart");
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/login");
      return;
    }

    if (user?.role !== "customer") {
      toast.error("Checkout hanya untuk customer");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart masih kosong");
      return;
    }

    try {
      const payload = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_method: "cash",
      };

      await checkout(payload);

      toast.success("Checkout berhasil");
      setCart([]);
      fetchProducts();
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout gagal");
    }
  };

  return (
    <div className="store-page">
      <div className="store-content">
        <HeroSection />

        <section className="product-section">
          <div className="section-header">
            <div>
              <h2>Products</h2>
              <p>Daftar produk yang tersedia</p>
            </div>

            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search product..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>Produk tidak ditemukan.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <CartSidebar
        cart={cart}
        totalPrice={totalPrice}
        onIncrease={addToCart}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default LandingPage;
