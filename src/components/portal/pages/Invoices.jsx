import { useEffect, useState } from "react";
import { Receipt, Loader2, AlertCircle } from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatusBadge from "../components/StatusBadge";
import { getMyInvoices } from "../api/invoiceApi";

export default function PortalInvoices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMyInvoices();
        if (data?.success) setInvoices(data.invoices);
      } catch (err) {
        setError(err.response?.data?.message || "Invoices load nahi ho sakin.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <Loader2 className="mr-3 animate-spin" size={22} />
          Loading invoices...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="mb-6 flex items-center gap-3">
        <Receipt className="text-cyan-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Invoices</h2>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#111827] py-16 text-center text-slate-500">
          Abhi tak koi invoice nahi hai.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/60 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Invoice #</th>
                <th className="px-5 py-3">Booking</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv._id} className="text-slate-300">
                  <td className="px-5 py-4 font-medium text-white">{inv.invoiceNumber}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {inv.booking?.bookingNumber || "—"}
                  </td>
                  <td className="px-5 py-4">${inv.totalAmount?.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={inv.paymentStatus} />
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalLayout>
  );
}