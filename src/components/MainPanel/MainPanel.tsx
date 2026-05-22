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
import { FolderIcon } from "../common/Icon";

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

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 p-2.5 flex justify-between items-center">
        <div className="md:ml-0 ml-10 flex items-center gap-2">
          <FolderIcon size={24} className="text-blue-500" />
          <div className="flex space-x-2 items-center">
            <h2 className="md:text-xl text-lg font-semibold text-gray-900 dark:text-white">
              {selectedFolder?.name || "No Folder Selected"}
            </h2>
            {selectedFolder && (
              <p className="text-sm text-gray-500">
                {contents.length} item{contents.length !== 1 ? "s" : ""}
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
          <div className="text-center text-gray-500 mt-20">
            <FolderIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>Select a folder from the sidebar</p>
          </div>
        ) : contents.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <FolderIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>This folder is empty</p>
            <p className="text-sm mt-2">Click + to create files or folders</p>
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-4">
            {contents.map((item) => {
              // Extra safety check
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
