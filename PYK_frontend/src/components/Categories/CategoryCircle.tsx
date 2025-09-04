import type { LucideIcon } from "lucide-react";

interface PropertyCategory {
  name: string;
  icon: LucideIcon;
  count: string;
}
interface Categories {
  category: PropertyCategory;

  index: number;
}

const CategoryCircle = ({ category, index }: Categories) => {
  const Icon = category.icon;

  return (
    <div
      key={index}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="bg-white border-gray-300 border-[0.1px] rounded-full w-24 h-24 mb-4 flex items-center justify-center  group-hover:scale-105  group-hover:bg-primary transition-all duration-300 ease-in-out">
        <Icon className="h-8 w-8 text-black" strokeWidth={0.9} />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors ease-in-out duration-300">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500  group-hover:text-primary transition-colors ease-in-out duration-300 ">
        {category.count}
      </p>
    </div>
  );
};

export default CategoryCircle;
