import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuoteModal from "../components/QuoteModal";
import ScrollToTop from "../components/ScrollToTop";

export default function WebsiteLayout() {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Outlet />

      <Footer />
      <QuoteModal />
    </>
  );
}