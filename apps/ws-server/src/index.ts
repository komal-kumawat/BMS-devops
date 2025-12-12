import {WebSocketServer} from "ws";
import {client} from "@repo/db/client"

const server = new WebSocketServer({
    port:3001
});

server.on("connection" , async(socket)=>{
    socket.send("hii there connected to the server")

    const user = await client.user.create({
        data:{
            username:Math.random().toString(),
            password:Math.random().toString()
        }
    })
    console.log(user);
    socket.send(`${user.id}`);
})
