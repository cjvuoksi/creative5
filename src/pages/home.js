import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

function Home() {
    const { state } = useLocation();
    console.log(state);
    let navigate = useNavigate(); 
    
    useEffect(() => {
        if (state) {
            let redir = "/" + state;
            navigate(redir); 
        }
    },[])

    return(
        <div className="landing main">
            <div className="landing-body">
            <Link to="/quiz" className="landing-link">Start practicing</Link>
            <Link to="/settings" className="landing-link">Configure practice</Link>   
            </div>
            <a href="https://en.wikipedia.org/wiki/Finnish_verb_conjugation" target="_blank">Learn conjugations</a>
            <a href="https://kaino.kotus.fi/visk/sisallys.php?p=105" target="_blank">Opi taivutuksia suomeksi</a>
        </div>
    )
}

export default Home