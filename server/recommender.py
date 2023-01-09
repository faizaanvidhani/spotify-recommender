import numpy as np

class Recommender:
    """
    Recommender class. Contains methods for finding tracks from new album releases in a particular 
    country similar to a given user's top tracks.
    """

    def main(self, sp):
        """
        Executes logic for finding tracks from new album releases in a particular country similar to a
        user's top tracks. Returns dictionary mapping track IDs to distances from user's top tracks in 
        ascending order.
        """
        top_tracks_ids, top_tracks_info = sp.current_user_top_tracks(limit=10)
        user_tracks_scores = self.compute_user_scores(sp, top_tracks_ids, top_tracks_info)

        country_tracks_ids, country_tracks_info = country_tracks_info = self.get_country_tracks(sp)
        country_tracks_scores = self.compute_country_scores(sp, country_tracks_ids, country_tracks_info)

        sorted_distances = self.calculate_euclidean_distance(user_tracks_scores, country_tracks_scores)
        return sorted_distances


    def get_user_top_tracks(self, sp):
        """
        Returns the following:
        1) list of track IDs for current top 10 tracks for a particular user
        2) list of dictionaries, each containing the ranking, track id, title, artist, image, 
        preview_url, and audio features for a particular track.
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
        Returns the following:
        1) list of track IDs for top 20 latest album releases for a given country
        2) list of dictionaries, each containing the track id, title, artist, image, 
        preview_url, and audio features for a particular track.
        """
        album_releases = sp.new_releases(country_code, limit=10)["albums"]["items"]
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
        Computes the danceability, energy, speechiness, acousticness, instrumentalness, liveness, and 
        valence scores for a list of tracks. Populates each dictionary in the tracks_info list with a
        mapping of 'features' to a dictionary of the audio features for that particular track. 
        """
        feats = sp.audio_features(track_id)[0]
        return {
            "acousticness": feats['acousticness'],
            "danceability": feats['danceability'],
            "energy": feats['energy'],
            "instrumentalness": feats['instrumentalness'],
            "liveness": feats["liveness"],
            "speechiness": feats['speechiness'],
            "valence": feats["valence"]
        }
    
    
    def calculate_euclidean_distance(self, user_tracks_info, country_tracks_info):
        """
        Returns mapping of track IDs to distances from user's top track preferences in
        ascending order.
        """

        for i in range(len(country_tracks_info)):
            dist = 0
            point_1 = np.array(list(country_tracks_info[i]["features"].values()))
            for j in range(len(user_tracks_info)):
                point_2 = np.array(list(user_tracks_info[j]["features"].values()))
                dist += np.linalg.norm(point_1 - point_2)
            country_tracks_info[i]["distance"] = dist
        sorted_country_tracks = sorted(country_tracks_info, key=lambda d:d["distance"])
        tracks_len = min(len(sorted_country_tracks), 10)

        rank = 1
        for track in sorted_country_tracks:
            track["ranking"] = rank
            rank += 1
        return sorted_country_tracks[:tracks_len]
    
    def knn(self, attributes, country_tracks_info):
        """
        Input: 
            -attributes: [acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence]
            -country_tracks_info: list of dictionaries, each containing the track id, 
            title, artist, image, preview_url, and audio features for a particular track
        Output:

        """
        dist = 0
        normalized_attributes =[x / 100 for x in attributes]
        point_1 = np.array(normalized_attributes)
        for i in range(len(country_tracks_info)):
            point_2 = np.array(list(country_tracks_info[i]["features"].values()))
            dist = np.linalg.norm(point_1 - point_2)
            country_tracks_info[i]["distance"] = dist
        sorted_country_tracks = sorted(country_tracks_info, key=lambda d:d["distance"])
        tracks_len = min(len(sorted_country_tracks), 10)
        rank = 1
        for track in sorted_country_tracks:
            track["ranking"] = rank
            rank += 1
        return sorted_country_tracks[:tracks_len]




    
    



    





