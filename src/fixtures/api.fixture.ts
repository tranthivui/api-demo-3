import {APIRequestContext, test as base, expect, request as playwrightRequest} from "@playwright/test";
import { BASE_URL } from "../paths/paths";
import { CreateRes, GetTokenResponse, User } from "../types/user";

type Account={
    api: APIRequestContext,
    userID: string,
    user: User
};

type APIFixture={ 
    account: Account
};

export const test=base.extend<APIFixture>({
    account: async({},use)=>{
        const createUserContext=await playwrightRequest.newContext({baseURL:BASE_URL});
        const user: User={
            userName: "admin"+Date.now(),
            password: "Mk135790@"
        };
        const createUserRes=await createUserContext.post("/Account/v1/User",{
            data: user
        });
        expect(createUserRes.status()).toBe(201);
        const createResData : CreateRes=await createUserRes.json();
        expect(createResData.username).toBe(user.userName);
        const userID=createResData.userID;
        const username=createResData.username;
        const getTokenRes = await createUserContext.post("/Account/v1/GenerateToken",{
            data: user
        });
        expect(getTokenRes.status()).toEqual(200);
        const getTokenData : GetTokenResponse=await getTokenRes.json();
        const token=getTokenData.token;
        if(!token) throw new Error("Not found token");
         await createUserContext.dispose();
         const api=await playwrightRequest.newContext({
            baseURL: BASE_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`
            }
         });
         await use({api, userID, user});
         const deleRes=await api.delete(`/Account/v1/User/${userID}`);
         await api.dispose();
    }
})