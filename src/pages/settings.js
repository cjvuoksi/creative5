import { useState, useEffect } from 'react'; 
import { useNavigate } from "react-router-dom"; 

function Settings( {settings, signIn, setCookie } ) {
    const [list,setList] = useState(); 
    const [pref,setPref] = useState([true,true,true,true,true,true,true,true,true,true,true]);
    const [edits,setEdits] = useState(true); 
    let navigate = useNavigate(); 
    const titles = {"1s":"1st person singular","2s":"2nd person singular","3s":"3rd person singular",
                    "1p":"1st person plural","2p":"2nd person plural","3p":"3rd person plural",
                    "present":"Present","past":"Past","conditional":"Conditional","passives":"Passives","participles":"Participles"}; 
    useEffect(() => {
        if (settings[0]) {
            getPref(); 
            upList(); 
        }
        else {
            navigate("/",{state: "settings"}); 
        }
    }, []); 

    useEffect(() => {
        if(settings[0]) {
            upList(); 
        }
    }, [pref]); 

    const getPref = () => {
        let tmp = JSON.parse(JSON.stringify(settings)); 
        let tmpPref = []; 
        for (let i of tmp) {
            tmpPref.push(i[Object.keys(i)[0]]); 
        }
        setPref(tmpPref); 
    }

    const upSet = async(e) => {
        let tmp = JSON.parse(JSON.stringify(settings)); 
        let index = 0; 
        for (let i of tmp) {
            i[Object.keys(i)[0]] = pref[index]; 
        }
        setCookie(['1s','2s','3s','1p','2p','3p','present','past','cond','pass','part'], pref); 
        signIn();  
        setEdits(true); 
    }

    const upPref = (e) => {
        setEdits(false); 
        let index = parseInt(e.target.dataset.index,10);
        let tmp = pref.filter(f => true); 
        tmp[index] = !pref[index]; 
        setPref(tmp); 
    }

    const upList = () => {
            setList(settings.map((item, index) => {
                let value = Object.keys(item)[0]
                return(
                    <div key={value} className="setting">
                        <p className="setting-text">{titles[value]}</p>
                        <input type="checkbox" data-index={index} checked={pref[index]} onChange={upPref}></input>
                    </div>
                )

            }))
        }

    return (
        <div className="main">
            <h1>Configure quiz</h1>
            <p><i>Check the boxes for tenses, moods, and conjugations you want to study</i></p>
            <div className="settings">
                {list}
            </div>
            <button onClick={upSet} disabled={edits}>Save</button>
        </div>
    )

}

export default Settings; 