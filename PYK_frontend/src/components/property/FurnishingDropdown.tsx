"use client";

import { FC } from "react";
import { Sofa } from "lucide-react";
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
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Sofa className="h-3.5 w-3.5 mr-1" />
        FURNISHING
      </p>
      <Select value={value || ""} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 h-auto py-7.5">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="furnished">Furnished</SelectItem>
          <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
          <SelectItem value="unfurnished">Unfurnished</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
