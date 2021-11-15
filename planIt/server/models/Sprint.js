import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  isOpen: { type: Boolean },
  projectId: { type: ObjectId, required: true, ref: 'Project' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

SprintSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
