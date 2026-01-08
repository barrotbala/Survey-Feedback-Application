const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

// App & Server
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// DB Connection
const connectDB = require("./config/db");
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/surveys", require("./routes/survey.routes"));
app.use("/api/responses", require("./routes/response.routes"));
app.use("/api/student-feedback", require("./routes/studentFeedback.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("College Survey Backend Running 🚀");
});

// Socket handler
require("./socket")(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
