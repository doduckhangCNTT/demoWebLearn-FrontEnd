export interface IAlert {
  loading?: boolean;
  error?: string | string[];
  success?: string | string[];
}

export interface IAlertType {
  type: string;
  payload: IAlert;
}
