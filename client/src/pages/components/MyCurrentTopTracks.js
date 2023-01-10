import '../../assets/css/components/MyCurrentTopTracks.css';
  
export default function MyCurrentTopTracks(props) {
    return (
        <div>
            {props.tracks.map((item, index) => (
                <p key={index} className="section-body">{item.ranking}. {item.title}</p>
                ))
            }
        </div>
    );
  };