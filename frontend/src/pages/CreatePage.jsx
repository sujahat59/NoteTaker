
import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate} from "react-router"
import api from "../lib/axios.js";


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(!title.trim() || !description.trim()){
      toast.error("All fields are required");
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        description
      })

      toast.success("Note created Sucessfully!")
      
    } catch (error) {
      console.log("Error creating note",error)
      if(error.response.status === 429 ) {
        toast.error("Slow down dude! you are doing way too fast!", {
          duration:4000,
          icon:"🤚🏻",
        });
      }else{
        toast.error("Failed to create note ")
      }
    }
    finally{
      setLoading(false)
    }
  };


  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className=" max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            BACK TO NOTES
          </Link>

          <div className="bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}> 
                <div className="form-control mb-4">
                  <label className="label" >
                    <span className="label-text ">
                      Title
                    </span>
                    <input 
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                  </label>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    placeholder="Write the note here..."
                    className="textarea textarea-bordered h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={loading} type="submit">
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreatePage
