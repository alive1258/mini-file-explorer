import React from "react";
import { FileText, Folder, Edit, Trash2 } from "../common/Icon";
import type { FileSystemItem } from "../../features/fileSystem/fileSystemTypes";

interface FileItemProps {
  item: FileSystemItem;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({
  item,
  onRename,
  onDelete,
  onEdit,
}) => {
  const handleDoubleClick = () => {
    if (item.type === "file" && onEdit) {
      onEdit(item.id);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {item.type === "folder" ? (
            <Folder size={40} className="text-blue-500 shrink-0" />
          ) : (
            <FileText
              size={40}
              className="text-gray-500 dark:text-gray-400 shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div
              className={`font-medium text-gray-900 dark:text-white truncate ${
                item.type === "file"
                  ? "hover:text-blue-600 dark:hover:text-blue-400"
                  : ""
              }`}
              title={item.name}
            >
              {item.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(item.updatedAt).toLocaleDateString()}
            </div>
            {item.type === "file" && item.content && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                {item.content.substring(0, 50)}...
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename(item.id);
            }}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Rename"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
