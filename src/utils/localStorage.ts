import type { FileSystemState } from "../features/fileSystem/fileSystemTypes";

const STORAGE_KEY = "file-explorer-data";

export const saveToLocalStorage = (state: FileSystemState): void => {
  try {
    const cleanState = {
      items: { ...state.items },
      folderState: {
        expandedFolders: { ...state.folderState.expandedFolders },
        selectedFolderId: state.folderState.selectedFolderId,
        editingFileId: state.folderState.editingFileId,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromLocalStorage = (): FileSystemState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      return parsed;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return null;
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const hasLocalStorageData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
