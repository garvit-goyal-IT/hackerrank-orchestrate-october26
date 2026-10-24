const {readCsv} = require("./loadData.js");

const deletion_requests= readCsv("deletion_requests.csv");
const user_identities= readCsv("user_identities.csv");
const user_audit_log= readCsv("user_audit_log.csv");
const system_activity= readCsv("system_activity.csv");
const deletion_rules= readCsv("deletion_rules.csv");
const evidence_files= readCsv("evidence_files.csv");

console.log("deletion_requests", deletion_requests.length);
console.log("user_identities", user_identities.length);
console.log("user_audit_log", user_audit_log.length);
console.log("system_activity", system_activity.length); 
console.log("deletion_rules", deletion_rules.length);
console.log("evidence_files", evidence_files.length);
