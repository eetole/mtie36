import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  cuid: { type: 'String', required: true },
  vehicle_cuid: {type: String, required: true },
  date: { type: 'Date', default: Date.now, required: true },
  mileage: { type: 'Number', required: true },
  description: { type: 'String', required: true },
  responsible: { type: 'String', required: true}
});

export default mongoose.model('Service', serviceSchema);
