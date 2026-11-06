import {test} from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {PGlite} from "@electric-sql/pglite";

test("PostgreSQL schema is repeatable and mention URLs deduplicate", async()=>{
 const db=new PGlite();
 try {
  const sql=await readFile("migrations/001_init.sql","utf8");
  await db.exec(sql);await db.exec(sql);
  const insert="INSERT INTO mentions(id,source_id,published_at,data) VALUES('same-url','rss',now(),'{\"title\":\"Prueba CNE\",\"summary\":\"Registro sintético de prueba\"}') ON CONFLICT DO NOTHING";
  await db.exec(insert);await db.exec(insert);
  const result=await db.query<{count:number}>("SELECT count(*)::int AS count FROM mentions");
  assert.equal(result.rows[0].count,1);
  await assert.rejects(()=>db.exec("UPDATE sources SET status='invalid' WHERE id='rss'"));
 }finally{await db.close();}
});
