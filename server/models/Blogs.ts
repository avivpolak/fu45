import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

blogSchema.set('toJSON', {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export default mongoose.model('Blog', blogSchema);
