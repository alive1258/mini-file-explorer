import { v4 as uuidv4 } from "uuid";
import type { FileSystemState } from "../features/fileSystem/fileSystemTypes";

const rootId = uuidv4();
const documentsId = uuidv4();
const picturesId = uuidv4();
const videosId = uuidv4();
const notesId = uuidv4();
const todoId = uuidv4();
const vacationId = uuidv4();

export const initialData: FileSystemState = {
  items: {
    [rootId]: {
      id: rootId,
      name: "My Drive",
      type: "folder",
      parentId: null,
      childrenIds: [documentsId, picturesId, videosId],
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
    [picturesId]: {
      id: picturesId,
      name: "Pictures",
      type: "folder",
      parentId: rootId,
      childrenIds: [vacationId],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [videosId]: {
      id: videosId,
      name: "Videos",
      type: "folder",
      parentId: rootId,
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [notesId]: {
      id: notesId,
      name: "notes.txt",
      type: "file",
      parentId: documentsId,
      content:
        "Welcome to Mini File Explorer!\n\nFeatures:\n- Create folders and files\n- Rename items\n- Delete items\n- Edit text files\n- Persistent storage\n\nEnjoy! 🚀",
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
        "To-Do List:\n1. Implement file explorer\n2. Add Redux state management\n3. Style with Tailwind CSS\n4. Add TypeScript\n5. Deploy application",
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    [vacationId]: {
      id: vacationId,
      name: "vacation.jpg",
      type: "file",
      parentId: picturesId,
      content: "Image placeholder - Vacation photo would be here",
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  },
  folderState: {
    expandedFolders: {
      [rootId]: true,
      [documentsId]: false,
      [picturesId]: false,
      [videosId]: false,
    },
    selectedFolderId: rootId,
    editingFileId: null,
  },
};
