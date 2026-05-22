import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteItem,
  setEditingFile,
} from "../../features/fileSystem/fileSystemSlice";
import FileItem from "./FileItem";
import CreateMenu from "./CreateMenu";
import RenameModal from "../Modals/RenameModal";
import CreateItemModal from "../Modals/CreateItemModal";
import TextEditorModal from "../Modals/TextEditorModal";
import { Folder } from "../common/Icon";

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
  const folderContents = selectedFolder
    ? selectedFolder.childrenIds.map((id) => items[id]).filter(Boolean)
    : [];

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? This action cannot be undone.",
      )
    ) {
      dispatch(deleteItem({ id }));
    }
  };

  const handleEditFile = (fileId: string) => {
    dispatch(setEditingFile(fileId));
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Folder size={24} className="text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedFolder?.name || "Select a folder"}
            </h2>
            {selectedFolder && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {folderContents.length} item
                {folderContents.length !== 1 ? "s" : ""}
              </p>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selectedFolder ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p>Select a folder from the sidebar to view its contents</p>
          </div>
        ) : folderContents.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p>This folder is empty</p>
            <p className="text-sm mt-2">
              Click the + button to create files or folders
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folderContents.map((item) => (
              <FileItem
                key={item.id}
                item={item}
                onRename={setRenameItemId}
                onDelete={handleDelete}
                onEdit={item.type === "file" ? handleEditFile : undefined}
              />
            ))}
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
