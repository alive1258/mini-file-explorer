import React, { useState, useEffect, useRef } from "react";
import { FileIcon, FolderIcon, PlusIcon } from "../common/Icon";

interface CreateMenuProps {
  onNewFolder: () => void;
  onNewFile: () => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ onNewFolder, onNewFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative md:text-base text-sm" ref={menuRef}>
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <PlusIcon size={18} />
        <span>Create New</span>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-lg shadow-xl py-1 z-50 animate-fadeIn">
          {/* NEW FOLDER */}
          <button
            onClick={() => {
              onNewFolder();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-800 transition flex items-center gap-2 text-white"
          >
            <FolderIcon size={18} />
            New Folder
          </button>

          {/* NEW FILE */}
          <button
            onClick={() => {
              onNewFile();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-800 transition flex items-center gap-2 text-white"
          >
            <FileIcon size={18} />
            New Text File
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
