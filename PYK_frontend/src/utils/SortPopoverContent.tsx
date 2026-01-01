'use client';

export type SortDirection = 'asc' | 'desc';

export type SortOption = {
    key: string;
    label: string;
};
type Props = {
    options: SortOption[];
    currentSort: { key: string; direction: SortDirection };
    onSortChange: (key: string, direction: SortDirection) => void;
};

export default function SortPopoverContent({
    options,
    currentSort,
    onSortChange,
}: Props) {
    return (
        <div className="flex flex-col gap-1">
            {options.map((opt) => {
                const isActive = currentSort.key === opt.key;

                return (
                    <button
                        key={opt.key}
                        className={`flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-gray-100 ${isActive ? 'font-semibold text-primary' : ''
                            }`}
                        onClick={() =>
                            onSortChange(
                                opt.key,
                                isActive && currentSort.direction === 'asc'
                                    ? 'desc'
                                    : 'asc',
                            )
                        }
                    >
                        <span>{opt.label}</span>
                        {isActive && (
                            <span>
                                {currentSort.direction === 'asc' ? '↑' : '↓'}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
