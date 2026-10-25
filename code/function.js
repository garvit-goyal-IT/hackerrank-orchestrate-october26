function findUserByEmail(identities,email){
    
        let user = identities.find(user => user.email.trim().toLowerCase() === email);
        if(user){
            return user;
        }else{
            return null;
        }

}

function findUserByAnyEmail(identities,auditLog, email){
    
    let log = auditLog.find(user => user.field_name === "email" && user.old_value.trim().toLowerCase() === email);

    if(log){
        let user = identities.find(user => user.user_id === log.user_id);
       
        return user ? user : null;
    }
    return null;
}


function resolveUser(identities, auditLog, email){
    let user= findUserByEmail(identities, email)
    
    let matchedBy ="CURRENT";
    
    if(!user){
        user = findUserByAnyEmail(identities, auditLog, email);
        matchedBy = "HISTORY";
    }

    if(!user) return null;

    const emails= new Set()
    const phones= new Set()

    emails.add(user.email.trim().toLowerCase());
    phones.add(user.phone);    

    for(const row of auditLog){
        if(row.user_id === user.user_id){
            if(row.field_name === "email"){
                emails.add(row.old_value.trim().toLowerCase());
                emails.add(row.new_value.trim().toLowerCase());
            }else if(row.field_name === "phone"){
                phones.add(row.old_value);
                phones.add(row.new_value);
            }
        }
    }

    return {
        user_id: user.user_id,
        name: user.name,
        emails: [...emails],
        phones: [...phones],
        matchedBy: matchedBy
    }
}

const words= ["delet","elimin","borrar","exclus", "suppr", "effac", "lösch", "삭제", "削除", "删除", "remov", "eras", "destroy", "purge", "eliminate", "expunge", "wipe out", "terminate", "revoke", "cancel", "withdraw", "discontinue", "abolish", "eradicate", "extinguish", "liquidate"]
const other_actions= ["keep the account","leave my profile","without removing","continue using","update","leave the account", "modify", "adjust", "amend",  "reconfigure", "reorganize", "restructure", "rearrange", "reform", "remodel", "remake", "rebuild", "reconstruct", "refurbish", "renovate","misspelled","download","out of date","copy of"]
const negations= ["not asking for deletion", "do not close", "don't delete", "do not delete", "without removing", "without deleting"]

function containsAny(text, words) {
    return words.some(word => text.includes(word));
}

function isDeletionRequest(text){
    text= text.trim().toLowerCase();

    if(containsAny(text, negations)){
        return "NO";
    }

    if(containsAny(text, words) && !containsAny(text,other_actions)){
        return "YES";
    }
    else if(!containsAny(text, words) && containsAny(text,other_actions)){
        return "NO";
    }
    else 
         return "UNSURE"
}   


function isUsable(capturedAt, auditAt){
    let capturedDate= new Date(capturedAt);
    let auditDate= new Date(auditAt);

    return capturedDate <= auditDate;
}


function allStrings(row, searchTokens) {
    const rowString = JSON.stringify(row).toLowerCase();
    return searchTokens.some(token => rowString.includes(String(token).toLowerCase()));
}

module.exports= {findUserByEmail, findUserByAnyEmail, resolveUser, isDeletionRequest, isUsable};