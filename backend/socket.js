module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // When student submits a survey
    socket.on("surveySubmitted", (data) => {
      console.log("New survey response received");
      io.emit("updateAnalytics", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
