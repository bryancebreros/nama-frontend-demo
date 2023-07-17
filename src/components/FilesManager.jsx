import axios from "axios"
import { useState, useEffect } from "react"
import DeleteIcon from "./misc/icons/DeleteIcon"
import PdfIcon from "./misc/icons/PdfIcon"
import Swal from "sweetalert2"
const FilesManager = () => {
    const [files, setFiles] = useState([])
    const [newFiles, setNewFiles] = useState(null)
    const [isHovered, setIsHovered] = useState(null)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        
        axios.get('http://127.0.0.1:5000/files')
            .then(response => {
            console.log(response.data);
            setFiles(response.data.files)
            })
            .catch(error => {
            console.error(error);
            });
          
          
    },[refresh])
    const handleMouseEnter = (file) => {
        setIsHovered(file);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(null);
      };
    const handleFileChange = (e) => {
        const filesToUpload = e.target.files
        const pdfFiles = Array.from(filesToUpload).filter(
            (file) => file.type === 'application/pdf'
        )
        console.log(pdfFiles);
        setNewFiles(pdfFiles);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        for (let i = 0; i < newFiles.length; i++){  
            formData.append('files', newFiles[i])
        }
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            setRefresh(!refresh)
            
            console.log('Upload successful:', response.data);
            setNewFiles(null)
        } catch (err) {
            console.error('Upload error:', err);
        }
    }

    const handleClick = (file) => {
        const requestBody = { files: [file] }
        
        console.log({requestBody});
        Swal.fire({
            title: `Delete "${file}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6A6B6D',
            confirmButtonText: 'DELETE'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:5000/files`, {
                    headers: {
                        'Content-Type': 'application/json'
                        },
                        data: requestBody
                    } 
                )
                .then(response => {
                    setRefresh(!refresh)
                    console.log('Item deleted successfully:', response.data);
                })
                .catch(err => {
                    console.error('Error deleting item:', err);
                });
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            }
            })
    }
       
    
    const btnClass = newFiles? 'm-6 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600' : 'm-6 px-4 opacity-50 py-2 bg-gray-400 text-gray-600 font-semibold rounded'
    return (
    <ul className="fixed  w-10/12 mx-32 justify-center items-center top-0 rounded-md h-screen overflow-y-auto manager">
        {files?.map((file) => (
            <div className="flex items-center ml-3" key={file} >
                <PdfIcon />
                <li className="mx-4 my-2 text-white text-1 list-none hover:cursor-pointer hover:text-red-600" onClick={()=> handleClick(file)} onMouseEnter={() =>handleMouseEnter(file)} onMouseLeave={handleMouseLeave}>{file}</li>
                <span className={isHovered === file ? 'block ' : 'hidden'}><DeleteIcon /></span>
            </div>
        ))}
        <form onSubmit={handleSubmit}>
            <input  id="fileUpload" className="custom-file-input m-4 px-2 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-800" accept=".pdf" onChange={handleFileChange} type="file" multiple />
            <label for="fileUpload" className="custom-file-label">Choose File</label>
            <button className={btnClass} disabled={!newFiles}>ADD FILES</button>
        </form>
        
        
    </ul>
  )
}

export default FilesManager