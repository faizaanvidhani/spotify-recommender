# spotify-recommender
Recommends the latest tracks from any country around the world using the KNN algorithm.

Commands for setting up this application in a virtual environment:

1. Clone the repository. Setup and activate a virtual environment in the server directory. Install dependencies.

  * To create a virtual env: ```python3 -m venv <name-of-virtual-environment>```
  * To activate virtual env: ```source <name-of-virtual-environment>/bin/activate```
  * To install dependencies: ```pip install -r requirements.txt```

2. Starting the web application

  * To start the client: Navigate to the client directory. Execute ```npm run start-client```
  * To start the server: Navigate to the server directory. Execute ```flask run```. Alternatively, navigate to the client directory. Execute ```npm run start-server```
