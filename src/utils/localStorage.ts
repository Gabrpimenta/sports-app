import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import AppError from '../helper/AppError';

const storage = new MMKV();

const MESSAGE =
  'Falha ao salvar dados locais, verifique o armazenamento do dispositivo.';

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      storage.set(name, value);
    } catch {
      throw new AppError(MESSAGE);
    }
  },

  getItem: (name) => {
    try {
      const value = storage.getString(name);
      return value ?? null;
    } catch {
      throw new AppError(MESSAGE);
    }
  },

  removeItem: async (name) => {
    try {
      storage.delete(name);
    } catch {
      throw new AppError(MESSAGE);
    }
  },
};
