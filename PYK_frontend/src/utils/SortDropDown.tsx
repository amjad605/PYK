'use client';

import { BiSortAlt2 } from 'react-icons/bi';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import SortPopoverContent, { type SortOption } from './SortPopoverContent';


type Props = {
    options: SortOption[];
    currentSort: { key: string; direction: 'asc' | 'desc' };
    onSortChange: (key: string, direction: 'asc' | 'desc') => void;
};

export default function SortDropdown({
    options,
    currentSort,
    onSortChange,
}: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                    <BiSortAlt2 />
                    sort
                </button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-56 p-2">
                <SortPopoverContent
                    options={options}
                    currentSort={currentSort}
                    onSortChange={onSortChange}
                />
            </PopoverContent>
        </Popover>
    );
}
