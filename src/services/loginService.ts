import { API } from '../components/organisms/NetworkManager';
import { useAuthStore } from '../store/AuthStore';
import { LoginResponseDto } from './dtos/login/loginResponseDto';
import { LoginRequestDto } from './dtos/login/loginRequestDto';

export const loginService = {
  handleLogin: async ({
    username,
    password,
    applicationId,
  }: LoginRequestDto) => {
    return (
      await API.post<LoginResponseDto>(
        'login',
        {
          username,
          password,
          applicationId,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      )
    ).data;
  },
  async refreshToken() {
    const { authInfo, setAuthInfo } = useAuthStore.getState();

    const response = await API.post<any>('refresh-token', {
      keyAccessId: authInfo.id,
      refreshToken: authInfo.refreshToken,
    });

    await setAuthInfo({
      ...authInfo,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });
    return response.data.accessToken;
  },
  logout: async () => {
    const response = await API.post('logout');
    return response.status;
  },
};
