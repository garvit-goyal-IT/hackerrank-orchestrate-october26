const {readCsv} = require("./loadData.js");
const {findUserByEmail ,findUserByAnyEmail, resolveUser,isDeletionRequest } = require("./identity.js")

const deletion_requests= readCsv("deletion_requests.csv");
const user_identities= readCsv("user_identities.csv");
const user_audit_log= readCsv("user_audit_log.csv");
const system_activity= readCsv("system_activity.csv");
const deletion_rules= readCsv("deletion_rules.csv");
const evidence_files= readCsv("evidence_files.csv");


/** 
 
 * number of each request

console.log("deletion_requests", deletion_requests.length);
console.log("user_identities", user_identities.length);
console.log("user_audit_log", user_audit_log.length);
console.log("system_activity", system_activity.length); 
console.log("deletion_rules", deletion_rules.length);
console.log("evidence_files", evidence_files.length);

*/

let found=0, notfound=0;

for (const request of deletion_requests){
    
        let email= request.email.trim().toLowerCase();
        let user= findUserByEmail(user_identities,email) || findUserByAnyEmail(user_identities,user_audit_log,email);
    
        if(user){
            found++;
        }else{
            notfound++;
        }
}

// console.log("found", found, ",  notfound", notfound);


// console.log(resolveUser(user_identities, user_audit_log, "o.walker6695@yahoo.com"));
// console.log(resolveUser(user_identities, user_audit_log, "amina.elmasri@gmail.com"))
// console.log(resolveUser(user_identities, user_audit_log, "nobody@example.com"))

// count=0;
// for(const request of deletion_requests){
//     if(count==20) break;
//     console.log(`request ${count} ->` , request.request_text )
//     count++;
// }

for(const request of deletion_requests){
    const request_text= request.request_text.trim().toLowerCase();

    console.log(request.case_id ,isDeletionRequest(request_text))
}