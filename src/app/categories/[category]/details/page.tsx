"use client";

import { useRef, useState } from "react";
import ApplyOnlineForm from "@/components/Sections/AppliedOnlineForm";
import ProductDetail from "@/components/Sections/ProductViewSection";
import ProductTabs from "@/components/Sections/TabsSection";
import CustomCarousel from "@/components/shared/CustomCarousel";

export default function DetailPage() {
  const [show, setShow] = useState(false)
  const applyFormRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToForm = () => {
    setShow(true)
    applyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-32 space-y-16">
      {/* Product Details Section with button */}
      <ProductDetail onClick={handleScrollToForm} />

      {/* Tabs Section */}
      <ProductTabs />

      {/* Apply Online Section */}
      <div ref={applyFormRef}>
        {show && <ApplyOnlineForm />}
      </div>

      {/* Related Products Carousel */}
      <CustomCarousel title="RELATED_PRODUCT" />
    </div>
  );
}
