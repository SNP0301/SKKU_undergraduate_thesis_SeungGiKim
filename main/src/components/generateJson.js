const minterName = "OO University";
const awardeeName = "Student ";
const awardInfo = "default award";
const awardedDate = "2023-01-01";
const imageURL = "default URL for ipfs must be here";
const counter = 5;

try {
  for (let i = 1; i <= counter; i++) {
    let json = `{"minterName:${minterName}","awardeeName:#${i}th ${awardeeName}","awardInfo:${awardInfo}","awardedDate:${awardedDate}}","awardedDate:${awardedDate}","imageURL:${imageURL}"}`;
    let fs = require("fs");
    fs.writeFile(`${i}.json`, json, "utf8", (e) => e);
  }
  console.log("complete!");
} catch (error) {
  console.log(error);
}
