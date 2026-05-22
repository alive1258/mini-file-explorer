import type { FileSystemItem } from "../features/fileSystem/fileSystemTypes";

export const getItemPath = (
  itemId: string,
  items: Record<string, FileSystemItem>,
): string[] => {
  const path: string[] = [];
  let currentId: string | null = itemId;

  while (currentId && items[currentId]) {
    path.unshift(items[currentId].name);
    currentId = items[currentId].parentId;
  }

  return path;
};

export const getFullPath = (
  itemId: string,
  items: Record<string, FileSystemItem>,
): string => {
  return "/" + getItemPath(itemId, items).join("/");
};

export const searchItems = (
  query: string,
  items: Record<string, FileSystemItem>,
): FileSystemItem[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(items).filter((item) =>
    item.name.toLowerCase().includes(lowerQuery),
  );
};

export const getFolderSize = (
  folderId: string,
  items: Record<string, FileSystemItem>,
): number => {
  const folder = items[folderId];
  if (!folder || folder.type !== "folder") return 0;

  let size = 0;
  folder.childrenIds.forEach((childId) => {
    const child = items[childId];
    if (child.type === "file") {
      size += child.content?.length || 0;
    } else {
      size += getFolderSize(childId, items);
    }
  });

  return size;
};

export const validateFileName = (name: string): boolean => {
  const invalidChars = /[<>:"/\\|?*]/g;
  return !invalidChars.test(name) && name.trim().length > 0;
};

export const generateUniqueName = (
  baseName: string,
  existingNames: string[],
): string => {
  let counter = 1;
  let newName = baseName;

  while (existingNames.includes(newName)) {
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, "");
    const ext = baseName.includes(".") ? "." + baseName.split(".").pop() : "";
    newName = `${nameWithoutExt} (${counter})${ext}`;
    counter++;
  }

  return newName;
};
