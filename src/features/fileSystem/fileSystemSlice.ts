import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

import type {
  CreateItemPayload,
  DeleteItemPayload,
  FileSystemItem,
  FileSystemState,
  MoveItemPayload,
  RenameItemPayload,
  UpdateFileContentPayload,
} from "./fileSystemTypes";
import { initialData } from "../../data/mockData";

const initialState: FileSystemState = loadFromLocalStorage() || initialData;

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    createItem: (state, action: PayloadAction<CreateItemPayload>) => {
      const { parentId, name, type, content = "" } = action.payload;
      const newId = uuidv4();
      const now = Date.now();

      const newItem: FileSystemItem = {
        id: newId,
        name,
        type,
        parentId,
        content: type === "file" ? content : undefined,
        childrenIds: type === "folder" ? [] : [],
        createdAt: now,
        updatedAt: now,
      };

      state.items[newId] = newItem;

      if (parentId && state.items[parentId]) {
        state.items[parentId].childrenIds.push(newId);
      }

      saveToLocalStorage(state);
    },

    renameItem: (state, action: PayloadAction<RenameItemPayload>) => {
      const { id, newName } = action.payload;
      if (state.items[id]) {
        state.items[id].name = newName;
        state.items[id].updatedAt = Date.now();
        saveToLocalStorage(state);
      }
    },

    deleteItem: (state, action: PayloadAction<DeleteItemPayload>) => {
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
      action: PayloadAction<UpdateFileContentPayload>,
    ) => {
      const { id, content } = action.payload;
      if (state.items[id] && state.items[id].type === "file") {
        state.items[id].content = content;
        state.items[id].updatedAt = Date.now();
        saveToLocalStorage(state);
      }
    },

    moveItem: (state, action: PayloadAction<MoveItemPayload>) => {
      const { id, newParentId } = action.payload;
      const item = state.items[id];

      if (!item) return;

      const oldParentId = item.parentId;

      if (oldParentId && state.items[oldParentId]) {
        state.items[oldParentId].childrenIds = state.items[
          oldParentId
        ].childrenIds.filter((childId) => childId !== id);
      }

      item.parentId = newParentId;
      item.updatedAt = Date.now();

      if (newParentId && state.items[newParentId]) {
        state.items[newParentId].childrenIds.push(id);
      }

      saveToLocalStorage(state);
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
      Object.keys(state.items).forEach((itemId) => {
        if (state.items[itemId].type === "folder") {
          state.folderState.expandedFolders[itemId] = true;
        }
      });
      saveToLocalStorage(state);
    },

    collapseAllFolders: (state) => {
      Object.keys(state.folderState.expandedFolders).forEach((folderId) => {
        state.folderState.expandedFolders[folderId] = false;
      });
      saveToLocalStorage(state);
    },
  },
});

export const {
  createItem,
  renameItem,
  deleteItem,
  updateFileContent,
  moveItem,
  toggleFolder,
  selectFolder,
  setEditingFile,
  expandAllFolders,
  collapseAllFolders,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
