import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import LeadHeader from "../components/LeadHeader";
import LeadTable from "../components/LeadTable";
import LeadDetailModal from "../components/LeadDetailModal";
import {
  getLeads,
  updateLead,
  convertLead,
  deleteLead,
} from "../api/leadApi";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadLeads();
  }, [statusFilter]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const data = await getLeads(statusFilter);
      setLeads(data?.leads || []);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load leads.");
    } finally {
      setLoading(false);
    }
  };

  const newCount = useMemo(
    () => leads.filter((l) => l.status === "New").length,
    [leads]
  );

  const handleView = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (id, payload) => {
    setSaving(true);
    try {
      const data = await updateLead(id, payload);
      setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)));
      setSelectedLead(data.lead);
    } finally {
      setSaving(false);
    }
  };

  const handleConvert = async (id, payload) => {
    setSaving(true);
    try {
      const data = await convertLead(id, payload);
      setLeads((prev) => prev.map((l) => (l._id === id ? data.lead : l)));
      setModalOpen(false);
      setSelectedLead(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete the lead from "${lead.fullName}"?`)) return;
    await deleteLead(lead._id);
    setLeads((prev) => prev.filter((l) => l._id !== lead._id));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <LeadHeader
          total={leads.length}
          newCount={newCount}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <LeadTable
          leads={leads}
          loading={loading}
          loadError={loadError}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      <LeadDetailModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
        onUpdateStatus={handleUpdateStatus}
        onConvert={handleConvert}
        saving={saving}
      />
    </Layout>
  );
}
