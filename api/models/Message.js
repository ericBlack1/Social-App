// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema(
// 	{
// 		conversationId: {
// 			type: String,
// 		},
//         sender: {
//             type: String,
//         },
//         text: {
//             type: String,
//         },
// 	},
// 	{ timestamps: true }
// );

// module.exports = mongoose.model("Post", MessageSchema);

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

// Check if the model already exists
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = Message;
