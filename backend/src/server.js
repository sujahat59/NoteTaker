import "dotenv/config";
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5002;

//middleware (parsing the data)
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use(rateLimiter);

//Routes
app.use("/api/notes", notesRoutes);

//connect to database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("PORT Started on: ", PORT);
    });
});
