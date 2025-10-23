"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/i18n";

function wrapWithParagraphs(text?: string): React.JSX.Element[] {
  if (!text || typeof text !== "string") return [<p key="0"></p>];
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((line, i) => <p key={i}>{line.trim()}</p>);
}

export default function VehicleDetails({
  data,
  description,
}: {
  data: any;
  description: string;
}) {
  const { translate } = useTranslation();
  const details = [
    { label: "Vehicle Manufacturer", value: data?.manufacturer || "N/A" },
    { label: "Vehicle Model", value: data?.model || "N/A" },
    { label: "Vehicle Model Type", value: data?.model_type || "N/A" },
    { label: "Vehicle Color", value: data?.color || "N/A" },
    { label: "Vehicle Condition", value: data?.condition || "N/A" },
    { label: "Vehicle Model Year", value: data?.model_year || "N/A" },
  ];

  return (
    <div className="w-full">
      {/* Title outside card */}
      {description && (
        <div className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4 rtl:text-right">
          {description}
        </div>
      )}

      {data && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            {translate("TABS.VEHICLE_DETAILS")}
          </h2>

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
                    <span className="font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
