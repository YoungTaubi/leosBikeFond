const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const donationSchema = new Schema(
  {
    amount: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Donation = model("Donation", donationSchema);

module.exports = Donation;
