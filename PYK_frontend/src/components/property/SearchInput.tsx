import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchInput({ filters, setFilters }: any) {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  // Update filters when debouncedKeyword changes
  useEffect(() => {
    if (debouncedKeyword.trim() !== "") {
      setFilters({ ...filters, keyword: debouncedKeyword });
    }
  }, [debouncedKeyword]);

  return (
    <div className="flex gap-2">
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-4 w-[90%] bg-gray-50">
        <Search className="h-4 w-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by Developer / Compound / Location / Keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
