# Aim
- Deploying a monorepo (http , ws , prisma , postgres , nextjs)
- env variables
- dev vs prod enviroments , periodic releases
- Testing in CI pipelines
- Cert managment
- CD pipeline to refresh certs every month
- CD pipeline to copy the prod DB to dev every day




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

            import { PrismaClient } from "../generated/prisma/index.js";

            export const client = new PrismaClient();


        3. in package.json  add a exports section
        "exports":{"./client":"./src/index.ts"}
        creating a subroute so that we can import like
        "import {client} from "@repo/db/client""
    14. in web , ws-server , http-server folder add "@repo/db":"workspace:*" as a dev dependency .

## http-server and ws-server:- 
    1. npm init -y 
    2. npx tsc --init
    
    3. in tsconfig.json
        {

            "extends":"@repo/typescript-config/base.json",
            "compilerOptions": {
                "rootDir": "./src",
                "outDir": "./dist"
            }
        }
    4. in package.json
        "devDependencies": {
            "@repo/db":"workspace:*",
            "@repo/typescript-config":"workspace:*"

        },
        in stripts add  
           "build":"tsc -b",
            "dev":"npm run build && npm run start",
            "start":"node dist/index.ts"
        
    5. create a src folder and create a file index.ts
    6. write basic express code and websocket code in index.ts of  http-server and ws-server respectively and connect them to the database

## next js application (in apps folder->web->app->page.tsx)
    1. write basic nextjs code 


# Deployment steps

1. Create 2 servers
2. Add node , nginx to both the servers 
3. Clone the monorepo to both the servers
4. Start 3 processes (next , ws , http) using pm2
5. Point our domain names to the respective servers
* week-25-http
* week-25-ws
* week-25-fe

+ staging.week-25-http
+ staging.week-25-ws
+ staging.week-25-fe

6. Refresh nginx config
7. Test that everything is working


### How to create ssh key
- on terminal write:-
    - ssh-keygen 
    - then enter where you want to save the ssh key(/Users/komalkumawat/.ssh/id_rsa_do)
    - for finding the ssh key write 
        - cat ~/.ssh/id_rsa_do (id_rsa_do is the name of the ssh key)
        - cat ~/.ssh/id_rsa_do.pub (for accessing public key )


### For Adding node in both dev and prod
- Add nvm using (digital ocean nvm node install documentation ) follow all commands
use this bash command ("curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash")

- then ("source ~/.bashrc")

### install nginx in both 
- sudo apt-get upgrade
- sudo apt update
- sudo apt install nginx


### create domains on domains.squarespace.com for all 6
* week-25-http
* week-25-ws
* week-25-fe

+ staging.week-25-http
+ staging.week-25-ws
+ staging.week-25-fe

#### Store private key in github secrets
- Go to github repo 
- go to settings
- go to secrets and variables
- click on actions 
- click on new repo secret
- name it and paste the ssh private key in secret


