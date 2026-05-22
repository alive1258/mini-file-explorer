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

export interface CreateItemPayload {
  parentId: string;
  name: string;
  type: ItemType;
  content?: string;
}

export interface RenameItemPayload {
  id: string;
  newName: string;
}

export interface DeleteItemPayload {
  id: string;
}

export interface UpdateFileContentPayload {
  id: string;
  content: string;
}

export interface MoveItemPayload {
  id: string;
  newParentId: string;
}
