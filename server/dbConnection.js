// const mongoose = require("mongoose");

// const url =
//   "mongodb+srv://rajeshdumpala1432:Tail%401234@cluster0.wyobtyc.mongodb.net/TouchlessAP";

// let connection;

// const connect = async () => {
//   if (!mongoose.connection.readyState) {
//     try {
//       connection = await mongoose.connect(url);
//       console.log("Database Connected Successfully");
//     } catch (error) {
//       console.error("Failed To Connect Database:", error);
//       throw error;
//     }
//   }
//   return connection.connection;
// };

// const close = async () => {
//   if (mongoose.connection.readyState) {
//     await mongoose.connection.close();
//     console.log("Database Connection Ended");
//   }
// };

// // Exporting connect and close functions
// module.exports = { connect, close };
