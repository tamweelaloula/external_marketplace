"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleDetails from "./VehicleDetails";
import { useTranslation } from "@/i18n";

function wrapWithParagraphs(text?: string): React.JSX.Element[] {
  if (!text || typeof text !== "string") return [<p key="0"></p>];
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((line, i) => <p key={i}>{line.trim()}</p>);
}

export default function ProductTabs({ data }: { data: any }) {
  const { translate, language } = useTranslation();
  return (
    <div className="w-full mx-auto py-6 md:py-8">
      <Tabs defaultValue="product" className="w-full">
        {/* Tab Headers */}
        <TabsList
          className="
            w-full flex gap-2 md:gap-4 
            justify-start rtl:justify-end   /* flip alignment when RTL */
            overflow-x-auto whitespace-nowrap 
            bg-white
            scrollbar-hide
          "
        >
          <TabsTrigger
            value="product"
            className="
              relative px-3 md:px-4 pt-2 pb-4 text-sm md:text-base font-medium text-gray-700
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:after:bottom-[-2px]
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:start-0   /* works with RTL */
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            {translate("TABS.PRODUCT")}
          </TabsTrigger>

          <TabsTrigger
            value="installment"
            className="
              relative px-3 md:px-4 pt-2 pb-4 text-sm md:text-base font-medium text-gray-700 
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:start-0 
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            {translate("TABS.INSTALLMENT")}
          </TabsTrigger>

          <TabsTrigger
            value="terms"
            className="
              relative px-3 md:px-4 pt-2 pb-4 text-sm md:text-base font-medium text-gray-700 
              rounded-none shadow-none whitespace-nowrap
              data-[state=active]:bg-transparent 
              data-[state=active]:shadow-none 
              data-[state=active]:rounded-none 
              data-[state=active]:text-yellow-500 
              data-[state=active]:after:content-[''] 
              data-[state=active]:after:absolute 
              data-[state=active]:after:start-0 
              data-[state=active]:after:bottom-0 
              data-[state=active]:after:h-[2px] 
              data-[state=active]:after:w-full 
              data-[state=active]:after:bg-yellow-500
            "
          >
            {translate("TABS.TERMS")}
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent
          value="product"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4 rtl:text-right"
        >
          <VehicleDetails data={data?.vehicle} description={data?.[`description_${language.code}`]}/>
        </TabsContent>

        <TabsContent
          value="installment"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4 rtl:text-right"
        >
          {wrapWithParagraphs(data ? data?.[`installment_details_${language.code}`] : "")}
        </TabsContent>

        <TabsContent
          value="terms"
          className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4 rtl:text-right"
        >
          {wrapWithParagraphs(data ? data?.[`terms_conditions_${language.code}`] : "")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
