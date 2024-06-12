const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

// Check if the model already exists
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
