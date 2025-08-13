import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailpage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)


  const navigate = useNavigate()

  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error Fetching data",error);
        toast.error("Failed to fetch Note");
      }
      finally{
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const  handleDelete = async () => {
    if(!window.confirm("Are You sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };


  const handleSave = async() => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("please add a title or description");
      return;
    }


    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Update Sucessfully");
      navigate("/");
    } catch (error) {
      console.log("Error in updating:", error);
      toast.error("Failed to Update note");
    }
    finally{
      setSaving(false)
    }
  };


  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }
 
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>



          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Titile
                  </span>
                </label>
                <input 
                className="input input-bordered"
                type="text"
                placeholder="Note title"
                value={note.title}
                onChange={(e) => setNote ({...note, title: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Description
                  </span>
                </label>
                <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Write Description here..."
                value={note.description}
                onChange={(e) => setNote ({...note, description: e.target.value})}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailpage;
