import useConfig from 'hooks/useConfig';
import googleTagManager from 'services/googleTagManager';

interface IUseGoogleTagManagerResponse {
  sendPageView: (page: string) => void;
}

const useGoogleTagManager = (): IUseGoogleTagManagerResponse => {
  const { googleTagManagerConfig } = useConfig();

  const sendPageViewToGTM = (page: string): void => {
    if (googleTagManagerConfig) {
      googleTagManager.sendPageView(page, googleTagManagerConfig);
    }
  };

  return {
    sendPageView: sendPageViewToGTM,
  };
};

export default useGoogleTagManager;
