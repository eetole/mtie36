import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  cuid: { type: 'String', required: true },
  make: { type: 'String', required: true },
  model: { type: 'String', required: true },
  year: { type: 'String', required: true },
  regNumber: { type: 'String', required: false },
  comment: { type: 'String', required: false}
});

export default mongoose.model('Vehicle', vehicleSchema);
