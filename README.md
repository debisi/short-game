## Prerequisites ## 

Install .NET 8 SDK  

Install SQL Server Express  

Install Node.js 22.x  



## Settings ## 

This project uses SQL Server database for storing data. To set up your environment:  
Open appsetting.json > ConnectionStrings and change:  
 #DB_DATA_SOURCE (put your server name)  
 #USER_ID (put your user name)  
 #DB_PASSWORD (put your password)  
 #Game_DB (add this db in SQL Server)  
 #Tables and records will be created automatically from the migration if the ConnectionString is set correctly!  


This project uses Google OAuth authentication. To set up your environment:  
Go to your Google Cloud Consoleto > APIs & Services > Credentials > Edit your OAuth 2.0 Client ID:  
 #Add the following to "Authorized JavaScript origins": https://localhost:5173  
 #And the following to "Authorized redirect URIs": https://localhost:7157/signin-google  
Open appsetting.json > Authentication and change:  
 #CLIENT_ID (put client_id from Google Cloud Console)  
 #CLIENT_SECRET (put user_id from Google Cloud Console)  


Backend server is running on port: 7157  
Frontend is running on port: 5173  



## Scripts ##  

Run this command in React terminal to install node_modules: npm install  

This project uses HTTPS for authentication (Google OAuth) and secure cookies. To set up your environment:  
 #Generate local HTTPS certificate for the frontend (Vite) run this in React terminal: npm run cert  
 #Generatelocal HTTPS certificate for .NET backend run this in .Net terminal: dotnet dev-certs https --trust  



## Run Project ##  

Start the backend server (run this command in .Net terminal): dotnet run  

Start the frontend (run this command in React terminal): npm run dev  





