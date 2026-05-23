import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
  clearLocalStorage,
} from "../../utils/localStorage";
import { initialData } from "../../data/mockData";
import type { FileSystemItem, FileSystemState } from "./fileSystemTypes";

const getInitialState = (): FileSystemState => {
  const saved = loadFromLocalStorage();
  if (saved && saved.items && Object.keys(saved.items).length > 0) {
    const hasValidRoot = Object.values(saved.items).some(
      (item) => item.parentId === null && item.type === "folder",
    );
    if (hasValidRoot) {
      return saved;
    }
  }
  return initialData;
};

const initialState: FileSystemState = getInitialState();

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

      if (!state.items[parentId]) {
        console.error("Parent folder not found:", parentId);
        return;
      }

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
      state.items[parentId].childrenIds.push(newId);

      state.folderState.expandedFolders[parentId] = true;

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
      const itemToDelete = state.items[id];

      if (!itemToDelete) return;

      console.log("Deleting item:", itemToDelete.name, id);

      const deleteRecursive = (itemId: string) => {
        const item = state.items[itemId];
        if (!item) return;

        if (item.type === "folder" && item.childrenIds) {
          [...item.childrenIds].forEach((childId) => {
            deleteRecursive(childId);
          });
        }

        if (item.parentId && state.items[item.parentId]) {
          const parent = state.items[item.parentId];
          if (parent.childrenIds) {
            parent.childrenIds = parent.childrenIds.filter(
              (childId) => childId !== itemId,
            );
          }
        }

        delete state.items[itemId];

        if (state.folderState.selectedFolderId === itemId) {
          state.folderState.selectedFolderId = null;
        }
        if (state.folderState.editingFileId === itemId) {
          state.folderState.editingFileId = null;
        }
        if (state.folderState.expandedFolders[itemId]) {
          delete state.folderState.expandedFolders[itemId];
        }
      };

      deleteRecursive(id);

      saveToLocalStorage(state);
      console.log(
        "After deletion, state has",
        Object.keys(state.items).length,
        "items",
      );
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

    expandAllFolders: (state) => {
      Object.keys(state.items).forEach((id) => {
        if (state.items[id].type === "folder") {
          state.folderState.expandedFolders[id] = true;
        }
      });
      saveToLocalStorage(state);
    },

    collapseAllFolders: (state) => {
      Object.keys(state.folderState.expandedFolders).forEach((id) => {
        state.folderState.expandedFolders[id] = false;
      });
      saveToLocalStorage(state);
    },

    resetAllData: () => {
      clearLocalStorage();
      return initialData;
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
  expandAllFolders,
  collapseAllFolders,
  resetAllData,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
