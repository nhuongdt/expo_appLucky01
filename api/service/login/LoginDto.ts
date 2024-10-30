export interface ILoginModel {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
  tenantId?: number;
}
export interface IAuthenResultModel {
  accessToken: string;
  refreshToken: string;
  expireInSeconds: boolean;
}
