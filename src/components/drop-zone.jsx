
import {useDropzone} from "react-dropzone";


function DropZone({ setIsdropcomplete, setFiles, FileUp }) {
    const { getRootProps, getInputProps} = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      setIsdropcomplete(true);
    }
  });
  return (
     <div className="w-full h-50 border-2 border-dashed border-purple-500 bg-card text-slate-400">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center" {...getRootProps()}>
            <FileUp className="w-10 h-10"/>
            <input {...getInputProps()}/>
            <h2>Drop Your Resume Here</h2>
        </div>
    </div>
  )
}

export default DropZone;