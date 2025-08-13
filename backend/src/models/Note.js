import mongoose from "mongoose";


const noteSchema =new mongoose.Schema(
    {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
},
 {timestamps: true } //created and updated at this includes date and time
);


const Note = mongoose.model("Note", noteSchema)

export default Note;