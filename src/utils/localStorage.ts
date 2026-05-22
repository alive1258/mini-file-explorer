import type { FileSystemState } from "../features/fileSystem/fileSystemTypes";

const STORAGE_KEY = "file-explorer-data";

export const saveToLocalStorage = (state: FileSystemState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromLocalStorage = (): FileSystemState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
  return null;
};
