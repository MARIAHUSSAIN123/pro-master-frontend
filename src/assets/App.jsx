import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { QuoteModalProvider } from "./context/QuoteModalContext";

// Website Layout
import WebsiteLayout from "./layouts/WebsiteLayout";

// Website Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ClientsPartners from "./pages/ClientsPartners";
import Contact from "./pages/Contact";

// Admin Pages
import Dashboard from "./admin/pages/Dashboard";
import Customers from "./admin/pages/Customers";
import Bookings from "./admin/pages/Bookings";
import Employees from "./admin/pages/Employees";
import Attendance from "./admin/pages/Attendance";
import Departments from "./admin/pages/Departments";
import ServicesAdmin from "./admin/pages/Services";
import Accounting from "./admin/pages/Accounting";
import Reports from "./admin/pages/Reports";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";
import Inventory from "./admin/pages/Inventory";
import Quotes from "./admin/pages/Quotes";

// Newly wired admin pages (Spec 3.2, 3.5, 3.7, 3.1, 3.8)
import Sites from "./admin/pages/Sites";
import Contracts from "./admin/pages/Contracts";
import Complaints from "./admin/pages/Complaints";
import ChecklistTemplates from "./admin/pages/ChecklistTemplates";
import Inspections from "./admin/pages/Inspections";
import Surveys from "./admin/pages/Surveys";
import AuditLogPage from "./admin/pages/AuditLogPage";
import Messages from "./admin/pages/Messages";
import Leads from "./admin/pages/Leads";

import ProtectedRoute from "./admin/components/ProtectedRoute";

// Customer Portal
import PortalLayout from "./layouts/PortalLayout";
import PortalLogin from "./pages/portal/PortalLogin";
import PortalSignup from "./pages/portal/PortalSignup";
import MyQuotes from "./pages/portal/MyQuotes";
import Cart from "./pages/portal/Cart";
import PaymentSuccess from "./pages/portal/PaymentSuccess";
import ProtectedCustomerRoute from "./components/portal/ProtectedCustomerRoute";

export default function App() {
  return (
    <QuoteModalProvider>
      <LanguageProvider>
        <BrowserRouter>

          <Routes>

            {/* Website */}

            <Route element={<WebsiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/clients" element={<ClientsPartners />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin */}

            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/employees"
              element={
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute>
                  <Departments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <ServicesAdmin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/accounting"
              element={
                <ProtectedRoute>
                  <Accounting />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Was built but never wired to a route */}
            <Route
              path="/admin/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/quotes"
              element={
                <ProtectedRoute>
                  <Quotes />
                </ProtectedRoute>
              }
            />

            {/* Newly built pages for previously backend-only modules */}
            <Route
              path="/admin/sites"
              element={
                <ProtectedRoute>
                  <Sites />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/contracts"
              element={
                <ProtectedRoute>
                  <Contracts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/complaints"
              element={
                <ProtectedRoute>
                  <Complaints />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/checklist-templates"
              element={
                <ProtectedRoute>
                  <ChecklistTemplates />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/inspections"
              element={
                <ProtectedRoute>
                  <Inspections />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/surveys"
              element={
                <ProtectedRoute>
                  <Surveys />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/audit-log"
              element={
                <ProtectedRoute>
                  <AuditLogPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <Leads />
                </ProtectedRoute>
              }
            />

            {/* Customer Portal (Spec 3.2 — customer self-service) */}

            <Route path="/portal/login" element={<PortalLogin />} />
            <Route path="/portal/signup" element={<PortalSignup />} />

            <Route
              element={
                <ProtectedCustomerRoute>
                  <PortalLayout />
                </ProtectedCustomerRoute>
              }
            >
              <Route path="/portal/quotes" element={<MyQuotes />} />
              <Route path="/portal/cart" element={<Cart />} />
            </Route>

            {/* Outside PortalLayout (no nav needed on this transitional page) */}
            <Route
              path="/portal/payment-success"
              element={
                <ProtectedCustomerRoute>
                  <PaymentSuccess />
                </ProtectedCustomerRoute>
              }
            />

          </Routes>

        </BrowserRouter>
      </LanguageProvider>
    </QuoteModalProvider>
  );
}
