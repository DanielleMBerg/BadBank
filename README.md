# BadBank
This was a class assignment. The first version was to practice building a single page application and sharing context throughout. The second version was to practice connecting the front end with a server and database, as well as practicing authentication and authoriozation.

<img width="1470" alt="Screenshot 2023-09-25 at 5 01 00 PM" src="https://github.com/DanielleMBerg/BadBank/assets/124546091/7b92f317-e70b-4553-bc2c-c11961487735">
<img width="1470" alt="Screenshot 2023-09-25 at 5 01 34 PM" src="https://github.com/DanielleMBerg/BadBank/assets/124546091/e07178b2-2ccb-4f4d-838f-f7f36e03f58b">


# How to Run
To run on your own device, git clone the repo.
Open folder in your preferred code editor.
Open terminal within code editor, or navigate to your directory from your main terminal.
Install depdencies by typing in 'npm install'.
Activate build by typing in 'npm run build.'
Start database by typing in 'docker run -p 27017:27017 --name bandbank -d mongo'
Start server by tpying in 'node server.js.'
Navigate to localhost:8080 on your webbrowser.
Enjoy!

# Technology used:
-Docker
-MongoDB
-Express
-React
-React Router
-Bootstrap for styling

# Features
Current features: Able to create an account, login, depost and withdraw to a savings and/or checking account, see your transactions history, update your password, and see all the data. The all data page and create an account page are linked to the server and database.

Future features: Add authentication and authorization. Connect remaining pages and functionality to server and database.

# License
MIT License. See the attached LICENSE file.
