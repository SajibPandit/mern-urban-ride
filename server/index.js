//Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path')
const { fileURLToPath } = require('url');

//Importing routes
const router = require("./routes");

// Database Connection
require("./helpers/dbConfig");

const app = express();

app.use(express.json());

//for cors issue
app.use(
  cors({
    origin: "*",
  })
);

//const __filename = fileURLToPath(import.meta.url);

//const __dirname = path.dirname(__filename);
//const __dirname = path.resolve()

app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})
 

//setting up logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Register the routers
app.use("/api", router);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

// Starting the server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});

// Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down the server...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
