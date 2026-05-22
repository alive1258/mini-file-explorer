export type ItemType = "folder" | "file";

export interface FileSystemItem {
  id: string;
  name: string;
  type: ItemType;
  content?: string;
  parentId: string | null;
  childrenIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface FolderState {
  expandedFolders: Record<string, boolean>;
  selectedFolderId: string | null;
  editingFileId: string | null;
}

export interface FileSystemState {
  items: Record<string, FileSystemItem>;
  folderState: FolderState;
}
