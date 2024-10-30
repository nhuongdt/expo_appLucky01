import { TenantStatus } from "@/enum/TenantStatus";
import { IAuthenResultModel, ILoginModel } from "./LoginDto";
import * as SecureStore from "expo-secure-store";

class LoginService {
  checkUser_fromCache = async (): Promise<ILoginModel | null> => {
    let user = await SecureStore.getItemAsync("user");
    if (user) {
      const dataUser = JSON.parse(user);
      const userLogin: ILoginModel = {
        userNameOrEmailAddress: dataUser.userNameOrEmailAddress,
        password: dataUser.password,
        rememberClient: dataUser.rememberClient,
        tenantId: dataUser?.tennatId ?? 0,
      };
      return userLogin;
    }
    return null;
  };
  checkExistsTenant = async (tenantName: string) => {
    try {
      const param = {
        tenancyName: tenantName,
      };

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/services/app/Account/IsTenantAvailable`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        }
      );
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.log("checkExistsTenant ", error);
    }
    return { state: TenantStatus.NOTFOUND, tenantId: 0 };
  };
  checkUserLogin = async (
    input: ILoginModel,
    tennatId: number
  ): Promise<IAuthenResultModel | null> => {
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Abp.TenantId",
        tennatId == 1 ? "null" : tennatId.toString()
      );
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(input),
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}api/TokenAuth/Authenticate`,
        requestOptions
      );
      const jsonData = await response.json();
      return jsonData.result;
    } catch (error) {
      console.log("checkUserLogin ", error);
    }
    return null;
  };
}

export default new LoginService();
