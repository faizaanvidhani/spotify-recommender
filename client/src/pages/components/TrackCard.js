import '../../assets/css/components/TrackCard.css';
export default function TrackCard(props) {
    const round = (x) => {
        return Math.round(x * 100)
    }
    return (
        <div className="track-card">
            <img className="track-image" src={props.image} alt={props.title} />
            <div className="track-card-info">
                <div>
                    <p className="track-card-heading">{props.ranking}. {props.title}</p>
                    <p className="track-card-subheading">{props.artist}</p>
                </div>

                <div className="track-features">
                    <p>Acousticness: {round(props.features["acousticness"])}%</p>
                    <p>Danceability: {round(props.features["danceability"])}%</p>
                    <p>Energy: {round(props.features["energy"])}%</p>
                    <p>Instrumentalness: {round(props.features["instrumentalness"])}%</p>
                    <p>Liveness: {round(props.features["liveness"])}%</p>
                    <p>Speechiness: {round(props.features["speechiness"])}%</p>
                    <p>Valence: {round(props.features["valence"])}%</p>

                </div>
            </div>
        </div>
       
      
      )
    }