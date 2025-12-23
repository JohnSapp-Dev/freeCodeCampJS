import { User } from '../../Models/user.model.js';

const registerUser = async (req, res) => {

    try{
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password || !password.length) {
            return res.status(400).json({ message: 'Username and password is required' });
        }

        // check if user exist
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: 'User successfully registered',
            user:{ id: user._id, email: user.email, username: user.username}
        });

    } catch (err){
        res.status(500).json({ message: `Internal server error: ${err}`, error: err });
    }
};

const loginUser = async (req, res) => {

    try{
        //check if user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        //check passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password', error: err});
        }

        res.status(200).json({
            message: 'User successfully logged in',
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        })
    }catch(err){
        res.status(500).json({ message: `Internal server error`, error: err });
    }

};

const logoutUser = async (req, res) => {

    try{
        const { email } = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        res.status(200).json({
            message: 'User successfully logged out',
        });

    } catch(err) {
        res.status(500).json({ message: `Internal server error`, error: err });
    }
}

export{
    registerUser,
    loginUser,
    logoutUser,
}