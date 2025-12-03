"use client";

import type { FC } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Finishing } from "@/types/property";

interface FurnishingDropdownProps {
  value: Finishing | null;
  setValue: (val: Finishing | null) => void;
}

export const FurnishingDropdown: FC<FurnishingDropdownProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col">
      <Select value={value || ""} onValueChange={(val) => setValue(val as Finishing)}>
        <SelectTrigger className="w-full shadow-none justify-between  transition rounded-xl border-gray-200 bg-gray-50 h-auto py-7 data-[placeholder]:font-medium data-[placeholder]:text-gray-400">
          <SelectValue placeholder="Select Finishing" />
          {value ? (
            <X className="cursor-pointer  h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Core-Shell">Core & Shell</SelectItem>
          <SelectItem value="Semi-Finished">Semi-Finished</SelectItem>
          <SelectItem value="Finished">Finished</SelectItem>
          <SelectItem value="Furnished">Furnished</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
