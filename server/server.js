require("dotenv").config()
const express = require("express");
const connectDB = require("./utils/db");
const expenseRouter = require("./routers/expenseRouter")
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/", expenseRouter);
app.use("/user", userRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
