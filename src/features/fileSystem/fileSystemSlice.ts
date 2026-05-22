import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { initialData } from "../../data/mockData";
import type { FileSystemItem, FileSystemState } from "./fileSystemTypes";

const initialState: FileSystemState = loadFromLocalStorage() || initialData;

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    createItem: (
      state,
      action: PayloadAction<{
        parentId: string;
        name: string;
        type: "folder" | "file";
        content?: string;
      }>,
    ) => {
      const { parentId, name, type, content = "" } = action.payload;
      const newId = uuidv4();
      const now = Date.now();

      const newItem: FileSystemItem = {
        id: newId,
        name,
        type,
        parentId,
        content: type === "file" ? content : undefined,
        childrenIds: [],
        createdAt: now,
        updatedAt: now,
      };

      state.items[newId] = newItem;

      if (parentId && state.items[parentId]) {
        state.items[parentId].childrenIds.push(newId);
      }

      saveToLocalStorage(state);
    },

    renameItem: (
      state,
      action: PayloadAction<{ id: string; newName: string }>,
    ) => {
      const { id, newName } = action.payload;
      if (state.items[id]) {
        state.items[id].name = newName;
        state.items[id].updatedAt = Date.now();
        saveToLocalStorage(state);
      }
    },

    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const deleteRecursive = (itemId: string) => {
        const item = state.items[itemId];
        if (!item) return;

        if (item.type === "folder") {
          [...item.childrenIds].forEach((childId) => {
            deleteRecursive(childId);
          });
        }

        if (item.parentId && state.items[item.parentId]) {
          const parent = state.items[item.parentId];
          parent.childrenIds = parent.childrenIds.filter(
            (childId) => childId !== itemId,
          );
        }

        delete state.items[itemId];

        if (state.folderState.selectedFolderId === itemId) {
          state.folderState.selectedFolderId = null;
        }
        if (state.folderState.editingFileId === itemId) {
          state.folderState.editingFileId = null;
        }
      };

      deleteRecursive(id);
      saveToLocalStorage(state);
    },

    updateFileContent: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const { id, content } = action.payload;
      if (state.items[id] && state.items[id].type === "file") {
        state.items[id].content = content;
        state.items[id].updatedAt = Date.now();
        saveToLocalStorage(state);
      }
    },

    toggleFolder: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      state.folderState.expandedFolders[folderId] =
        !state.folderState.expandedFolders[folderId];
      saveToLocalStorage(state);
    },

    selectFolder: (state, action: PayloadAction<string | null>) => {
      state.folderState.selectedFolderId = action.payload;
      saveToLocalStorage(state);
    },

    setEditingFile: (state, action: PayloadAction<string | null>) => {
      state.folderState.editingFileId = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const {
  createItem,
  renameItem,
  deleteItem,
  updateFileContent,
  toggleFolder,
  selectFolder,
  setEditingFile,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
