import {timingSafeEqual} from "node:crypto";
export function authorized(req:Request){const token=process.env.API_TOKEN;if(!token||token.length<24)return false;const a=Buffer.from(req.headers.get("authorization")||"");const b=Buffer.from(`Bearer ${token}`);return a.length===b.length&&timingSafeEqual(a,b);}
