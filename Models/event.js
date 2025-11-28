import mongoose from 'mongoose';

// Define the event schema
const eventSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  location: String,
  startDate: Date,
  endDate: Date,
  
},{collation: 'AwesomeEvents', versionKey: false});

export default mongoose.model("Event", eventSchema);