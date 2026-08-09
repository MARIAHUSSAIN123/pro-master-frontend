import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Send,
  Check,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { submitLead } from "../../api/publicApi";

const emptyForm = { fullName: "", email: "", phone: "", companyName: "", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.phone) {
      setError("Please fill in your name, email and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await submitLead({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        companyName: form.companyName,
        message: form.message,
      });
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong sending your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[5px] text-green font-semibold">
            {t("contactForm.tag")}
          </span>
          <h2 className="text-5xl font-black text-navy mt-4">
            {t("contactForm.heading")}
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-8">
            {t("contactForm.desc")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="bg-white rounded-[35px] shadow-2xl overflow-hidden grid lg:grid-cols-5"
        >

          <div className="lg:col-span-2 bg-navy text-white p-12 relative overflow-hidden">

            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-green/20 blur-[120px]" />

            <h3 className="text-3xl font-bold">
              {t("contactForm.whyTitle")}
            </h3>

            <p className="text-white/70 leading-8 mt-6">
              {t("contactForm.whyDesc")}
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center">✓</div>
                <p>{t("contactForm.benefit1")}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center">✓</div>
                <p>{t("contactForm.benefit2")}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center">✓</div>
                <p>{t("contactForm.benefit3")}</p>
              </div>

            </div>

          </div>

          <div className="lg:col-span-3 p-12">

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center mb-6">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Thank you!</h3>
                <p className="text-gray-500 max-w-sm">
                  Your message has been received. We'll be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-green font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-7">

              <div className="grid md:grid-cols-2 gap-6">

                <div className="relative">
                  <User className="absolute left-5 top-5 text-gray-400" size={20}/>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder={t("contactForm.namePh")}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-300 focus:border-green outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-5 top-5 text-gray-400" size={20}/>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder={t("contactForm.emailPh")}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-300 focus:border-green outline-none transition"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="relative">
                  <Phone className="absolute left-5 top-5 text-gray-400" size={20}/>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder={t("contactForm.phonePh")}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-300 focus:border-green outline-none transition"
                  />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-5 top-5 text-gray-400" size={20}/>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    placeholder={t("contactForm.companyPh")}
                    className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-300 focus:border-green outline-none transition"
                  />
                </div>

              </div>

              <div className="relative">
                <MessageSquare className="absolute left-5 top-5 text-gray-400" size={20} />
                <textarea
                  rows="6"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder={t("contactForm.messagePh")}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-300 focus:border-green outline-none resize-none transition"
                />
              </div>

              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="group bg-green hover:bg-green-light text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-xl disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? "Sending..." : t("contactForm.sendBtn")}
                <Send size={18} className="group-hover:translate-x-1 transition" />
              </button>

            </form>
            )}

          </div>

        </motion.div>

      </div>

    </section>
  );
}