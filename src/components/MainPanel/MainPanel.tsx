import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteItem,
  setEditingFile,
} from "../../features/fileSystem/fileSystemSlice";
import FileItem from "./FileItem";
import CreateMenu from "./CreateMenu";
import CreateItemModal from "../Modals/CreateItemModal";
import RenameModal from "../Modals/RenameModal";
import TextEditorModal from "../Modals/TextEditorModal";
import { FolderIcon, FileIcon, PlusIcon } from "../common/Icon";

const MainPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedFolderId = useAppSelector(
    (state) => state.fileSystem.folderState.selectedFolderId,
  );
  const items = useAppSelector((state) => state.fileSystem.items);
  const editingFileId = useAppSelector(
    (state) => state.fileSystem.folderState.editingFileId,
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<"folder" | "file">("folder");
  const [renameItemId, setRenameItemId] = useState<string | null>(null);
  const selectedFolder = selectedFolderId ? items[selectedFolderId] : null;

  const contents = selectedFolder
    ? selectedFolder.childrenIds
        .map((id) => items[id])
        .filter((item) => item !== undefined)
    : [];

  const handleDelete = (id: string) => {
    if (confirm("Delete this item? This cannot be undone.")) {
      dispatch(deleteItem({ id }));
    }
  };

  // Count folders and files separately
  const folderCount = contents.filter((item) => item.type === "folder").length;
  const fileCount = contents.filter((item) => item.type === "file").length;

  return (
    <div className="flex-1 flex flex-col bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-2 sticky top-0 z-10">
        <div className="md:ml-0 ml-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 md:block hidden bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FolderIcon
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <div className="flex items-center md:space-x-2 space-x-0.5">
              <h2 className="md:text-lg text-sm font-bold text-gray-900 dark:text-white">
                {selectedFolder?.name || "Welcome"}
              </h2>
              {selectedFolder && (
                <div className="flex gap-3 mt-0.5">
                  <p className="text-xs md:text-sm text-gray-500">
                    📁 {folderCount} folder{folderCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    📄 {fileCount} file{fileCount !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>

          {selectedFolder && (
            <CreateMenu
              onNewFolder={() => {
                setCreateType("folder");
                setShowCreateModal(true);
              }}
              onNewFile={() => {
                setCreateType("file");
                setShowCreateModal(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!selectedFolder ? (
          // No folder selected - Welcome State
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FolderIcon size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to File Explorer
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Select a folder from the sidebar to view and manage your files
              </p>
              <div className="flex flex-col gap-3 text-sm text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                  <span>Features</span>
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    📁 Create folders
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    📄 Create files
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    ✏️ Edit content
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    🗑️ Delete items
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : contents.length === 0 ? (
          // Empty folder state
          <div className="h-screen flex items-center justify-center p-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                <FolderIcon
                  size={56}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                This folder is empty
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                "{selectedFolder?.name}" doesn't have any files or folders yet
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setCreateType("folder");
                    setShowCreateModal(true);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <PlusIcon size={18} />
                  Create Folder
                </button>
                <button
                  onClick={() => {
                    setCreateType("file");
                    setShowCreateModal(true);
                  }}
                  className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <FileIcon size={18} />
                  Create File
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Tip: Click the + button in the top right to create items
              </p>
            </div>
          </div>
        ) : (
          // Content view - Grid layout
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {contents.map((item) => {
                if (!item || !item.id) {
                  console.error("Invalid item found:", item);
                  return null;
                }
                return (
                  <FileItem
                    key={item.id}
                    item={item}
                    onRename={setRenameItemId}
                    onDelete={handleDelete}
                    onEdit={(id) => dispatch(setEditingFile(id))}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && selectedFolder && (
        <CreateItemModal
          parentId={selectedFolder.id}
          type={createType}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {renameItemId && (
        <RenameModal
          itemId={renameItemId}
          onClose={() => setRenameItemId(null)}
        />
      )}

      {editingFileId && (
        <TextEditorModal
          fileId={editingFileId}
          onClose={() => dispatch(setEditingFile(null))}
        />
      )}
    </div>
  );
};

export default MainPanel;
