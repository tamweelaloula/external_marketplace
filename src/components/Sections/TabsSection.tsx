"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductTabs() {
  return (
    <div className="w-full mx-auto py-6 md:py-8">
      <Tabs defaultValue="product" className="w-full">
        {/* Tab Headers */}
        <TabsList
          className="
            w-full flex gap-2 md:gap-4 
            justify-start 
            overflow-x-auto whitespace-nowrap 
            bg-white
            scrollbar-hide
          "
        >
          <TabsTrigger
            value="product"
            className="
              relative px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:left-0 
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            Product Overview
          </TabsTrigger>

          <TabsTrigger
            value="installment"
            className="
              relative px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700 
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:left-0 
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            Installment Details
          </TabsTrigger>

          <TabsTrigger
            value="terms"
            className="
              relative px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700 
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:left-0 
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            Terms & Conditions
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent
          value="product"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4"
        >
          <p>Installment Details - School Fee Financing</p>
          <p>
            The annual tuition fee for Bright Future International School is AED
            24,000. Parents are required to pay an upfront down payment of AED
            4,000, while the remaining AED 20,000 can be conveniently paid in
            installments.
          </p>
          <p>
            The financed amount is spread across 12 equal monthly installments,
            with each installment averaging AED 1,800. The installment includes
            both the principal amount and a small profit/markup charge that
            gradually decreases over the repayment period.
          </p>
          <p>
            First installment is due on 1st October 2025, amounting to AED
            1,866.67, after which the balance reduces to AED 18,333.33.
          </p>
          <p>
            Each subsequent month, the installment decreases slightly as the
            profit portion reduces.
          </p>
          <p>
            By the final installment in September 2026, the parent pays AED
            1,666.67, clearing the balance in full.
          </p>
          <p>
            In total, the parent pays AED 25,070 over the 12 months, which
            covers the financed tuition plus a total markup of AED 1,070.
          </p>
          <p>
            This plan ensures parents can manage school expenses more flexibly
            without compromising their child’s education.
          </p>
        </TabsContent>

        <TabsContent
          value="installment"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4"
        >
          <p>
            The financed amount is spread across 12 equal monthly installments,
            with each installment averaging AED 1,800. The installment includes
            both the principal amount and a small profit/markup charge that
            gradually decreases over the repayment period.
          </p>
          <p>
            First installment is due on 1st October 2025, amounting to AED
            1,866.67, after which the balance reduces to AED 18,333.33.
          </p>
          <p>
            Each subsequent month, the installment decreases slightly as the
            profit portion reduces.
          </p>
          <p>
            By the final installment in September 2026, the parent pays AED
            1,666.67, clearing the balance in full.
          </p>
          <p>
            In total, the parent pays AED 25,070 over the 12 months, which
            covers the financed tuition plus a total markup of AED 1,070.
          </p>
          <p>
            This plan ensures parents can manage school expenses more flexibly
            without compromising their child’s education.
          </p>
        </TabsContent>

        <TabsContent
          value="terms"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4"
        >
          <p>
            Terms and conditions go here. You can place legal disclaimers,
            repayment policies, or other important information in this section.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
