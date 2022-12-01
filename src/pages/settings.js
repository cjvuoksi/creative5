import { useState, useEffect } from 'react'; 
import { useNavigate } from "react-router-dom"; 

function Settings( {settings, setSettings, signIn, setCookie } ) {
    const [list,setList] = useState(); 
    const [pref,setPref] = useState([true,true,true,true,true,true,true,true,true,true]); 
    let navigate = useNavigate(); 

    useEffect(() => {
        if (settings[0]) {
            getPref(); 
            upList(); 
        }
        else {
            navigate("/"); 
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
        console.log("tmpPref: " + tmpPref); 
        setPref(tmpPref); 
    }

    const upSet = async(e) => {
        let tmp = JSON.parse(JSON.stringify(settings)); 
        let index = 0; 
        for (let i of tmp) {
            console.log("I: " + i[Object.keys(i)[0]]);
            console.log("Object keys: " + Object.keys(i)[0]); 
            i[Object.keys(i)[0]] = pref[index]; 
        }
        setCookie(['1s','2s','3s','1p','2p','3p','present','past','pass','part'], pref); 
        signIn(); 
    }

    const upPref = (e) => {
        let index = parseInt(e.target.dataset.index,10);
        let tmp = pref.filter(f => true); 
        tmp[index] = !pref[index]; 
        setPref(tmp); 
    }

    const upList = () => {
            setList(settings.map((item, index) => {
                console.log(item); 
                let value = Object.keys(item)[0]
                return(
                    <div key={value}>
                        <span>{value}</span>
                        <input type="checkbox" data-index={index} checked={pref[index]} onChange={upPref}></input>
                    </div>
                )

            }))
        }

    return (
        <div>
            {list}
            <button onClick={upSet}>Save</button>
        </div>
    )

}

export default Settings; 