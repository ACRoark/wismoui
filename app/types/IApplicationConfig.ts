import IFeatureFlags from './IFeatureFlags';
import IGoogleTagManagerConfig from './IGoogleTagManagerConfig';
import IUrlConfig from './IUrlConfig';

interface IApplicationConfig {
  error?: string;
  flags: IFeatureFlags;
  gigyaSiteKey: string;
  googleTagManagerConfig?: IGoogleTagManagerConfig;
  loading: boolean;
  recaptchaSitekey: string;
  urls: IUrlConfig;
}

export default IApplicationConfig;
