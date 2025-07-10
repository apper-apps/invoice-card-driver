import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceGenerator from "@/components/pages/InvoiceGenerator";
import Layout from "@/components/organisms/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InvoiceGenerator />} />
        <Route path="/invoice" element={<InvoiceGenerator />} />
      </Routes>
    </Layout>
  );
}

export default App;