const socketIO = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Track online users: { userId: socket.id }
const onlineUsers = {};

// Create a secret room ID
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join chat and handle online status
    socket.on("joinChat", async ({ userId, targetUserId }) => {
      onlineUsers[userId] = socket.id; // mark user online

      // Verify connection
      const connected = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
          { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
        ],
      });
      if (!connected) return;

      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);

      // Emit to other user that this user is online
      if (onlineUsers[targetUserId]) {
        io.to(onlineUsers[targetUserId]).emit("userStatus", { userId, isOnline: true });
      }

      // Emit to current user the status of the other user
      const targetOnline = !!onlineUsers[targetUserId];
      socket.emit("userStatus", { userId: targetUserId, isOnline: targetOnline });
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ userId, targetUserId, text }) => {
      try {
        const connected = await ConnectionRequest.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
            { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
          ],
        });
        if (!connected) return;

        const roomId = getSecretRoomId(userId, targetUserId);

        // Find or create chat
        let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } });
        if (!chat) {
          chat = new Chat({ participants: [userId, targetUserId], messages: [] });
        }

        // Add message
        chat.messages.push({ senderId: userId, text });
        await chat.save();

        // Fetch sender info
        const senderUser = await User.findById(userId).select("firstName lastName");

        // Emit message with full sender info
        io.to(roomId).emit("messageReceived", {
          senderId: senderUser._id,
          firstName: senderUser.firstName,
          lastName: senderUser.lastName,
          text,
        });
      } catch (err) {
        console.error(err);
      }
    });

    // Handle disconnect and update online status
    socket.on("disconnect", () => {
      const offlineUserId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      if (offlineUserId) {
        delete onlineUsers[offlineUserId];

        // Notify all users who might be chatting with this user
        io.emit("userStatus", { userId: offlineUserId, isOnline: false });
      }
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
