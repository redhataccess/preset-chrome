import express from "express";
import setupChrome from "../src/index";

const app = express();
setupChrome(app);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`server is running`);
});
