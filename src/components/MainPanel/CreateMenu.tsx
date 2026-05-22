import React, { useState, useRef, useEffect } from "react";
import { Plus, FolderPlus, FilePlus } from "../common/Icon";

interface CreateMenuProps {
  onNewFolder: () => void;
  onNewFile: () => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ onNewFolder, onNewFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus size={18} />
        <span>Create New</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20 animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => {
              onNewFolder();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
          >
            <FolderPlus size={18} />
            <span>New Folder</span>
          </button>
          <button
            onClick={() => {
              onNewFile();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
          >
            <FilePlus size={18} />
            <span>New Text File</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
