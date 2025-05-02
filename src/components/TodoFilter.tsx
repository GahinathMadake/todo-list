
import { Button } from "@/components/ui/button";
import { FilterType } from "@/hooks/useTodos";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <div className="mt-10 flex justify-center gap-2 mb-6">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className={currentFilter === "all" ? "bg-primary" : ""}
      >
        All
      </Button>
      <Button
        variant={currentFilter === "pending" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("pending")}
        className={currentFilter === "pending" ? "bg-primary" : ""}
      >
        Pending
      </Button>
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
        className={currentFilter === "completed" ? "bg-primary" : ""}
      >
        Completed
      </Button>
    </div>
  );
};

export default TodoFilter;
