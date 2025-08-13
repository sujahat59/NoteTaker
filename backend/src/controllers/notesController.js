import Note from "../models/Note.js"




//just getting all the notes
export async function getAllNotes(req,res) {
    try {
       const notes = await Note.find().sort({createdAt:-1});
       res.status(200).json(notes)
    } 
    catch (error) {
        console.error("Error in getAllNotes Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}


//getting note by id
export async function getNotesById(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not Found/Invalid deatils"});
        res.json(note);
    } catch (error) {
         console.error("Error in getNotesById Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}



//creating notes here 
export async function createNote(req,res) {
     try {
        const {title, description} = req.body
        const note = new Note({title:title, description:description})

       const savedNote = await note.save()
        res.status(201).json(savedNote)
     } catch (error) {
        console.error("Error in createNote Controller", error);
        res.status(500).json({message: "Internal Server Error"});
     }
}


//updating the existing one's using the id
export async function updateNote(req,res) {
    try {
        const {title, description} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            {title,description},
            {new:true});
        if(!updatedNote) 
            return res.status(404).json({message: "Note not Found"})
        
        res.status(200).json(updatedNote)
    } 
    catch (error) {
        console.error("Error in updateNote Controller", error);
        res.status(500).json({message: "Internal Server Error"});
     }
}

//deleting the note using the id
export async function deleteNote(req,res) {
    try {
        const {title, description} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message: "Cannot delete"})
        res.status(200).json(deletedNote)
    } 
    catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({message: "Internal Server Error"});
     }
}