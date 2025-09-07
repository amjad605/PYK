"use client";

import { FC } from "react";
import { Clock } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ContractDurationDropdownProps {
  value: string | null;
  setValue: (val: string | null) => void;
}

export const ContractDurationDropdown: FC<ContractDurationDropdownProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Clock className="h-3.5 w-3.5 mr-1" />
        CONTRACT DURATION
      </p>
      <Select value={value || ""} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 h-auto py-7.5">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="6-months">6 Months</SelectItem>
          <SelectItem value="1-year">1 Year</SelectItem>
          <SelectItem value="2-years">2 Years</SelectItem>
          <SelectItem value="flexible">Flexible</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
