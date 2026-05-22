import React from "react";
import { useAppSelector } from "../../app/hooks";
import FolderTree from "./FolderTree";
import { FolderIcon, ChevronLeftIcon, ChevronRightIcon } from "../common/Icon";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  setMobileOpen,
}) => {
  const items = useAppSelector((state) => state.fileSystem.items);

  const rootFolders = Object.values(items).filter(
    (item) => item.parentId === null && item.type === "folder",
  );

  return (
    <aside
      className={`
        h-full bg-gray-900/60 text-white border-r border-gray-800
        flex flex-col overflow-hidden
        transition-all duration-300 ease-in-out
        w-72 md:w-auto
        ${collapsed ? "md:w-16" : "md:w-72"}
      `}
    >
      {/* HEADER */}
      <div className="p-3 border-b border-gray-800 bg-gray-900/60 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FolderIcon size={20} />
            <h1 className="text-sm font-semibold">Explorer</h1>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* MOBILE CLOSE */}
          <button
            className="md:hidden p-1 hover:bg-gray-800 rounded"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          {/* DESKTOP COLLAPSE */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-2 rounded hover:bg-gray-800 transition"
          >
            {collapsed ? (
              <ChevronRightIcon size={16} />
            ) : (
              <ChevronLeftIcon size={16} />
            )}
          </button>
        </div>
      </div>

      {/* TREE */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {rootFolders.length === 0
          ? !collapsed && (
              <div className="text-xs text-gray-500 text-center mt-10">
                No folders yet
              </div>
            )
          : rootFolders.map((folder) => (
              <FolderTree
                key={folder.id}
                folderId={folder.id}
                level={0}
                collapsed={collapsed}
                setMobileOpen={setMobileOpen} // ✅ IMPORTANT
              />
            ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
