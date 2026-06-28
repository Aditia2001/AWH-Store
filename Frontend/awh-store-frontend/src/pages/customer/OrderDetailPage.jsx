import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getOrderDetail } from "../../services/orderService";

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      const response = await getOrderDetail(id);
      setOrder(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal mengambil detail order",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return <section className="content-card">Loading order detail...</section>;
  }

  if (!order) {
    return <section className="content-card">Order tidak ditemukan.</section>;
  }

  const items = order.items || [];

  return (
    <section className="content-card">
      <h1>Order Detail #{order.id}</h1>
      <p className="page-subtitle">Detail pesanan customer</p>

      <div className="order-summary">
        <p>
          Status: <strong>{order.status}</strong>
        </p>
        <p>
          Total:{" "}
          <strong>
            Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}
          </strong>
        </p>
      </div>

      {items.length === 0 ? (
        <p>Item order tidak ditemukan.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.product?.name || "-"}</td>
                <td>{item.quantity}</td>
                <td>Rp {Number(item.price || 0).toLocaleString("id-ID")}</td>
                <td>Rp {Number(item.subtotal || 0).toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OrderDetailPage;
