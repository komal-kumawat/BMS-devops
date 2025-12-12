Create turborepo "npx create-turbo@latest"
using pnpm instead of npm "npm i -g pnpm"

## for database

    1. go to packages and create a folder named "prisma"
    2. cd prisma
    3. initialise package.json "npm init -y"
    4. in package.json -> change name to "@repo/db"
    5. remove scripts section
    6. initialise tsconfig.json "npx tsc --init"
    7. (Extending the base.json from typescript-config)replace everything from tsconfig to
            {

        "extends":"@repo/typescript-config/base.json"
        }
    8. In package.json add
        "@repo/typescript-config": "workspace:*"
        as a devdependency (if using npm then use * instead workspace:*)

    9. In prisma add prisma(ORM)(lets you connect your db easy) as a dependency "pnpm add prisma"
    10. "npx prisma init " (it wil initialise "schema.prisma" where we will write our db logic)

    11. "npx prisma migrate dev " after adding your database url in .env(here we are using neondb ->go to neondb and create a database (postgresql ) and then paste its url in .env and then see the changes in neondb table  section)
    12. generate prisma client ("npx prisma generate)
    13. export prisma client so that our application can use it =>
        1. create a src folder and create a file name "index.ts"
        2. in index.ts
        
            import { PrismaClient } from "@prisma/client/extension";export const client = new PrismaClient();
        
        3. in package.json  add a exports section 
        "exports":{"./client":"./src/index.ts"}
        creating a subroute so that we can import like 
        "import {client} from "@repo/db/client""
    14. in web , ws-server , http-server folder add "@repo/db":"workspace:*" as a dev dependency 


