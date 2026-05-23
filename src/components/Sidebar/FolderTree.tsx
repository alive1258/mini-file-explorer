import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  toggleFolder,
  selectFolder,
} from "../../features/fileSystem/fileSystemSlice";
import { ChevronRightIcon, ChevronDownIcon, FolderIcon } from "../common/Icon";

interface FolderTreeProps {
  folderId: string;
  level: number;
  collapsed?: boolean;
  setMobileOpen?: (v: boolean) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  folderId,
  level,
  collapsed = false,
  setMobileOpen,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.fileSystem.items);

  const folder = items[folderId];

  const isExpanded = useAppSelector(
    (state) => state.fileSystem.folderState.expandedFolders[folderId],
  );

  const selectedFolderId = useAppSelector(
    (state) => state.fileSystem.folderState.selectedFolderId,
  );

  if (!folder || folder.type !== "folder") return null;

  const subfolders = folder.childrenIds
    .map((id) => items[id])
    .filter((child) => child && child.type === "folder");

  const isActive = selectedFolderId === folderId;

  return (
    <div>
      <div
        className={`
          flex items-center gap-2
          py-1.5 px-2
          rounded-md
          cursor-pointer
          transition
          hover:bg-gray-800
          ${isActive ? "bg-gray-800 text-blue-400" : "text-white"}
        `}
        style={{ paddingLeft: collapsed ? 8 : level * 14 + 8 }}
        onClick={() => {
          dispatch(selectFolder(folderId));

          setMobileOpen?.(false);
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFolder(folderId));
          }}
          className="p-1 rounded hover:bg-gray-700"
        >
          {subfolders.length > 0 ? (
            isExpanded ? (
              <ChevronDownIcon size={14} />
            ) : (
              <ChevronRightIcon size={14} />
            )
          ) : (
            <span className="w-3.5 inline-block" />
          )}
        </button>

        <FolderIcon size={18} />

        {!collapsed && (
          <>
            <span className="text-sm truncate flex-1">{folder.name}</span>

            {subfolders.length > 0 && (
              <span className="text-[10px] text-gray-500">
                {subfolders.length}
              </span>
            )}
          </>
        )}
      </div>

      {isExpanded && subfolders.length > 0 && !collapsed && (
        <div className="mt-1">
          {subfolders.map((child) => (
            <FolderTree
              key={child.id}
              folderId={child.id}
              level={level + 1}
              collapsed={collapsed}
              setMobileOpen={setMobileOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
