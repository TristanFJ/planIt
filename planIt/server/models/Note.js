import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, required: true },
  projectId: { type: ObjectId, required: true, ref: 'Project' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
