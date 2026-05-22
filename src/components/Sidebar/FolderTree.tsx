import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  toggleFolder,
  selectFolder,
} from "../../features/fileSystem/fileSystemSlice";

import { ChevronRight, ChevronDown, Folder } from "../common/Icon";

interface FolderTreeProps {
  folderId: string;
  level: number;
  isCollapsed?: boolean;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  folderId,
  level,
  isCollapsed = false,
}) => {
  const dispatch = useAppDispatch();

  // Get all items from redux store
  const items = useAppSelector((state) => state.fileSystem.items);

  // Current folder
  const folder = items[folderId];

  // Expanded state
  const isExpanded = useAppSelector(
    (state) => state.fileSystem.folderState.expandedFolders[folderId],
  );

  // Selected folder
  const selectedFolderId = useAppSelector(
    (state) => state.fileSystem.folderState.selectedFolderId,
  );

  // Safety check
  if (!folder || folder.type !== "folder") {
    return null;
  }

  // Toggle folder open/close
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isCollapsed) {
      dispatch(toggleFolder(folderId));
    }
  };

  // Select folder
  const handleSelect = () => {
    dispatch(selectFolder(folderId));
  };

  // Collapsed sidebar mode
  if (isCollapsed) {
    return (
      <div
        className={`flex justify-center p-2 rounded cursor-pointer hover:bg-gray-800 mb-1 transition-colors ${
          selectedFolderId === folderId ? "bg-gray-800" : ""
        }`}
        onClick={handleSelect}
        title={folder.name}
      >
        <Folder size={20} />
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* Folder Row */}
      <div
        className={`flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-gray-800 transition-colors ${
          selectedFolderId === folderId ? "bg-gray-800" : ""
        }`}
        style={{
          paddingLeft: `${level * 12 + 8}px`,
        }}
        onClick={handleSelect}
      >
        {/* Expand / Collapse Button */}
        <button
          onClick={handleToggle}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Folder Icon */}
        <Folder size={18} />

        {/* Folder Name */}
        <span className="text-sm truncate flex-1">{folder.name}</span>

        {/* Child Count */}
        <span className="text-xs text-gray-500">
          {folder.childrenIds.length}
        </span>
      </div>

      {/* Child Folders */}
      {isExpanded && (
        <div>
          {folder.childrenIds.map((childId) => {
            const child = items[childId];

            if (child?.type === "folder") {
              return (
                <FolderTree
                  key={childId}
                  folderId={childId}
                  level={level + 1}
                  isCollapsed={isCollapsed}
                />
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
