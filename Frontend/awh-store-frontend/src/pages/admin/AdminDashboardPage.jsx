import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSalesReport } from "../../services/reportService";

function AdminDashboardPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const response = await getSalesReport();
      setReport(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mengambil laporan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return <section className="admin-page-card">Loading dashboard...</section>;
  }

  const summary = report?.summary || {};
  const recentOrders = report?.recent_orders || [];
  const topProducts = report?.top_products || [];

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <p className="admin-subtitle">Ringkasan laporan penjualan toko</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p>Total Pendapatan</p>
          <h2>
            Rp {Number(summary.total_revenue || 0).toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="dashboard-card">
          <p>Total Order</p>
          <h2>{summary.total_orders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <p>Produk Terjual</p>
          <h2>{summary.total_items_sold || 0}</h2>
        </div>
      </div>

      <section className="admin-page-card">
        <h2>Laporan Penjualan Terbaru</h2>

        {recentOrders.length === 0 ? (
          <p>Belum ada data penjualan.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user?.name || "-"}</td>
                  <td>{order.status || "-"}</td>
                  <td>
                    Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}
                  </td>
                  <td>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-page-card top-product-section">
        <h2>Top Products</h2>

        {topProducts.length === 0 ? (
          <p>Belum ada data produk terjual.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Sold</th>
                <th>Total Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.total_sold}</td>
                  <td>
                    Rp{" "}
                    {Number(product.total_revenue || 0).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboardPage;
