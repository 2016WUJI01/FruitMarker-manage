const routerApi = require("./router");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use("/api", routerApi);

app.listen(3000);
console.log("success listen at port:3000");
