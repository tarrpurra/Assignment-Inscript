import React, { useState, useRef, useEffect } from "react";

import ArrowSplit from "../assets/Arrowsplit.png";
import Share from "../assets/share.png";
import upload from "../assets/Arrowupload.png";
import Download from "../assets/Download.png";
import toolbarIcon from "../assets/toolbar.png";
import hideIcon from "../assets/hide.png";
import sortIcon from "../assets/sort.png";
import filterIcon from "../assets/filter.png";
import cellIcon from "../assets/cell.png";

interface SortColumn {
  id: string;
  label: string;
}

interface ToolRibbonProps {
  columns: SortColumn[];
  sorting: { id: string; desc: boolean }[];
  onSortChange: (colId: string) => void;
}

const ToolRibbon: React.FC<ToolRibbonProps> = ({
  columns,
  sorting,
  onSortChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-gray-50 shadow-sm">
      {/* LEFT: Toolbar Buttons */}
      <div className="flex items-center space-x-4 text-sm text-gray-700 font-medium">
        {/* Tool bar */}
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-black"
          onClick={() => console.log("Tool bar clicked")}
        >
          <span>Tool bar</span>
          <img src={toolbarIcon} alt="arrow" className="w-3 h-3" />
        </div>

        {/* Divider */}
        <div className="text-gray-300 text-xl">|</div>

        {/* Hide Fields */}
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-black"
          onClick={() => console.log("Hide fields clicked")}
        >
          <img src={hideIcon} alt="Hide fields" className="w-4 h-4" />
          <span>Hide fields</span>
        </div>

        {/* Sort */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer hover:text-black"
            onClick={() => {
              setMenuOpen((open) => !open);
              console.log("Sort menu toggled");
            }}
          >
            <img src={sortIcon} alt="Sort" className="w-4 h-4" />
            <span>Sort</span>
          </div>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50"
            >
              {columns.map((col) => (
                <div
                  key={col.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    sorting[0]?.id === col.id ? "font-bold text-green-700" : ""
                  }`}
                  onClick={() => {
                    onSortChange(col.id);
                    setMenuOpen(false);
                    console.log(`Sort column selected: ${col.label}`);
                  }}
                >
                  <span>{col.label}</span>
                  {sorting[0]?.id === col.id && (
                    <span>{sorting[0].desc ? "↓" : "↑"}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter */}
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-black"
          onClick={() => console.log("Filter clicked")}
        >
          <img src={filterIcon} alt="Filter" className="w-4 h-4" />
          <span>Filter</span>
        </div>

        {/* Cell View */}
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-black"
          onClick={() => console.log("Cell view clicked")}
        >
          <img src={cellIcon} alt="Cell view" className="w-4 h-4" />
          <span>Cell view</span>
        </div>
      </div>

      {/* RIGHT: Import / Export / Share / Action */}
      <div className="flex items-center space-x-2">
        {/* Icon buttons with labels */}
        {[
          { icon: Download, label: "Import" },
          { icon: upload, label: "Export" },
          { icon: Share, label: "Share" },
        ].map((item, idx) => (
          <button
            key={idx}
            className="flex items-center space-x-2 px-3 py-1 border-1 border-gray-200 rounded hover:bg-gray-100"
            onClick={() => console.log(`${item.label} clicked`)}
          >
            <img src={item.icon} alt={item.label} className="w-4 h-4" />
            <span className="text-sm text-gray-700 font-medium">
              {item.label}
            </span>
          </button>
        ))}

        {/* Green Action Button with label */}
        <button
          className="flex items-center space-x-2 px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={() => console.log("New Action clicked")}
        >
          <img src={ArrowSplit} alt="New Action" className="w-4 h-4" />
          <span className="text-sm font-medium">New Action</span>
        </button>
      </div>
    </div>
  );
};

export default ToolRibbon;
