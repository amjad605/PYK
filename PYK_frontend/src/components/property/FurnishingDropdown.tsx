"use client";

import { FC } from "react";
import { ChevronDown, Sofa, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FurnishingDropdownProps {
  value: string | null;
  setValue: (val: string | null) => void;
}

export const FurnishingDropdown: FC<FurnishingDropdownProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col">
      <Select value={value || ""} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-full justify-between rounded-xl border-gray-300 bg-gray-50 h-auto py-7">
          <SelectValue placeholder="Select Finishing" />
          {value ? (
            <X className="cursor-pointer  h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Core & Shell">Core & Shell</SelectItem>
          <SelectItem value="Semi-Finished">Semi-Finished"</SelectItem>
          <SelectItem value="Finished">Finished</SelectItem>
          <SelectItem value="Furnished">Furnished</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
