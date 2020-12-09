import PostMessage from '../Models/postMessage.js';
import Category from '../Models/Category.js';

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostMessage(body);
    try {
       await newPost.save();
       const type = req.body.category;
       await PostMessage.find()
                .then(data => {
                    console.log(data);
                    if(data.movie_id === body.movie_id) {
                        res.status(200).json({message: 'Already Saved'});
                    }
                })
                .catch(error => {
                        res.status(404).json({message: error.message});
                });
       await Category.find()
        .then(data => {
            let isTypePresent = data.findIndex(type);
            if(isTypePresent === -1) {
                let newData = [...data];
                newData.push(type);
                Category.updateOne({category: data}, {category: newData});
            }
        })
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}