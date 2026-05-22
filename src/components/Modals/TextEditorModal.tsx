/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateFileContent } from "../../features/fileSystem/fileSystemSlice";
import { X, Save } from "../common/Icon";

interface TextEditorModalProps {
  fileId: string;
  onClose: () => void;
}

const TextEditorModal: React.FC<TextEditorModalProps> = ({
  fileId,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const file = useAppSelector((state) => state.fileSystem.items[fileId]);

  const [content, setContent] = useState(file?.content || "");

  const [isSaved, setIsSaved] = useState(false);

  // Keep content in sync if file changes
  useEffect(() => {
    setContent(file?.content || "");
  }, [file?.content]);

  // SAVE FUNCTION (stable)
  const handleSave = useCallback(() => {
    if (!file || file.type !== "file") return;

    dispatch(
      updateFileContent({
        id: fileId,
        content,
      }),
    );

    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }, [dispatch, file, fileId, content]);

  // KEYBOARD HANDLER (stable)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }

      if (e.key === "Escape") {
        onClose();
      }
    },
    [handleSave, onClose],
  );

  // EFFECT: attach keyboard listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!file || file.type !== "file") return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-4">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editing: {file.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Press Ctrl+S to save
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* EDITOR */}
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-100 p-4 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            placeholder="Enter file content..."
            autoFocus
          />
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            <span>{isSaved ? "Saved!" : "Save Changes"}</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditorModal;
