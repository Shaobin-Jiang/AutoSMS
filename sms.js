/*
    Author: Shaobin Jiang
    Date: Mar 26th, 2021
    Version: v1.0.0 - beta
*/

const fs = require('fs');
const process = require('process');
const xlsx = require('node-xlsx');

// Format: node sms.js text_source xlsx_source [target]
const textSource = process.argv[2]; // Please ensure this is an utf-8 encoded text!
const xlsxSource = process.argv[3]; // All content must in the form of raw text!
if (process.argv.length == 4) {
    var target = "out.html";
}
else {
    var target = process.argv[4];
}

var text = fs.readFileSync(textSource, "utf-8");
const regExp = /{{( ){0,1}(\w*)( ){0,1}}}/g;
const rawVariableList = text.match(regExp);

const xlsxContent = xlsx.parse(xlsxSource)[0].data;
const attributes = xlsxContent[0];
var aElements = "";
for (let i = 1; i < xlsxContent.length; i++) {
    var out = text;
    var row = xlsxContent[i];
    for (let j = 1; j < attributes.length; j++) {
        let reg = new RegExp("{{( ){0,1}" + attributes[j] + "( ){0,1}}}", "g");
        out = out.replace(reg, row[j]);
    }
    out.replace(/ /g, "%20");
    aElements += "    <a href=\"sms:" + row[0] + "?body=" + out + "\">发送短信" + i + "</a><br>\n";
}

const htmlText = "<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>SMS</title>\n</head>\n\n<body>\n" + aElements + "</body>\n</html>";
fs.writeFileSync(target, htmlText, "utf-8");