"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function FilterDropdown() {
  const [range, setRange] = React.useState([1000, 5000]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="bg-transparent text-black rounded-full mr-4 hover:none">
          <ArrowDownUp/> Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-80 rounded-2xl shadow-lg p-4"
      >
        {/* Title */}
        <h2 className="text-center font-semibold text-lg border-b pb-2">
          Filter
        </h2>

        {/* Price Range */}
        <div className="space-y-4 mt-4">
          <Label className="font-semibold">Price range</Label>
          <div className="flex items-center justify-between text-sm">
            <span className="shadow px-2 py-1 rounded bg-gray-100">
              SAR {range[0]}
            </span>
            <span className="shadow px-2 py-1 rounded bg-gray-100">
              SAR {range[1]}
            </span>
          </div>
          <Slider
            value={range}
            onValueChange={setRange}
            max={5000}
            min={1000}
            step={100}
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
          <Label className="font-semibold">Sort</Label>
          <div className="flex items-center gap-3">
            <Checkbox className="data-[state=checked]:bg-[#F9C416] data-[state=checked]:border-[#F9C416]" />
            <span className="text-sm">Price: High to low</span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox className="data-[state=checked]:bg-[#F9C416] data-[state=checked]:border-[#F9C416]" />
            <span className="text-sm">Newest</span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox className="data-[state=checked]:bg-[#F9C416] data-[state=checked]:border-[#F9C416]" />
            <span className="text-sm">Price: low to high</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="rounded-full w-32 border-[#F9C416] text-[#F9C416]"
          >
            Cancel
          </Button>
          <Button className="rounded-full w-32 bg-[#F9C416] text-white hover:bg-[#e6b314]">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
