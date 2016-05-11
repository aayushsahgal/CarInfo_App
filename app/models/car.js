// Loading mongoose module
import mongoose from 'mongoose';

// Creating a schema for the Car model
let carSchema = new mongoose.Schema({

  id: { type : Number },
  make: { type : String },
  model: { type : String },
  year: { type : Number }

});

// Exporting the model so that it could be used for CRUD operations
export default mongoose.model('Car', carSchema);