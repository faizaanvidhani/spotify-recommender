import numpy as np

class Recommender:
    """
    Finds tracks from new album releases in a particular country similar to a user's top tracks
    or manually-inputted audio features.
    """

    def get_user_top_tracks(self, sp):
        """
        Fetches user's current top tracks.
        Input:
            -sp: SpotifyOAuth object
        Output:
            -top_tracks_info: list of dictionaries, each containing the ranking, track id, title, 
            artist, image, preview_url, and audio features for a particular track.
        """
        user_tracks_info = sp.current_user_top_tracks(limit=10)
        top_tracks_info = []
        track_ranking = 0
        for track in user_tracks_info["items"]:
            track_info = {}
            track_ranking += 1
            track_info["ranking"] = track_ranking
            track_info["id"] = track["id"]
            track_info["title"] = track["name"]
            track_info["artist"] = track["album"]["artists"][0]["name"]
            track_info["image"] = track["album"]["images"][0]["url"]
            track_info["preview_url"] = track["preview_url"]
            track_info["features"] = self.find_audio_features(sp, track["id"])
            top_tracks_info.append(track_info)
        return top_tracks_info

    def get_country_tracks(self, sp, country_code):
        """
        Fetches the latest tracks in a particular country.
        Input:
            -sp: SpotifyOAuth object
            -country_code: ISO 3166-1 alpha-2 country code.
        Output:
            -country_tracks_info: list of dictionaries, each containing the ranking, track id, title, 
            artist, image, preview_url, and audio features for a particular track.
        """
        album_releases = sp.new_releases(country_code, limit=20)["albums"]["items"]
        country_tracks_info = []
        for album in album_releases:
            tracks = sp.album_tracks(album["id"], limit=50)["items"]
            for track in tracks:
                track_info = {}
                track_info["ranking"] = 0
                track_info["id"] = track["id"]
                track_info["title"] = track["name"]
                track_info["artist"] = track["artists"][0]["name"]
                track_info["image"] = album["images"][0]["url"]
                track_info["preview_url"] = track["preview_url"]
                track_info["features"] = self.find_audio_features(sp, track["id"])
                country_tracks_info.append(track_info)
        return country_tracks_info

    def find_audio_features(self, sp, track_id):
        """
        Computes the danceability, energy, speechiness, acousticness, liveness, and 
        valence scores for a particular track. 
        Input:
            -sp: SpotifyOAuth object
            -track_id: track_id that corresponds to a particular track
        Output:
            -dictionary mapping audio features to their respective scores
        """
        feats = sp.audio_features(track_id)[0]
        return {
            "acousticness": feats['acousticness'],
            "danceability": feats['danceability'],
            "energy": feats['energy'],
            "liveness": feats["liveness"],
            "speechiness": feats['speechiness'],
            "valence": feats["valence"]
        }
    
    def find_similar_tracks(self, user_tracks_info, country_tracks_info):
        """
        Finds the 10 tracks most similar to a user's current top tracks.
        Input:
            -user_tracks_info: list of dictionaries, each containing the ranking, track id, title, 
            artist, image, preview_url, and audio features for a particular track.
            -country_tracks_info: list of dictionaries, each containing the track id, 
            title, artist, image, preview_url, audio features, and DISTANCE for a particular track
        Output:
            -sorted_country_tracks: ordered list of dictionaries of size 10, each containing the 
            track id, title, artist, image, preview_url, audio features, distance, and RANKING 
            for a particular track
        """
        for i in range(len(country_tracks_info)):
            dist = 0
            point_1 = np.array(list(country_tracks_info[i]["features"].values()))
            for j in range(len(user_tracks_info)):
                point_2 = np.array(list(user_tracks_info[j]["features"].values()))
                dist += np.linalg.norm(point_1 - point_2)
            country_tracks_info[i]["distance"] = dist
        return self.sort_tracks(country_tracks_info)
    
    def knn(self, attributes, country_tracks_info):
        """
        Finds the 10 tracks most similar to a particular attributes list. Computes the similarity 
        score between the audio features list of a particular track and the inputted attributes list 
        for all tracks.
        Input: 
            -attributes: [acousticness, danceability, energy, liveness, speechiness, valence]
            -country_tracks_info: list of dictionaries, each containing the track id, 
            title, artist, image, preview_url, and AUDIO FEATURES for a particular track
        Output:
            -sorted_country_tracks: ordered list of dictionaries of size 10, each containing the 
            track id, title, artist, image, preview_url, audio features, distance, and RANKING 
            for a particular track
        """
        dist = 0
        normalized_attributes =[x / 100 for x in attributes]
        point_1 = np.array(normalized_attributes)
        for i in range(len(country_tracks_info)):
            point_2 = np.array(list(country_tracks_info[i]["features"].values()))
            dist = np.linalg.norm(point_1 - point_2)
            country_tracks_info[i]["distance"] = dist
        return self.sort_tracks(country_tracks_info)
        
    def sort_tracks(self, country_tracks_info):
        """
        Finds the top 10 tracks most similar to a user's preference. Uses the calculated distances
        to output an ordered list of of up to 10 dictionaries, where each dictionary corresponds to a 
        particular track. 

        Input:
            -country_tracks_info: list of dictionaries, each containing the track id, 
            title, artist, image, preview_url, audio features, and DISTANCE for a particular track
        Output:
            -sorted_country_tracks: ordered list of dictionaries of size 10, each containing the 
            track id, title, artist, image, preview_url, audio features, distance, and RANKING 
            for a particular track
        """
        sorted_country_tracks = sorted(country_tracks_info, key=lambda d:d["distance"])
        tracks_len = min(len(sorted_country_tracks), 10)
        rank = 1
        for track in sorted_country_tracks:
            track["ranking"] = rank
            rank += 1
        return sorted_country_tracks[:tracks_len]




    
    



    





