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

  return (
    <section className="content-card">
      <h1>Order Detail #{order.id}</h1>
      <p className="page-subtitle">Detail pesanan customer</p>

      <div className="order-summary">
        <p>
          Status: <strong>{order.status}</strong>
        </p>
        <p>
          Payment: <strong>{order.payment_method}</strong>
        </p>
        <p>
          Total:{" "}
          <strong>
            Rp {Number(order.total_price).toLocaleString("id-ID")}
          </strong>
        </p>
      </div>

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
          {(order.details || order.order_details || []).map((item) => (
            <tr key={item.id}>
              <td>{item.product?.name || item.product_name || "-"}</td>
              <td>{item.quantity}</td>
              <td>Rp {Number(item.price).toLocaleString("id-ID")}</td>
              <td>
                Rp{" "}
                {Number(
                  item.subtotal || item.price * item.quantity,
                ).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default OrderDetailPage;
