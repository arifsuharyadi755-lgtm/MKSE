import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RepairEstimator from "./components/RepairEstimator";
import RepairTracker from "./components/RepairTracker";
import MaintenanceTips from "./components/MaintenanceTips";
import PCBuilder from "./components/PCBuilder";
import ProductCatalog from "./components/ProductCatalog";
import Testimonials from "./components/Testimonials";
import ServiceArea from "./components/ServiceArea";
import Footer from "./components/Footer";
import WhatsAppFAB from "./components/WhatsAppFAB";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("estimator");

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white">
      
      {/* 1. Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 2. Hero Landing Page Banner */}
      <Hero 
        onExploreServices={() => {
          const el = document.getElementById("estimator");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />

      {/* 3. Dynamic Interactive Estimator Section */}
      <div id="estimator">
        <RepairEstimator />
      </div>

      {/* 3.5. Repair Tracking System Section */}
      <div id="tracking">
        <RepairTracker />
      </div>

      {/* 3.8. Maintenance Tips Section */}
      <MaintenanceTips />

      {/* 4. Product Catalog Marketplace */}
      <div id="catalog">
        <ProductCatalog />
      </div>

      {/* 5. PC Custom Builder Section */}
      <div id="builder">
        <PCBuilder />
      </div>

      {/* 5.5. Customer Testimonials Carousel Section */}
      <Testimonials />

      {/* 5.8. Service Area and Store Location Map */}
      <div id="service-area">
        <ServiceArea />
      </div>

      {/* 6. Store Location and Schedule Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB />

    </div>
  );
}
