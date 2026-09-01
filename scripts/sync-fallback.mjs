import fs from "fs";

const content = JSON.parse(fs.readFileSync("./src/data/content.json", "utf8"));
const output = `const siteData = ${JSON.stringify(content, null, 2)};\n\nexport default siteData;\n`;
fs.writeFileSync("./src/data/siteData.js", output);
console.log("siteData.js updated from content.json");
