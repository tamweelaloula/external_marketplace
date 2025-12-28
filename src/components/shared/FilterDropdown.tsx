"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterDropdownProps = {
  onApply: (filters: {
    min_price: number;
    max_price: number;
    sort: string;
  }) => void;
};

export default function FilterDropdown({ onApply }: FilterDropdownProps) {
  const [range, setRange] = React.useState([100, 500000]);
  const [sort, setSort] = React.useState("newest");
  const { translate } = useTranslation();

  const handleApply = () => {
    onApply({
      min_price: range[0],
      max_price: range[1],
      sort,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-transparent text-black rounded-full mr-4 hover:none"
        >
          <ArrowDownUp /> {translate("TITLE.FILTER")}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-80 rounded-2xl shadow-lg p-4"
      >
        {/* Title */}
        <h2 className="text-center font-semibold text-lg border-b pb-2">
          {translate("TITLE.FILTER")}
        </h2>

        {/* Price Range */}
        <div className="space-y-4 mt-4">
          <Label className="font-semibold">
            {translate("TITLE.PRICE_RANGE")}
          </Label>
          <div className="flex items-center justify-between text-sm">
            <span className="shadow px-2 py-1 rounded bg-gray-100">
              {translate("TITLE.SAR")} {range[0]}
            </span>
            <span className="shadow px-2 py-1 rounded bg-gray-100">
              {translate("TITLE.SAR")} {range[1]}
            </span>
          </div>
          <Slider
            value={range}
            onValueChange={setRange}
            max={500000}
            min={100}
            step={50}
            className="
              [&_[role=slider]]:bg-[#F9C416] 
              [&_[role=slider]]:border-4 
              [&_[role=slider]]:border-white
              [&_[role=slider]]:h-7 
              [&_[role=slider]]:w-7
              [&_[role=slider]]:shadow-md
              [&_[data-orientation=horizontal]]:h-2
              [&_[data-orientation=horizontal]]:bg-gray-200
              [&_[data-orientation=horizontal]>.bg-primary]:bg-[#F9C416]
            "
          />
        </div>

        {/* Sort */}
        <div className="space-y-3 mt-6">
          <Label className="font-semibold">{translate("TITLE.SORT")}</Label>
          <RadioGroup value={sort} onValueChange={setSort}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="price_high" id="price_high" />
              <Label htmlFor="price_high">
                {translate("TITLE.PRICE_HIGH_TO_LOW")}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest">{translate("TITLE.NEWEST")}</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="price_low" id="price_low" />
              <Label htmlFor="price_low">
                {translate("TITLE.PRICE_LOW_TO_HIGH")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="rounded-full w-32 border-[#F9C416] text-black"
            onClick={() => {
              setRange([1000, 5000]);
              setSort("newest");
            }}
          >
            {translate("BUTTON.CANCEL")}
          </Button>
          <Button
            className="rounded-full w-32 bg-[#F9C416] text-black hover:bg-[#e6b314]"
            onClick={handleApply}
          >
            {translate("BUTTON.APPLY")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
