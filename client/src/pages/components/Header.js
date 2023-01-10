import '../../assets/css/components/Header.css';
import axios from 'axios';
import SpotifyLogo from "../..//assets/images/spotify-logo.svg";
import FindIcon from "../..//assets/images/find-icon.svg";
import TopTracksIcon from "../..//assets/images/top-tracks-icon.svg";
import { useNavigate } from 'react-router';


export default function Header() {
    const logOut = async () => {
        try {
            const response = await axios.get('/logout');
            console.log("SUCCESS", response);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };


    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="header-name">
                <p className="header-app-name">Diversify</p>
            </div>
            <div className="header-navbar">
                <div onClick={() => navigate('/find-tracks')} className="nav-container">
                    <p className="header-navbar-text">Find Tracks</p>
                    <img src={FindIcon} className="icon" alt="find tracks icon"></img>
                </div>

                <div onClick={() => navigate('/top-tracks')} className="nav-container">
                    <p className="header-navbar-text">Top Tracks</p>
                    <img src={TopTracksIcon} className="icon" alt="top tracks tracks icon"></img>
                </div>

                <div onClick={logOut} className="nav-container">
                    <p className="header-navbar-text" >Log Out</p>
                    <img src={SpotifyLogo} className="icon" alt="spotify logo"></img>
                </div>
            </div>
        </div>
    )
}