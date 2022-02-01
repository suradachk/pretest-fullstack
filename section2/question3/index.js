const request = require("request");
var HTMLParser = require("node-html-parser");

const param = process.argv[2]
let cookieJar = request.jar();
let cookie = request.cookie("hasCookie=true");
let url = "https://codequiz.azurewebsites.net/";
cookieJar.setCookie(cookie, url);
request({ url: url, jar: cookieJar }, function (error, response, body) {
  if (error) {
    return done(error);
  }
  const root = HTMLParser.parse(body);
  const table = root.querySelector("table");
  const row = table.getElementsByTagName("td")
  for (let i = 0; i < row.length;i++){
    const str = row[i].innerText
    if(str.trim() === param.trim() ){
      console.log(row[i+1].innerText)
    }
  }
});



