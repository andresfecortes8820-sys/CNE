import {Pool} from "pg";
const globalDb=globalThis as unknown as {cnePool?:Pool};
export const pool=process.env.DATABASE_URL?(globalDb.cnePool??=new Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:4000})):null;
