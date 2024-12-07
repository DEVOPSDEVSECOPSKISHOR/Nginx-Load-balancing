const express = require("express");
const app = express();

const appid = process.env.APPID || "defaultAppId"; 

app.get("/", (req, res) => 
    res.send(`appid: ${appid} home page: says hello!`)
);

app.get("/app1", (req, res) => 
    res.send(`appid: ${appid} app1 page: says hello!`)
);

app.get("/app2", (req, res) => 
    res.send(`appid: ${appid} app2 page: says hello!`)
);

app.get("/admin", (req, res) => 
    res.send(`appid: ${appid} ADMIN page: very few people should see this`)
);

const port = 9999;
app.listen(port, () => 
    console.log(`AppID: ${appid} is listening on port ${port}`)
);
