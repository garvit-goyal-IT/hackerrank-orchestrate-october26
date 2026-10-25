const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");
const {allStrings} = require("./function.js");



function findRows(db, identifiers) {
    const found = [];
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all();
  
    for (const t of tables) {
      const rows = db.prepare("SELECT * FROM " + t.name).all();
      for (const row of rows) {

        if (allStrings(row).some(s => identifiers.includes(s))) {
          found.push({ table: t.name, row: row });
        }
      }
    }
    return found;
}


function openSnapshot(relativePath) {
    const filePath = path.join(__dirname, "..", relativePath);
    const sqlText = fs.readFileSync(filePath, "utf8");
    const db = new DatabaseSync(":memory:");
    db.exec(sqlText);
    return db;
}


module.exports= { openSnapshot, findRows };