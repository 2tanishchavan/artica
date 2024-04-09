import { Checkbox } from "@/components/ui/checkbox";
import { FilterCheckbox as FilterCheckboxProps } from "@/types/FilterCheckbox";

interface FilterCheckboxFormProps extends FilterCheckboxProps {
  checked: boolean;
  onCheckedChange: () => void;
  isLastItem?: boolean;
}

const FilterCheckbox = ({
  id,
  label,
  checked,
  onCheckedChange,
  isLastItem,
}: FilterCheckboxFormProps) => {
  return (
    <div
      className={`items-top flex space-x-2 ${
        isLastItem ? "col-span-2" : "col-span-1"
      }`}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default FilterCheckbox;
