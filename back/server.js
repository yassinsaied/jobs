const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

// Connect to mmongo DB
connectDB();

//init Middlewhere*

app.use(express.json());

// Define Routes
app.use("/api/login", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => res.send("API RUNING"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
