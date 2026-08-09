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
import Leads from "./admin/pages/Leads";

// Newly wired admin pages (Spec 3.2, 3.5, 3.7, 3.1, 3.8)
import Sites from "./admin/pages/Sites";
import Contracts from "./admin/pages/Contracts";
import Complaints from "./admin/pages/Complaints";
import ChecklistTemplates from "./admin/pages/ChecklistTemplates";
import Inspections from "./admin/pages/Inspections";
import Surveys from "./admin/pages/Surveys";
import AuditLogPage from "./admin/pages/AuditLogPage";
import Messages from "./admin/pages/Messages";
import ProtectedRoute from "./admin/components/ProtectedRoute";

// Customer Portal Pages (fixed: these are components in /pages, not the api helpers)
import CustomerLogin from "./components/portal/pages/Login";
import CustomerDashboard from "./components/portal/pages/Dashboard";
import CustomerRegister from "./components/portal/pages/Signup";
import CustomerPaymentSuccess from "./components/portal/pages/PaymentSuccess";
import CustomerBookings from "./components/portal/pages/Bookings";
import CustomerQuotes from "./components/portal/pages/Quotes";
import CustomerInvoices from "./components/portal/pages/Invoices";

// Portal has its own auth guard (checks for "customer" role via
// portalToken), separate from the admin ProtectedRoute above.
import PortalProtectedRoute from "./components/portal/components/ProtectedRoute";

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
              <Route path="/portal/login" element={<CustomerLogin />} />
              <Route path="/portal/register" element={<CustomerRegister />} />

              <Route
                path="/portal/dashboard"
                element={
                  <PortalProtectedRoute>
                    <CustomerDashboard />
                  </PortalProtectedRoute>
                }
              />
              <Route
                path="/portal/bookings"
                element={
                  <PortalProtectedRoute>
                    <CustomerBookings />
                  </PortalProtectedRoute>
                }
              />
              <Route
                path="/portal/quotes"
                element={
                  <PortalProtectedRoute>
                    <CustomerQuotes />
                  </PortalProtectedRoute>
                }
              />
              <Route
                path="/portal/invoices"
                element={
                  <PortalProtectedRoute>
                    <CustomerInvoices />
                  </PortalProtectedRoute>
                }
              />
              <Route path="/portal/payment-success" element={<CustomerPaymentSuccess />} />
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
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <Leads />
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

          </Routes>

        </BrowserRouter>
      </LanguageProvider>
    </QuoteModalProvider>
  );
}