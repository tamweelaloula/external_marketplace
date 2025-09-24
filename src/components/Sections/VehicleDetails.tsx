"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n";

export default function VehicleDetails() {
  const {translate} = useTranslation()
  const details = [
    { label: "Vehicle Manufacturer", value: "Toyota" },
    { label: "Vehicle Model", value: "Yaris" },
    { label: "Vehicle Model Type", value: "XL" },
    { label: "Vehicle Color", value: "Black" },
    { label: "Vehicle Condition", value: "User" },
    { label: "Vehicle Model Year", value: "2025" },
  ];

  return (
    <div className="w-full">
      {/* Title outside card */}
      <h2 className="text-xl font-semibold mb-4">{translate("TABS.VEHICLE_DETAILS")}</h2>

      {/* Card for details */}
      <Card className="w-full shadow-sm rounded-xl">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-28 w-full">
            {details.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-200 pb-1"
              >
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
