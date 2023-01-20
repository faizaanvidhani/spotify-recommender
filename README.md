# Diversify: A Spotify Recommender

Diversify recommends the latest tracks from any country around the world using the KNN algorithm. It displays personalized recommendations based on a user's music taste. 

https://user-images.githubusercontent.com/39887209/211734609-afccfb02-38a8-412d-b52b-99f9e384ddf0.mp4

I wanted to find songs that I liked that were popular in other countries. So, I built a web app using Flask (backend) and React (frontend). The website is live at https://faizaanvidhani.github.io/spotify-recommender/. Since Heroku has ended its free tier, the backend has not been deployed. However, a demo of the web app using the local development server is shown above.

Instructions for setting up and running this web application:

1. Clone the repository. Setup and activate a virtual environment in the server directory. Install dependencies.

  * To create a virtual env: ```python3 -m venv <name-of-virtual-environment>```
  * To activate virtual env: ```source <name-of-virtual-environment>/bin/activate```
  * To install dependencies: ```pip install -r requirements.txt```

2. Starting the web application

  * To start the client: Navigate to the client directory. Execute ```npm run start```
  * To start the server: Navigate to the server directory. Execute ```flask run```. Alternatively, navigate to the client directory. Execute ```npm run start-server```
