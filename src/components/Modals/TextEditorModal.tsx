/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateFileContent } from "../../features/fileSystem/fileSystemSlice";
import { XIcon } from "../common/Icon";

const TextEditorModal: React.FC<{ fileId: string; onClose: () => void }> = ({
  fileId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const file = useAppSelector((state) => state.fileSystem.items[fileId]);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (file?.content) {
      setContent(file.content);
    }
  }, [file]);

  if (!file) return null;

  const handleSave = () => {
    dispatch(updateFileContent({ id: fileId, content }));
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4">
      <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] flex flex-col bg-[#0d0d0d] text-white rounded-xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-800 bg-black sticky top-0">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-semibold truncate">
              {file.name}
            </h2>
            <p className="md:text-base text-sm text-gray-400">
              You also updated this content. You can edit and save it.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              w-full h-full
              p-3 sm:p-5
              bg-[#0d0d0d]
              text-gray-100
              font-mono text-xs sm:text-sm
              leading-5 sm:leading-6
              outline-none
              resize-none
              overflow-auto
            "
            placeholder="Start writing your file..."
            spellCheck={false}
            autoFocus
          />
        </div>

        {/* FOOTER */}
        <div className="flex gap-2 p-3 sm:p-4 border-t border-gray-800 bg-black sticky bottom-0">
          <button
            onClick={handleSave}
            className="
              flex-1 py-2
              bg-blue-600 hover:bg-blue-700
              rounded-lg
              text-xs sm:text-sm
              font-medium
              transition
            "
          >
            💾 Save
          </button>

          <button
            onClick={onClose}
            className="
              flex-1 py-2
              bg-gray-800 hover:bg-gray-700
              rounded-lg
              text-xs sm:text-sm
              font-medium
              transition
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditorModal;
