import "./App.css";
import TableStructure from "./Components/Table_Structure.tsx";
import UpperRibbon from "./Components/upperribbon.tsx";
import ToolRibbon from "./Components/ToolRibbon.tsx";

import Footer from "./Components/footer.tsx";
import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import columnConfig from "./Components/columnConfig.tsx";
function App() {
  // Sorting state for React Table
  const [sorting, setSorting] = useState<SortingState>([]);

  // Handler to change sorting based on selected column
  const handleSortChange = (colId: string) => {
    setSorting((prev) => {
      if (prev.length === 0 || prev[0]?.id !== colId) {
        return [{ id: colId, desc: false }];
      } else if (!prev[0].desc) {
        return [{ id: colId, desc: true }];
      } else {
        return [];
      }
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Fixed ribbons at the top */}
      <div className="flex-shrink-0">
        <UpperRibbon />
        <ToolRibbon
          columns={columnConfig.map((col: { id: string; label: string }) => ({
            id: col.id,
            label: col.label,
          }))}
          sorting={sorting}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <TableStructure sorting={sorting} setSorting={setSorting} />
      </div>

      {/* Fixed footer at the bottom */}
      <div className="flex-shrink-0 bg-white shadow-sm border-t">
        <Footer />
      </div>
    </div>
  );
}

export default App;
