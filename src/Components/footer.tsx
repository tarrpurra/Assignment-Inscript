import { useState } from "react";

export default function Footer() {
  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="w-full border border-gray-50 bg-white px-4 py-2">
      <div className="flex items-center space-x-4 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              console.log(`Tab clicked: ${tab}`);
            }}
            className={`relative px-3 py-1 transition-all duration-200 ${
              activeTab === tab
                ? "text-green-800 font-semibold bg-green-50 rounded"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-green-800 rounded-full"></span>
            )}
          </button>
        ))}

        {/* Add Tab Button */}
        <button
          className="text-xl text-gray-500 hover:text-black"
          onClick={() => console.log("Add Tab (+) button clicked")}
        >
          +
        </button>
      </div>
    </div>
  );
}
