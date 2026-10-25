const { openSnapshot, findRows } = require("./evidenceSql.js");


const db = openSnapshot("dataset/evidence/databases/customer_data_inventory_20260916.sql");
const rows = findRows(db, ["k.appiah88@gmail.com", "user_61"]);

console.log(rows);
