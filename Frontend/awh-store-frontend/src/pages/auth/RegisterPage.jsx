import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register as registerService } from "../../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerService(data);

      toast.success("Register berhasil, silakan login");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Buat akun baru di AWH Store</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              placeholder="Masukkan nama"
              {...register("name", {
                required: "Nama wajib diisi",
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              {...register("email", {
                required: "Email wajib diisi",
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              {...register("role", {
                required: "Role wajib dipilih",
              })}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span>{errors.role.message}</span>}
          </div>

          <button className="btn-primary full-width" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
