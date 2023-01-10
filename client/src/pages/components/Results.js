import TrackCard from './TrackCard';
import '../../assets/css/components/Results.css';
  
export default function Results(props) {
    return (
      <div className="section">
        <p className="results-heading">Results</p>
        <div className="results">
            {props.results.map((item, index) => (
                <TrackCard 
                    key={index} 
                    ranking={item.ranking}
                    title={item.title} 
                    artist={item.artist}
                    features={item.features}
                    image={item.image} 
                    preview_url={item.preview_url}/>
                ))
            }
        </div>
        
      </div>
    );
  };