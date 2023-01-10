"""
Accessing data on the Spotify platform via Spotipy, a Python library for the Spotify Web API.
https://spotipy.readthedocs.io/en/2.22.0/#spotipy.client.Spotify.auth_manager
"""
from flask import Flask, request, url_for, session, redirect, jsonify
from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
from recommender import Recommender

app = Flask(__name__)

app.secret_key = os.urandom(12).hex()
app.config['SESSION_COOKIE_NAME'] = "USER COOKIE"
TOKEN_INFO = "token_info"

recommender = Recommender()
load_dotenv()

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
        redirect_uri=url_for('callback', _external=True),
        scope="user-top-read")

@app.route('/')
def index():
    return 'home'

@app.route('/login')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return jsonify(auth_url)

@app.route('/callback')
def callback():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code, check_cache=False)
    session[TOKEN_INFO] = token_info
    return redirect("http://localhost:3000/#/find-tracks")

@app.route('/user-top-tracks')
def user_top_tracks():
    try:
        token_info = get_token()
    except:
        # user not logged in
        return redirect("http://localhost:3000/#/")
    sp = spotipy.Spotify(auth=token_info["access_token"])
    results = recommender.get_user_top_tracks(sp)
    return results

@app.route('/logout')
def logout():
    session.pop(TOKEN_INFO, None)
    session.clear()
    if os.path.exists('./.cache'):
        os.remove('./.cache')  
    return "SUCCESS"

@app.route('/search/user-tracks/results/<string:country_code>')
def user_tracks_results(country_code):
    try:
        token_info = get_token()
    except:
        # user not logged in
        return redirect("/")
    sp = spotipy.Spotify(auth=token_info["access_token"])

    user_tracks_info = recommender.get_user_top_tracks(sp)
    country_tracks_info = recommender.get_country_tracks(sp, country_code)
    results = recommender.find_similar_tracks(user_tracks_info, country_tracks_info)
    return jsonify(results)

@app.route('/search/manual-input/results/<string:country_code>', methods =['POST'])
def manual_input_results(country_code):
    try:
        token_info = get_token()
    except:
        # user not logged in
        return redirect("/")
    sp = spotipy.Spotify(auth=token_info["access_token"])
    attributes = request.json
    country_tracks_info = recommender.get_country_tracks(sp, country_code)
    results = recommender.knn(attributes, country_tracks_info)
    return jsonify(results)

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise Exception("ERROR: NULL TOKEN")
    curr_time = int(time.time())
    is_expired = token_info['expires_at'] - curr_time < 60
    if (is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info











    
    



    





