0. After making changes in the realtor-frontend(resizing) run "npm run build" in the terminal

1. Then go into the "build" folder inside the realtor-frontend folder and copy all the contents inside

2. After you've copied them paste them in the (realtor-backend\src\main\resources\static). Basically paste everything in the "static" folder

3. Now, Go in the realtor-backend folder and run "./mvnw spring-boot:run" this in the 1st terminal

4. Install cloudflare then on the same vscode window open a second terminal and run 
cloudflared tunnel --url https://localhost:8443 --no-tls-verify
