import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5002;
const __dirname = path.resolve()

//middleware (parsing the data)
if(process.env.NODE_ENV !== "prodcution") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use(rateLimiter);

//Routes
app.use("/api/notes", notesRoutes);



if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}

//connect to database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("PORT Started on: ", PORT);
    });
});



