import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  url: { type: String },
  prefurl: { type: String },
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
 clicks: {
  type: Number,
  default: 0
},
clickHistory: [
  {
    timestamp: {
      type: Date,
      default: Date.now,
    }
  }
],
  createdAt:{type:Date, default:Date.now()},
  updatedAt:{type:Date, default:Date.now()}
});

// Optional: prevent model overwrite errors during hot reload
const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);

export default Url;
