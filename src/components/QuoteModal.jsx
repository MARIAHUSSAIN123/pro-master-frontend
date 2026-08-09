import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useQuoteModal } from "../context/QuoteModalContext";
import { submitLead } from "../api/publicApi";
import bgVideo from "../assets/quote-bg.mp4";

const steps = ["intro", "name", "propertyType", "service", "phone", "email", "timing", "address", "done"];

const propertyTypes = ["Residential", "Commercial", "Industrial"];
const serviceOptions = [
  "Commercial Cleaning",
  "Residential Cleaning",
  "Office Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Industrial Cleaning",
  "Post Construction Cleanup",
  "Pressure Washing",
  "Sanitization & Disinfection",
];
const timingOptions = ["In the next 1-2 weeks", "In the next 2-4 weeks", "ASAP", "Just exploring options"];

export default function QuoteModal() {
  const { isOpen, closeQuote } = useQuoteModal();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    propertyType: "",
    service: "",
    phone: "",
    email: "",
    timing: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const step = steps[stepIndex];
  const progressSteps = steps.slice(1, -1);
  const currentDot = steps.indexOf(step) - 1;

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleClose = () => {
    closeQuote();
    // reset after the close animation finishes
    setTimeout(() => {
      setStepIndex(0);
      setError("");
      setForm({
        firstName: "", lastName: "", propertyType: "", service: "",
        phone: "", email: "", timing: "", address: "",
      });
    }, 300);
  };

  const validateAndNext = async () => {
    setError("");
    if (step === "name" && (!form.firstName || !form.lastName)) return setError("Please enter your full name.");
    if (step === "propertyType" && !form.propertyType) return setError("Please select a property type.");
    if (step === "service" && !form.service) return setError("Please select a service.");
    if (step === "phone" && !form.phone) return setError("Please enter a valid phone number.");
    if (step === "email" && !form.email) return setError("Please enter a valid email.");
    if (step === "timing" && !form.timing) return setError("Please select a timeframe.");
    if (step === "address" && !form.address) return setError("This field is required.");

    // Last question step — submit the lead to the backend before
    // showing the "done" screen, so the request actually reaches the
    // admin's Leads page instead of just resetting locally.
    if (step === "address") {
      setSubmitting(true);
      try {
        await submitLead({
          fullName: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          customerType: form.propertyType === "Residential" ? "Residential" : "Commercial",
          serviceInterest: form.service,
          address: form.address,
          message: `Preferred timing: ${form.timing}`,
        });
      } catch (err) {
        setSubmitting(false);
        return setError(
          err?.response?.data?.message ||
            "Something went wrong submitting your request. Please try again."
        );
      }
      setSubmitting(false);
    }

    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => {
    setError("");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <div className="text-center">
            <h1 className="font-display font-800 text-3xl md:text-4xl text-navy mb-3">
              Get Your Free Quote
            </h1>
            <p className="text-ink/60 mb-8">
              Answer a few quick questions and we'll get back to you fast.
            </p>
            <button
              onClick={() => setStepIndex(1)}
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-full font-bold uppercase tracking-wide text-sm hover:opacity-90 transition-opacity"
            >
              Start <ArrowRight size={16} />
            </button>
          </div>
        );

      case "name":
        return (
          <StepShell title="Name">
            <div className="grid grid-cols-2 gap-4">
              <input
                autoFocus
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="First Name"
                className="border border-mist rounded-lg px-4 py-3.5 focus:border-green outline-none"
              />
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="Last Name"
                className="border border-mist rounded-lg px-4 py-3.5 focus:border-green outline-none"
              />
            </div>
          </StepShell>
        );

      case "propertyType":
        return (
          <StepShell title="What type of property is this for?">
            <OptionList options={propertyTypes} selected={form.propertyType} onSelect={(v) => update("propertyType", v)} />
          </StepShell>
        );

      case "service":
        return (
          <StepShell title="Which service do you need?">
            <OptionList options={serviceOptions} selected={form.service} onSelect={(v) => update("service", v)} scrollable />
          </StepShell>
        );

      case "phone":
        return (
          <StepShell title="Phone Number">
            <input
              autoFocus
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(403) 458-0219"
              className="w-full border border-mist rounded-lg px-4 py-3.5 focus:border-green outline-none"
            />
          </StepShell>
        );

      case "email":
        return (
          <StepShell title="Email">
            <input
              autoFocus
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="example@example.com"
              className="w-full border border-mist rounded-lg px-4 py-3.5 focus:border-green outline-none"
            />
          </StepShell>
        );

      case "timing":
        return (
          <StepShell title="When are you looking to get this done?">
            <OptionList options={timingOptions} selected={form.timing} onSelect={(v) => update("timing", v)} />
          </StepShell>
        );

      case "address":
        return (
          <StepShell title="Address">
            <input
              autoFocus
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Street address, city"
              className="w-full border border-mist rounded-lg px-4 py-3.5 focus:border-green outline-none"
            />
          </StepShell>
        );

      case "done":
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-green flex items-center justify-center mx-auto mb-6"
            >
              <Check size={32} className="text-white" />
            </motion.div>
            <h2 className="font-display font-800 text-3xl text-navy mb-2">
              Thank You, {form.firstName}!
            </h2>
            <p className="text-ink/60 mb-8">
              Your quote request has been received. We'll be in touch shortly.
            </p>
            <button
              onClick={handleClose}
              className="inline-block bg-navy text-cream px-7 py-3 rounded-full font-semibold text-sm hover:bg-green transition-colors"
            >
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const isQuestionStep = step !== "intro" && step !== "done";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        >
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-navy/70 z-0 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="bg-cream rounded-2xl shadow-2xl p-8 md:p-10"
            >
              {renderStep()}

              {error && <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>}

              {isQuestionStep && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-mist">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-ink/60 hover:text-navy font-medium text-sm transition-colors"
                  >
                    <ArrowLeft size={16} /> Previous
                  </button>
                  <button
                    onClick={validateAndNext}
                    disabled={submitting}
                    className="flex items-center gap-1.5 bg-navy text-cream px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green transition-colors disabled:opacity-60"
                  >
                    {step === "address" ? (submitting ? "Submitting..." : "Submit") : "Next"} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>

            {isQuestionStep && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {progressSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentDot ? "w-6 bg-gold" : i < currentDot ? "w-2 bg-green" : "w-2 bg-cream/40"
                    }`}
                  />
                ))}
              </div>
            )}
            {isQuestionStep && (
              <p className="text-center text-cream/70 text-xs mt-2 font-mono">
                {currentDot + 1} of {progressSteps.length}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepShell({ title, children }) {
  return (
    <div>
      <h2 className="font-display font-700 text-2xl text-navy mb-6 text-center">{title}</h2>
      {children}
    </div>
  );
}

function OptionList({ options, selected, onSelect, scrollable }) {
  return (
    <div className={`space-y-3 ${scrollable ? "max-h-72 overflow-y-auto pr-1" : ""}`}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`w-full text-left border rounded-lg px-4 py-3.5 font-medium transition-colors duration-200 ${
            selected === opt
              ? "border-green bg-green/10 text-navy"
              : "border-mist hover:border-green/50 text-ink/80"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
