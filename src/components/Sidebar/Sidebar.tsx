import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  expandAllFolders,
  collapseAllFolders,
} from "../../features/fileSystem/fileSystemSlice";
import { ChevronDown, ChevronRight } from "../common/Icon";
import FolderTree from "./FolderTree";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.fileSystem.items);
  const rootItems = Object.values(items).filter(
    (item) => item.parentId === null,
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col border-r border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        {!isCollapsed && <h1 className="text-xl font-bold">File Explorer</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-2 border-b border-gray-700 flex gap-2">
          <button
            onClick={() => dispatch(expandAllFolders())}
            className="flex-1 px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={() => dispatch(collapseAllFolders())}
            className="flex-1 px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            Collapse All
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-2">
        {rootItems.map((item) => (
          <FolderTree
            key={item.id}
            folderId={item.id}
            level={0}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
