import type { FileSystemState } from "../features/fileSystem/fileSystemTypes";

const STORAGE_KEY = "file-explorer-data";

export const saveToLocalStorage = (state: FileSystemState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromLocalStorage = (): FileSystemState | null => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState) as FileSystemState;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
