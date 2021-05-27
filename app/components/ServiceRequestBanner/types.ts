export interface IBannerNotification {
  hasError: boolean;
  message: IMessage;
}

export interface IMessage {
  id: string;
  values: string[] | null;
}
