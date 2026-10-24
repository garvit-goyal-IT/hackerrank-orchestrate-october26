const fs= require('fs');
const path = require('path');
const {parse} = require("csv-parse/sync")

function readCsv(filename){

    const filePath = path.join(__dirname,"..","dataset", filename);
    const text= fs.readFileSync(filePath, "utf-8");
    
    return parse(text, { columns: true, skip_empty_lines: true });
}

module.exports= {readCsv};