import { FolderIcon, FileIcon, EditIcon, TrashIcon } from "../common/Icon";
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
  if (!item) return null;

  return (
    <div
      onClick={() => {
        if (item.type === "file") {
          onEdit?.(item.id);
        }
      }}
      className="
        bg-white dark:bg-gray-900/60
        rounded-lg
        border border-gray-200 dark:border-gray-700
        p-4
        hover:shadow-lg
        transition-all
        group
        cursor-pointer
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {item.type === "folder" ? (
            <FolderIcon size={40} className="text-blue-500 shrink-0" />
          ) : (
            <FileIcon size={40} className="text-gray-500 shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-white truncate">
              {item.name}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {new Date(item.updatedAt).toLocaleDateString()}
            </div>

            {item.type === "file" && item.content && (
              <div className="mt-2 text-xs text-gray-400 line-clamp-2">
                {item.content.slice(0, 120)}...
              </div>
            )}

            {item.type === "file" && !item.content && (
              <div className="mt-2 text-xs text-gray-400 italic">
                Empty file — click to edit
              </div>
            )}

            {item.type === "folder" && (
              <div className="mt-1 text-xs text-gray-400">
                {item.childrenIds?.length || 0} items
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename(item.id);
            }}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <EditIcon size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900 rounded"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </div>

      {item.type === "file" && (
        <div className="mt-3 text-xs text-blue-500">
          Click anywhere to to see full content and edit
        </div>
      )}
    </div>
  );
};

export default FileItem;
