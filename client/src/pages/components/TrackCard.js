import '../../assets/css/components/TrackCard.css';
import AudioPlayer from './AudioPlayer';
export default function TrackCard(props) {
    const round = (x) => {
        return Math.round(x * 100)
    }
    return (
        <div className="track-card">
            <img className="track-image" src={props.image} alt={props.title} />
            <div className="track-card-info">
                <div>
                    <div>
                        <p className="track-card-heading">{props.ranking}. {props.title}</p>
                        <p className="track-card-subheading">{props.artist}</p>
                    </div>
                    <div className="track-features">
                        <p>Acousticness: {round(props.features["acousticness"])}%</p>
                        <p>Danceability: {round(props.features["danceability"])}%</p>
                        <p>Energy: {round(props.features["energy"])}%</p>
                        <p>Liveness: {round(props.features["liveness"])}%</p>
                        <p>Speechiness: {round(props.features["speechiness"])}%</p>
                        <p>Valence: {round(props.features["valence"])}%</p>
                    </div>
                </div>
                <AudioPlayer className="preview-audio-button" url={props.preview_url}/>
            </div>
        </div>
      )
    }