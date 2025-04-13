import crypto from "crypto";
import { redisClient } from "./redis/redis";

const SESSION_EXPIRATION = 60 * 40;

type sessionSchema = {
    uName : string;
    role : string;
}

function isValidSession(obj: any): obj is sessionSchema {
    return (
      obj &&
      typeof obj.uName === 'string' &&
      (obj.role === 'admin' || obj.role === 'user')
    );
  }

export type Cookies = {
    set : (key : string,
    value : string,
    options : {
        secure ?: boolean;
        httpOnly?:boolean;
        sameSite?:'lax'|'strict';
        expires?:number;
    }) => void;
    get : (key : string) => {name : string; value:string;} | undefined;
    delete : (key : string)=> void;
}

export function createUserSession(uName:string , role:string ,cookies: Cookies)
{
    const sessionid= crypto.randomBytes(256).toString("hex").normalize();
    redisClient.set(`session:${sessionid}`,{uName,role},{ex: SESSION_EXPIRATION});

    setcookie(sessionid,cookies);
}

export function setcookie(sessionid : string, cookies:Pick<Cookies,'set'>)
{
    cookies.set('session_identifier',sessionid,{secure:true,httpOnly:true,sameSite:"lax",expires:Date.now() + (SESSION_EXPIRATION * 1000)})
}

export function getUserFromSession(cookies: Pick<Cookies,'get'>)
{
    const sessionid = cookies.get('session_identifier')?.value;
    if(!sessionid) return null;

    return getUserSessionByid(sessionid);
}

export async function getUserSessionByid(sessionid : string)
{
    const rawUser = await redisClient.get(`session:${sessionid}`);

    if(isValidSession(rawUser)) return rawUser;
    return null;
}

export async function removeUserFromSession(cookies:Pick<Cookies,'get'|'delete'>)
{
    const sessionid = cookies.get('session_identifier')?.value;
    if(!sessionid) return ;
    await redisClient.del(`session:${sessionid}`);
    cookies.delete('session_identifier');
}

export async function updateUserSessionExpiration(
    cookies: Pick<Cookies, "get" | "set">
  ) {
    const sessionId = cookies.get('session_identifier')?.value;
    if (sessionId == null) return null;
  
    const user = await getUserSessionByid(sessionId);
    if (user == null) return;
  
    await redisClient.set(`session:${sessionId}`, user, {
      ex: SESSION_EXPIRATION,
    });
    setcookie(sessionId, cookies);
  }
  