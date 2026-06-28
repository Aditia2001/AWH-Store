import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/productService";

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();
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

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        image: data.image || null,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast.success("Produk berhasil diupdate");
      } else {
        await createProduct(payload);
        toast.success("Produk berhasil dibuat");
      }

      reset();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menyimpan produk");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    reset();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success("Produk berhasil dihapus");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus produk");
    }
  };

  return (
    <div className="admin-page">
      <h1>Products</h1>
      <p className="admin-subtitle">Kelola data produk toko</p>

      <div className="admin-product-grid">
        <section className="admin-page-card">
          <h2>{editingProduct ? "Update Product" : "Create Product"}</h2>

          <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Nama Produk</label>
              <input
                type="text"
                placeholder="Nama produk"
                {...register("name", {
                  required: "Nama produk wajib diisi",
                })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                rows="4"
                placeholder="Deskripsi produk"
                {...register("description", {
                  required: "Deskripsi wajib diisi",
                })}
              />
              {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="form-group">
              <label>Harga</label>
              <input
                type="number"
                placeholder="Harga produk"
                {...register("price", {
                  required: "Harga wajib diisi",
                  min: {
                    value: 1,
                    message: "Harga minimal 1",
                  },
                })}
              />
              {errors.price && <span>{errors.price.message}</span>}
            </div>

            <div className="form-group">
              <label>Stok</label>
              <input
                type="number"
                placeholder="Stok produk"
                {...register("stock", {
                  required: "Stok wajib diisi",
                  min: {
                    value: 0,
                    message: "Stok minimal 0",
                  },
                })}
              />
              {errors.stock && <span>{errors.stock.message}</span>}
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="Opsional"
                {...register("image")}
              />
            </div>

            <button className="btn-primary full-width" disabled={isSubmitting}>
              {isSubmitting
                ? "Loading..."
                : editingProduct
                  ? "Update Product"
                  : "Create Product"}
            </button>

            {editingProduct && (
              <button
                type="button"
                className="btn-secondary full-width"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        <section className="admin-page-card">
          <h2>Product List</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>Belum ada produk.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>Rp {Number(product.price).toLocaleString("id-ID")}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn-small-edit"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-small-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminProductPage;
