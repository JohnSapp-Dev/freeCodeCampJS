import { Post } from '../../Models/post.model.js';

const createPost = async (req, res) => {

    try{

        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const post = await Post.create({name, description, age});

        res.status(201).json({
            message: 'Post successfully created', post
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error', err
        });
    }
}

const getPost = async (req, res) => {

    try{

        const getPost = await Post.find();
        res.status(200).json(getPost);

    } catch (err) {
        res.status(500).json({ message: `Internal server error`, error: err });
    }
}

const updatePost = async (req, res) => {

    try{

        //check if body is empty
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: 'No data provided'
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }
        res.status(200).json({
            message: 'Successfully updated post', post
        })

    } catch (err){
        res.status(500).json({ message: "Internal server error: " + err, error: err });
    }
}

const deletePost = async (req, res) => {

    try{

        const deleted = await Post.findByIdAndDelete(req.params.id);

        if(!deleted) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.status(200).json({
            message: "Successfully deleted", deleted
        });

    } catch (err) {

    }
}
export{
    createPost,
    getPost,
    updatePost,
    deletePost
}