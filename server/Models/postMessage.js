import mongoose, { Mongoose } from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    title_id: Number,
    type:String,
    category: String,
    poster: String,
    genre: [String],
    status:String,
    date: {
        type: Date,
        default: new Date()
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

const postModel = mongoose.model('PostMessage',postSchema);

export default postModel;