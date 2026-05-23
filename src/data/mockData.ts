import { v4 as uuidv4 } from "uuid";
import type { FileSystemState } from "../features/fileSystem/fileSystemTypes";

const rootId = uuidv4();
const documentsId = uuidv4();
const notesId = uuidv4();
const todoId = uuidv4();

export const initialData: FileSystemState = {
  items: {
    [rootId]: {
      id: rootId,
      name: "My Drive",
      type: "folder",
      parentId: null,
      childrenIds: [documentsId],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [documentsId]: {
      id: documentsId,
      name: "Documents",
      type: "folder",
      parentId: rootId,
      childrenIds: [notesId, todoId],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [notesId]: {
      id: notesId,
      name: "notes.txt",
      type: "file",
      parentId: documentsId,
      content:
        "Welcome to Mini File Explorer!\n\nThis is my first note.\nI can write multiple lines.\n\nFeatures:\n- Create folders\n- Create files\n- Edit content\n- Delete items\n\nAll data is saved automatically!",
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [todoId]: {
      id: todoId,
      name: "todo.txt",
      type: "file",
      parentId: documentsId,
      content:
        "My Todo List:\n1. Complete file explorer\n2. Add more features\n3. Test everything\n4. Deploy to production\n\nRemember to save your work!",
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  },
  folderState: {
    expandedFolders: {
      [rootId]: true,
    },
    selectedFolderId: rootId,
    editingFileId: null,
  },
};
