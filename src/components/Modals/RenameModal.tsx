import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { renameItem } from "../../features/fileSystem/fileSystemSlice";
import { XIcon } from "../common/Icon";

const RenameModal: React.FC<{ itemId: string; onClose: () => void }> = ({
  itemId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.fileSystem.items[itemId]);
  const [name, setName] = useState(item?.name || "");

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900/60 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rename</h2>
          <button onClick={onClose}>
            <XIcon size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim())
              dispatch(renameItem({ id: itemId, newName: name }));
            onClose();
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Rename
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenameModal;
