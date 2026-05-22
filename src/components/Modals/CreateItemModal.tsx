import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createItem } from "../../features/fileSystem/fileSystemSlice";
import { XIcon } from "../common/Icon";

interface CreateItemModalProps {
  parentId: string;
  type: "folder" | "file";
  onClose: () => void;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  parentId,
  type,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) {
      setError("Name is required");
      return;
    }

    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(trimmed)) {
      setError("Invalid characters in name");
      return;
    }

    let finalName = trimmed;

    if (type === "file" && !finalName.includes(".")) {
      finalName = `${finalName}.txt`;
    }

    dispatch(
      createItem({
        parentId,
        name: finalName,
        type,
        content,
      }),
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4">
      {/* MODAL */}
      <div className="w-full max-w-md sm:max-w-lg bg-[#0d0d0d] text-white rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black">
          <h2 className="text-sm sm:text-lg font-semibold">
            ➕ Create {type === "folder" ? "Folder" : "File"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-800 transition"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* NAME INPUT */}
          <div>
            <label className="text-xs text-gray-400">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              className="
                w-full mt-1
                px-3 py-2
                bg-[#111]
                border border-gray-700
                rounded-lg
                text-white text-sm
                outline-none
                focus:border-blue-500
                focus:ring-1 focus:ring-blue-500
              "
              placeholder={type === "folder" ? "My Folder" : "myfile.txt"}
              autoFocus
            />

            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>

          {/* FILE CONTENT */}
          {type === "file" && (
            <div>
              <label className="text-xs text-gray-400">
                Content (optional)
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="
                  w-full mt-1
                  px-3 py-2
                  bg-[#111]
                  border border-gray-700
                  rounded-lg
                  text-white text-sm font-mono
                  outline-none
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                  resize-none
                "
                placeholder="Write your file content..."
              />

              <p className="text-[10px] text-gray-500 mt-1">
                Supports multi-line text
              </p>
            </div>
          )}

          {/* ACTION BUTTON */}
          <button
            type="submit"
            className="
              w-full py-2.5
              bg-blue-600 hover:bg-blue-700
              rounded-lg
              text-sm font-medium
              transition
            "
          >
            Create {type === "folder" ? "Folder" : "File"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
