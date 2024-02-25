import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from '../utils/localStorage';
import { LoginResponseDto } from '../services/dtos/login/loginResponseDto';

interface AuthState {
  authInfo: LoginResponseDto;
  setAuthInfo: (authInfo: LoginResponseDto) => void;
  handleLogout: () => void;
  clearUserConfiguration: () => void;
  isUserSigned: boolean;
  setUserSigned: (isSigned: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isUserSigned: false,
      setUserSigned: (isSigned) => set(() => ({ isUserSigned: isSigned })),
      authInfo: {
        id: '',
        accessToken: '',
        expireAt: '',
        username: '',
        refreshToken: '',
      },
      setAuthInfo: (authInfo) => set(() => ({ authInfo })),
      clearUserConfiguration: async () => {
        useAuthStore.persist.clearStorage();
      },
      handleLogout: async () => {
        try {
          const { setAuthInfo, authInfo } = get();
          set(() => ({ isUserSigned: false }));
          const { clearUserConfiguration } = get();
          setAuthInfo({
            ...authInfo,
            id: '',
            accessToken: '',
            refreshToken: '',
          });
          clearUserConfiguration();
        } catch {
          set(() => ({ isUserSigned: false }));
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
