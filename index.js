const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(bodyParser.json());


/* Morgan Setup */
const morgan = require("morgan");

// Pre defined format string
app.use(morgan("combined")); // standard apache combined log
app.use(morgan("common"));   // standard apache common log
app.use(morgan('dev'));      // standard developement log
app.use(morgan("short"));    // short format
app.use(morgan("tiny"))      // tiny format

// Using format string of predefined tokens
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// Options
app.use(morgan("combined", { skip: function(req, res) { return res.statusCode < 400 } }));

// Token
morgan.token("type", function(req, res) { return req.headers["content-type"] });
app.use(morgan(":type"));

// Write logs to a file
const fs = require("fs");
const path = require("path");
const accessLogStream = fs.WriteStream(path.join(__dirname, "/logs/allAccess.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

// Log file rotation
const rfs = require("rotating-file-stream");
const accessLogsStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "logs")
});
app.use(morgan("combined", { stream: accessLogsStream }));

// Dual logging
app.use(morgan("dev", { skip: function(req, res) { return res.statusCode < 400 } }));
app.use(morgan("combined", { stream: fs.WriteStream(path.join(__dirname, "/logs/access.log"), { flags: "a" }) }));


// Routes
const postsRoutes = require("./routes/posts");
app.use("/posts", postsRoutes);

// Create Database Connection Using Mongoose
(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Database Connected Successfully");
    } catch (error) {
        console.log("Unable To Connect With MongoDB Database");
        console.log(error);
    }
})();

// Create Server On Localhost:8000
(async () => {
    try {
        await app.listen(PORT);
        console.log(`Server Started On Localhost:${PORT}`);
    } catch (error) {
        console.log(`Unable To Start Server On Localhost:${PORT}`);
        console.log(error);
    }
})();