import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { registerCustomerRequest } from "../api/authApi";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
};

export default function PortalSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password, phone, address, city } = form;
    if (!fullName || !email || !password || !phone || !address || !city) {
      setError("Sitare (*) wale fields zaroori hain.");
      return;
    }
    if (password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerCustomerRequest(form);

      if (data?.success) {
        localStorage.setItem("portalToken", data.token);
        localStorage.setItem("portalUser", JSON.stringify(data.user));
        navigate("/portal/dashboard");
      } else {
        setError(data?.message || "Sign up failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 py-3 px-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500";
  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Pro Master
          </h1>
          <p className="mt-2 text-slate-400">Create your customer account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-[#101828] p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>

            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={fieldClass}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className={labelClass}>Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={fieldClass}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className={labelClass}>Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={fieldClass}
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
            </div>

            <div>
              <label className={labelClass}>City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Toronto"
                autoComplete="address-level2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Address *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={fieldClass}
                placeholder="123 Main St"
                autoComplete="street-address"
              />
            </div>

            <div>
              <label className={labelClass}>Province</label>
              <input
                name="province"
                value={form.province}
                onChange={handleChange}
                className={fieldClass}
                placeholder="ON"
                autoComplete="address-level1"
              />
            </div>

            <div>
              <label className={labelClass}>Postal Code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className={fieldClass}
                placeholder="A1A 1A1"
                autoComplete="postal-code"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/portal/login" className="font-medium text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}