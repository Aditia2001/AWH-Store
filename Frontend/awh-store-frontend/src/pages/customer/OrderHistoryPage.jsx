import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getOrderHistory } from "../../services/orderService";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getOrderHistory();

      const orderData = response.data?.data || response.data || [];
      setOrders(orderData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengambil order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="content-card">
      <h1>Order History</h1>
      <p className="page-subtitle">Riwayat pesanan kamu</p>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>Belum ada order.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Detail</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.status}</td>
                <td>
                  Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}
                </td>
                <td>
                  <Link className="table-link" to={`/orders/${order.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OrderHistoryPage;
