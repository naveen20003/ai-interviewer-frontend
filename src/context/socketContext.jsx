"use client"

import {  createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { tokenStore } from "@/lib/tokenStore";


const SocketContext = createContext(null);
  
export default function SocketProvider({ children }){
        const [socket, setSocket] = useState(null);
        const { accessToken } = useAuth();
        // console.log("accessToken in socketContext", accessToken);
        const token = tokenStore.getToken();
        // console.log("tokenStore getToken in socketContext", token);
        
        
    useEffect(() => {
      // console.log("SocketProvider mounted");
         const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
             auth: {
              accessToken: accessToken
             },
             autoConnect: true,
             reconnection: true,
          });
         setSocket(newSocket);
          const onConnect = () => {
            console.log("Socket connected:", newSocket.id);
          };

          const onDisconnect = () => {
            console.log("Socket disconnected");
          };

          newSocket.on("connect", onConnect);
          newSocket.on("disconnect", onDisconnect);
        //   setSocket(socketInstance);
          return () => {
            // console.log("SocketProvider unmounted");
             newSocket.off("connect", onConnect);
             newSocket.off("disconnect", onDisconnect);
             newSocket?.disconnect();
          }
        }, [accessToken]);
     
    return(
         <SocketContext.Provider value={socket}>
           {children}
         </SocketContext.Provider>
    )
}

export function useSocket() {
    return useContext(SocketContext);
}   