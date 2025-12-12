
import {client} from "@repo/db/client"
// import styles from "./page.module.css";


export default async function Home() {
  const user = await client.user.findFirst();
  return (
    <div>
     {user?.username}
     {user?.password}
      
    </div>
  );
}
