import { useState, useEffect, useRef } from "react";

import panel from "../assets/Panel.png";
import more from "../assets/More.png";
import search from "../assets/search.png";
import Notification from "../assets/Notification.png";
import Profile from "../assets/Profile.png";

export default function UpperRibbon() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const email = "john.doe@example.com";

  // Close popups on outside click
  const profileRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfilePopup(false);
      }

      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMorePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-gray-50 bg-white shadow-sm relative">
      {/* LEFT SIDE: Breadcrumb */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <img src={panel} alt="Panel Icon" className="w-4 h-4" />
          <span className="text-[#AFAFAF] font-semibold">
            Workspace &gt; Folder 2 &gt;
          </span>
          <span className="font-semibold text-[#121212]">Spreadsheet 3</span>

          {/* MORE ICON */}
          <div ref={moreRef} className="relative">
            <img
              src={more}
              alt="Arrow Icon"
              onClick={() => {
                setShowMorePopup(!showMorePopup);
                console.log("Down arrow (more icon) clicked");
              }}
              className="w-4 h-4 ml-2 cursor-pointer"
            />
            {showMorePopup && (
              <div className="absolute left-0 top-6 mt-1 bg-white shadow-lg border border-gray-200 rounded-md z-20 w-40">
                <ul className="flex flex-col text-sm">
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t"
                    onClick={() => console.log("Go Home clicked")}
                  >
                    Go Home
                  </li>
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-b"
                    onClick={() => console.log("Add New File clicked")}
                  >
                    Add New File
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Search + Notification + Profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <img src={search} alt="Search" className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search within sheet"
            className="pl-10 pr-3 py-1 bg-gray-200 text-sm border-none rounded-lg h-10 font-semibold outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Notification */}
        <img
          src={Notification}
          alt="Notification"
          onClick={() => console.log("You got a Notification")}
          className="w-10 h-10 cursor-pointer"
        />

        {/* Profile Section */}
        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setShowProfilePopup(!showProfilePopup)}
          >
            <img
              src={Profile}
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black">John Doe</span>
              <span className="text-sm text-gray-500 truncate w-24">
                {email}
              </span>
            </div>
          </div>

          {/* Profile Popup */}
          {showProfilePopup && (
            <div className="absolute right-0 top-14 mt-2 w-64 bg-white border border-gray-200 shadow-md rounded-md z-20 p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={Profile}
                  alt="John Doe"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    John Doe
                  </div>
                  <div className="text-sm text-gray-500">{email}</div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full py-1 text-sm text-left text-blue-600 hover:underline"
                  onClick={() => console.log("Settings clicked")}
                >
                  Settings
                </button>
                <button
                  className="w-full py-1 text-sm text-left text-red-500 hover:underline"
                  onClick={() => console.log("Logout clicked")}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
