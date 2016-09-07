import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

let AccountSchema = new mongoose.Schema({
  username: { type: String, required: true }
})

AccountSchema.plugin(passportLocalMongoose)

export let Account = mongoose.model('Account', AccountSchema)
