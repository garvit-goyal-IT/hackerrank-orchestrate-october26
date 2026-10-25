const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");


const filePath = path.join(__dirname, "..", "dataset", "evidence", "databases", "customer_accounts_failover_replica_20260902.sql");


const sqlText = fs.readFileSync(filePath, "utf8");
const db = new DatabaseSync(":memory:");
db.exec(sqlText);


const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all();

for (const t of tables) {
  const count = db.prepare("SELECT COUNT(*) AS n FROM " + t.name).get().n;
  const hits = db.prepare("SELECT COUNT(*) AS n FROM " + t.name + " WHERE lower(email) = ?").get("leila.haddad@yahoo.com").n;
  console.log(t.name, "| rows:", count, "| rows with Leila's email:", hits);
}