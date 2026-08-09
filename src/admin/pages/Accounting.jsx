import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";

import AccountingHeader from "../components/AccountingHeader";
import AccountingStats from "../components/AccountingStats";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceModal from "../components/InvoiceModal";
import DeleteInvoiceModal from "../components/DeleteInvoiceModal";
import PaymentsPanel from "../components/PaymentsPanel";

import {
  getInvoices,
  createInvoice,
  deleteInvoice,
  markInvoicePaid,
  getInvoiceStatistics,
  getInvoiceRevenue,
} from "../api/invoiceApi";
import { getPayments } from "../api/paymentApi";
import { getBookings } from "../api/bookingApi";

const PAGE_SIZE = 8;

export default function Accounting() {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const [invRes, statsRes, revRes, bookingsRes] = await Promise.all([
        getInvoices(),
        getInvoiceStatistics(),
        getInvoiceRevenue(),
        getBookings(),
      ]);
      setInvoices(invRes.invoices || []);
      setInvoiceStats(statsRes.statistics);
      setRevenue(revRes.totalRevenue || 0);
      setBookings(bookingsRes.bookings || []);
    } catch (err) {
      console.error("Failed to load accounting data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadPayments = async () => {
    setPaymentsLoading(true);
    try {
      const res = await getPayments();
      setPayments(res.payments || []);
    } catch (err) {
      console.error("Failed to load payments:", err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
    loadPayments();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        !search ||
        inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer?.fullName?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || inv.paymentStatus === status;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, status]);

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredInvoices.slice(start, start + PAGE_SIZE);
  }, [filteredInvoices, page]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // Bookings that don't already have an invoice
  const uninvoicedBookings = useMemo(() => {
    const invoicedBookingIds = new Set(invoices.map((inv) => inv.booking?._id || inv.booking));
    return bookings.filter((b) => !invoicedBookingIds.has(b._id));
  }, [bookings, invoices]);

  const handleCreateInvoice = async (form) => {
    setSaving(true);
    try {
      await createInvoice(form);
      setModalOpen(false);
      await Promise.all([loadInvoices(), loadPayments()]);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkPaid = async (invoice) => {
    try {
      await markInvoicePaid(invoice._id);
      await Promise.all([loadInvoices(), loadPayments()]);
    } catch (err) {
      alert(err?.response?.data?.message || "Could not mark invoice as paid.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteInvoice(deleteTarget._id);
      setDeleteTarget(null);
      await loadInvoices();
    } catch (err) {
      setDeleteError(err?.response?.data?.message || "Failed to delete invoice.");
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    const rows = [
      ["Invoice #", "Customer", "Due Date", "Subtotal", "Tax", "Discount", "Total", "Status"],
      ...filteredInvoices.map((inv) => [
        inv.invoiceNumber,
        inv.customer?.fullName || "",
        inv.dueDate ? new Date(inv.dueDate).toISOString().slice(0, 10) : "",
        inv.subtotal,
        inv.tax,
        inv.discount,
        inv.totalAmount,
        inv.paymentStatus,
      ]),
    ];
    const csv = rows.map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <AccountingHeader onCreateInvoice={() => setModalOpen(true)} />

        <AccountingStats revenue={revenue} invoiceStats={invoiceStats} />

        <InvoiceTable
          invoices={paginatedInvoices}
          loading={loading}
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onExport={handleExport}
          onMarkPaid={handleMarkPaid}
          onDelete={setDeleteTarget}
          page={page}
          pageSize={PAGE_SIZE}
          total={filteredInvoices.length}
          onPageChange={setPage}
        />

        <PaymentsPanel payments={payments} loading={paymentsLoading} />
      </div>

      <InvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleCreateInvoice}
        saving={saving}
        bookings={uninvoicedBookings}
      />

      <DeleteInvoiceModal
        open={!!deleteTarget}
        onClose={() => {
          setDeleteTarget(null);
          setDeleteError("");
        }}
        onDelete={handleDelete}
        invoiceLabel={deleteTarget?.invoiceNumber}
        deleting={deleting}
        error={deleteError}
      />
    </Layout>
  );
}
