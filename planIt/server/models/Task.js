import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true, min: 1, max: 10 },
  isComplete: { type: Boolean, default: false },
  projectId: { type: ObjectId, required: true, ref: 'Project' },
  sprintId: { type: ObjectId, required: true, ref: 'Sprint' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})

TaskSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
