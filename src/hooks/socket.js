import { useSocket  } from "@/context/socketContext";
import { useEffect } from "react";

function useSocketConnection() {
    const socket = useSocket();
    
    useEffect(() => {
        if(!socket) return;

        const onConnect = () => {
        console.log("socket connected:", socket.id);        
        };

        socket.on("connect", onConnect);
    
        return () => {
        socket.off("connect", onConnect);
        }
    }, [socket]);
    
  return socket;
}

export default useSocketConnection;