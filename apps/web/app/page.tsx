
import {client} from "@repo/db/client"
// import styles from "./page.module.css";


export default async function Home() {
  // const user = await client.user.create({
  //   data: {
  //     username:"komalk",
  //     password:"123456"
  //   }
  // });
  const user  = await client.user.findFirst();
  return (
    <div>
     {user?.username}
     {user?.password}
      
    </div>
  );
}
