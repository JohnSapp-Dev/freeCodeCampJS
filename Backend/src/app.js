import express from "express"

const app = express(); //create an express app

app.use(express.json());

//routes import
import userRouter from "../routes/user.route.js";
import postRouter from "../routes/post.route.js";

//routes declaration
//example route: http://localhost:4000/api/v1/users/register
app.use("/api/v1/users", userRouter);
//example route: http://localhost:4000/api/v1/post/create
app.use("/api/v1/posts", postRouter);




export default app;