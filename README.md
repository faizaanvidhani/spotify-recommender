# Diversify: A Spotify Recommender

Recommends the latest tracks from any country around the world using the KNN algorithm. See below for a preview of the web application (excuse the poor GIF quality!).

<img src="./spotify-recommender.gif" width="1000vw" height="400vh"/>



https://user-images.githubusercontent.com/39887209/211734029-f01d91e0-7c9a-4c8c-b70d-651fe1646d0b.mp4



I wanted to find songs that I liked that were popular in other countries. So, I built a web app using Flask (backend) and React (frontend). 

Instructions for setting up and running this web application:

1. Clone the repository. Setup and activate a virtual environment in the server directory. Install dependencies.

  * To create a virtual env: ```python3 -m venv <name-of-virtual-environment>```
  * To activate virtual env: ```source <name-of-virtual-environment>/bin/activate```
  * To install dependencies: ```pip install -r requirements.txt```

2. Starting the web application

  * Be sure that frontend dependencies have been installed. To install frontend dependencies, execute ```npm install``` in the client directory.
  * To start the client: Navigate to the client directory. Execute ```npm run start-client```
  * To start the server: Navigate to the server directory. Execute ```flask run```. Alternatively, navigate to the client directory. Execute ```npm run start-server```
