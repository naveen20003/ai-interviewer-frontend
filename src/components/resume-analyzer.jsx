"use client"
import { useState, useEffect } from "react";
import {
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  FileWarningIcon,
  RefreshCwIcon,
  FileUp,
  XIcon,
} from "lucide-react";
import DocsAttachments from "./doc-attachment";
import DropZone from "./drop-zone";
import ResumeEvaluation from "./resume-ats-data";
import { Spinner } from "@/components/ui/spinner"
import { Button } from "./ui/button";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

function ResumeAnalyzer() {
  const [files, setFiles] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [isUploaded, setisUploaded] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [Isdropcomplete, setIsdropcomplete] = useState(false);
 const { accessToken, loading } = useAuth();
  // console.log("files",files[0]);
  const fileData = files[0];
  const formData = new FormData();
  formData.append("image", fileData)
//   for (const [key, value] of formData.entries()) {
//     console.log(key, value);
// }
  // console.log("files",formData.entries());
  // console.log("files",fileData);
  const Thumbs = files.map(file => (
    <div key={file.name}>
       <img src={file.preview} onLoad={() => URL.revokeObjectURL(file.preview)} alt={file.name}/>
    </div>
  ));
  
  const handleSubmit = async() => {
    setClicked(true);
    try {
      const res = await api.post("/grok/resumecheck",formData,{
        onUploadProgress: (ProgressEvent) => {
          const percent = Math.round(
            (ProgressEvent.loaded * 100 )/ ProgressEvent.total
          );
          setPercentage(percent);
        }
      });
      console.log("RefreshaccessToken", accessToken);
      console.log("loading", loading);
      
      // console.log(res.data.data);
      setAnalysis(res.data.data);
      setisUploaded(true);
      setClicked(false);
      setIsdropcomplete(false);
      } catch (error) {
        console.error(error);
      }
    };
    //  useEffect(() => {
    //     const dashData = async () => {
    //       try {
    //       const res = await api.get("/grok/dash");
    //       console.log(res.data.data);
    //       setisUploaded(true);
    //       setAnalysis(res.data.data);
    //       } catch (error) {
    //       console.error("DASHBOARD API ERROR:", error);
    //       }
    //     };
    //   dashData();
    // }, [])
    
    
    useEffect(() => {

    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files])

  // console.log("data", analysis);

  // if (!accessToken) {
  //   return loading
  // }
  
  return (
    <div className="w-full flex flex-col gap-10 max-w-lg md:max-w-3xl">
        {
          Isdropcomplete ? 
           <aside>
             <h4 className="flex justify-center"> Files </h4>
             <DocsAttachments files={files} XIcon={XIcon}/>
           </aside> :
           <DropZone setIsdropcomplete={setIsdropcomplete} setFiles={setFiles} FileUp={FileUp}/>
        }
        <div className="flex justify-center">
          { clicked && <Spinner className="size-8" /> }
        </div>
        <div className="flex justify-center">
          { isUploaded && 
          <ResumeEvaluation analysis={analysis}/>
          }
        </div>
        <div className="flex justify-center">
          { Isdropcomplete && 
            <Button className="bg-primary flex justify-center" size="lg" onClick={handleSubmit}>
              Submit
            </Button> 
          }
        </div>
    </div>
  )
}

export default ResumeAnalyzer;