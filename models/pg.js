import mongoose from 'mongoose'

let PGSchema = new mongoose.Schema({
  buque: { type: String, required: true },
  fams: { type: String, required: true },
  familles: { type: [Number], required: true },
  tabagns: { type: String, enum: ['cl', 'ch', 'li', 'an', 'bo', 'ai', 'me', 'ka', 'pa'], required: true },
  millesime: { type: Number, required: true }
})

export let PG = mongoose.model('PG', PGSchema)
