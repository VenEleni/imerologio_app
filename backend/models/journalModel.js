const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  text:{
    type: String,
  },
  emotion:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  },
  tag:{
    type : [String]
  },
  photoUrl:{
    type : String
  },
  user: { //connection between the two models -- DONE
    type: Schema.Types.ObjectId, 
    ref: "User",
    required : true 
  }
}, {
    timestamps: true
});
///have to connect journals with users -- DONE. || have to check if it works -- DONE

const JournalModel = mongoose.model("JournalModel", journalSchema);

module.exports = JournalModel;
