import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import Layout from "../components/Layout";
import { getSurveys, getSurveyStats } from "../api/surveyApi";

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl px-5 py-4 flex items-center gap-3">
      <Icon className="text-cyan-400" />
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <h2 className="text-white text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const [surveysRes, statsRes] = await Promise.all([getSurveys(), getSurveyStats()]);
      setSurveys(surveysRes?.surveys || []);
      setStats(statsRes?.stats || null);
    } catch (error) {
      setLoadError(error?.response?.data?.message || "Could not load surveys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white">Satisfaction Surveys</h1>
          <p className="text-slate-400 mt-2">
            Post-service customer feedback, submitted through the customer portal.
          </p>
        </motion.div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="Total Surveys" value={stats.totalSurveys} icon={Star} />
            <StatCard label="Avg Overall" value={(stats.avgOverall || 0).toFixed(1)} icon={Star} />
            <StatCard label="Avg Quality" value={(stats.avgQuality || 0).toFixed(1)} icon={Star} />
            <StatCard label="Avg Punctuality" value={(stats.avgPunctuality || 0).toFixed(1)} icon={Star} />
            <StatCard label="Would Recommend" value={stats.recommendCount} icon={ThumbsUp} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-3xl border border-slate-800 shadow-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Survey Responses</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 text-slate-400">Customer</th>
                  <th className="text-left py-4 text-slate-400">Booking</th>
                  <th className="text-left py-4 text-slate-400">Overall</th>
                  <th className="text-left py-4 text-slate-400">Quality</th>
                  <th className="text-left py-4 text-slate-400">Would Recommend</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      Loading surveys...
                    </td>
                  </tr>
                )}
                {!loading && loadError && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-red-400">
                      {loadError}
                    </td>
                  </tr>
                )}
                {!loading && !loadError && surveys.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      No survey responses yet.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !loadError &&
                  surveys.map((s) => (
                    <tr key={s._id} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-4 text-white font-medium">{s.customer?.fullName || "—"}</td>
                      <td className="py-4 text-slate-400">{s.booking?.bookingNumber || "—"}</td>
                      <td className="py-4 text-slate-300">{s.ratings?.overall}/5</td>
                      <td className="py-4 text-slate-300">{s.ratings?.quality || "—"}/5</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            s.wouldRecommend
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {s.wouldRecommend ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
