import { Fragment, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
const verbs = require("../verbs.json");

function Quiz( { settings, signIn }) {
    const [conj, setConj] = useState({
        present: [],
        past: [],
        conditional: [],
        pass_present: '',
        pass_past: '',
        pass_conditional: '',
        part_pass_past: '',
        part_pass_act: '',
        part_past: '',
        part_act: ''
    }); 
    const [v, setV] = useState('')
    const [vQuiz, setVQuiz] = useState(); 
    const [resp,setResp] = useState(Array(25).fill(''));//FLAG
    const [hidden, setHidden] = useState(true); 
    let navigate = useNavigate()

    useEffect(() => {
        if(!Array.isArray(settings)) {
            navigate('/',{state: 'quiz'}); 
        }
    },[])

    useEffect(() => {
        if(Array.isArray(settings)) {upVQuiz();}
        else {signIn();} 
    }, [conj]); 

    

    useEffect(() => {
        if(Array.isArray(settings)) {
            parseVerb(randomVerb()); 
        }
    },[]);

    useEffect(() => {
        if(Array.isArray(settings)) upVQuiz(); 
    },[resp,hidden])

    const aste = {
        "ks": "ks",
        "sk": "sk",
        "st": "st",
        "tr": "tr",
        "tk": "tk",
        "kl": "kl",
        "pl": "pl",
        "rh": "rh",
        "tg": "tg",
        "rm": "rm",
        "rg": "rg",
        "rj": "rj",
        "kr": "kr",
        "pp": "p",
        "tt": "t",
        "hk": "hj",
        "kk": "k",
        "mp": "mm",
        "nt": "nn",
        "nk": "ng",
        "lp": "lv",
        "lt": "ll",
        "lk": "lj",
        "rp": "rv",
        "rt": "rr",
        "rk": "r",
        "ht": "hd",
        "p": "v",
        "t": "d",
        "k": ''
    }

    const typeSelvi = [ //Selvitä irregulars
        'erit','hirvit','hävit','levit','lämmit','katket','selvit' ,'siit' ,'virit' ,'haljet','iljet','hävet','kiivet','revet','ruvet','langet','kasket','korvet','lohjet','noet','poiket','puhjet','ratket','juljet','kammet','kanget','keret','kerjet','heret','herjet','hirvet','kivet','livet','nimet','piet','ristet','änget'
    ]
    
    const typeLaho = [ //Lahota irregulars eerata
        'lahot','hävit','selvit','virit','hirvit','kasket','kovet','pahet','plärät','suuret', 'vahvet', 'hiljet', 'himmet', 'hirvet','kevet','levet','lievet','lähet','pehmet','selvet','syvet', 'vähet','huorat','aploodeerat',
        'aurat','grillat','harat','huorat','jiirat','ignoorat','jonglöörat','jorat','kairat','klaarat','kurat','luirat','luurat','muurat','naarat','parat','erit', 'vallit', 'karvat'
    ]

    const desc = ['minä','sinä','hän','me','te','he','Present','Past','Conditional','Past passive','Present passive','Past active','Present active']; 

    const randomVerb = () => {
        let flat = []; 
        for (let letter of Object.keys(verbs)) {
            flat = flat.concat(verbs[letter]); 
        }
        return flat[Math.floor(Math.random() * flat.length)];
    }

    const parseVerb = (verb) => { 
        setV(verb); 
        let three = verb.slice(-3); 
        let two = verb.slice(-2); 
        if (two === "da" || two === 'dä') { //Irregular nähdä käydä juoda syödä lyödä tuoda luoda suoda
            let stem = verb.slice(0,-2); 
            let soft = stem; 
            let past = verb.slice(0,-3) + 'i';
            let softPast = past; 
            if (stem.slice(-1) === 'o' || stem.slice(-1) === 'ö' || stem.slice(-1) === 'e') {
                past = stem.slice(0,-2) + stem.slice(-1) + 'i'; 
                softPast = past; 
            }
            if (stem.slice(-3) === "käy") {
                past = stem.slice(0,-1) + 'vi'; 
                softPast = past; 
            }
            if (stem.slice(-1) === 'h') {
                past = stem.slice(0,-1) + 'ki';
                soft = stem.slice(0,-1) + 'e'; 
                stem = stem.slice(0,-1) + 'ke'; 
            }

            let a = verb.slice(-1); 
            setConj({
                present: [
                    soft + 'n',
                    soft + 't',
                    stem,
                    soft + 'mme',
                    soft + 'tte',
                    stem + 'v' + a + 't'
                ],
                past: [
                    softPast + 'n',
                    softPast + 't',
                    past,
                    softPast + 'mme',
                    softPast + 'tte',
                    past + 'v' + a + 't'
                ],
                conditional: [
                    past + 'sin',
                    past + 'sit',
                    past + 'si',
                    past + 'simme',
                    past + 'sitte',
                    past + 'siv' + a + 't'
                ],
                pass_present: verb + a + 'n',
                pass_past: verb.slice(0,-2) + 'tiin',
                pass_conditional: verb.slice(0,-2) + 't' + a + 'isiin',
                part_pass_past: verb.slice(0,-2) + 't' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: verb.slice(0,-2) + 't' + a + 'v' + a,
                part_past: verb.slice(0,-2) + 'n' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            })
        }
        else if (three === "taa" || three === 'tää' || two === "oa" || two === "ua" ||
         two === 'ea' || two === 'ia' || two === 'yä' || two === 'eä' || two === 'iä' ||
         two === 'aa' || two === 'ää') {
            let stem = verb.slice(0,-1); 
            let stemS = stem; 
            let a = verb.slice(-1); 
            let soft = soften(stem); 
            let past = (soft.slice(-1) === a || soft.slice(-1) === 'e' || soft.slice(-1) === 'i') ? soft.slice(0,-1) : soft;
            let condS = (soft.slice(-1) === 'e' || soft.slice(-1) === 'i') ? stem.slice(0,-1) : stem; 
            let pastS = (condS.slice(-1) === a ? condS.slice(0,-1) : condS); 
            let irreg = ['pitää','itää','hoitaa','suotaa','vuotaa','kaataa','mataa','sataa','raataa','noutaa','soutaa','joutaa','syytää','jäytää','hyötää','säätää','sietää','vetää','noutaa']
            if ((past.slice(-4).search('rr') >= 0 || past.slice(-4).search('ll') >= 0|| past.slice(-4).search('nn') >= 0) && two === a + a) {
                past = past.slice(0,-4) + past.slice(-4).replace('rr', 'rs'); 
                pastS = pastS.slice(0,-4) + pastS.slice(-4).replace('rt', 'rs'); 
                past = past.slice(0,-4) + past.slice(-4).replace('ll', 'ls'); 
                pastS = pastS.slice(0,-4) + pastS.slice(-4).replace('lt', 'ls'); 
                past = past.slice(0,-4) + past.slice(-4).replace('nn', 'ns'); 
                pastS = pastS.slice(0,-4) + pastS.slice(-4).replace('nt', 'ns'); 
                
            }
            else if (three === 't' + a + a && verb.slice(-4) !== 'tt' + a + a && verb.slice(-4) !== 'st' + a + a && irreg.indexOf(verb) < 0 ) {
                past = past.slice(0,-2) + past.slice(-2).replace('d','s'); 
                pastS = pastS.slice(0,-2) + pastS.slice(-2).replace('t','s');
                if (verb === 'tietää' || verb === 'taitaa') stemS = stemS.slice(0,-2) + 'n'; 
            }
            if (three === 'kaa' || three === 'paa' || three === 'vaa' || three === 'laa' || verb === "antaa" || verb === "kantaa" || verb === "kaataa" || verb === "mataa" || verb === "saattaa" || verb === "sataa" || verb === 'rataa') {
                if (verb === "antaa" || verb === "kantaa") {
                    past = past.replace('ns','nn'); 
                    pastS = pastS.replace('ns','nt'); 
                } 
                past = past + (a === 'a'? 'o':'ö'); 
                pastS = pastS + (a === 'a'? 'o':'ö'); 
            }
            setConj({
                present: [
                    soft + 'n',
                    soft + 't', 
                    stem + stem.slice(-1),
                    soft + 'mme',
                    soft + 'tte',
                    stem + 'vat'
                ],
                past: [
                    past + 'in',
                    past + 'it',
                    pastS + 'i',
                    past + 'imme',
                    past + 'itte',
                    pastS + 'iv' + a + 't'
                ],
                conditional: [
                    condS + 'isin', 
                    condS + 'isit',
                    condS + 'isi',
                    condS + 'isimme',
                    condS + 'isitte',
                    condS + 'isiv' + a + 't'
                ],
                pass_present: (soft.slice(-1) === a ? soft.slice(0,-1) + 'e' : soft) + 't' + a + a + 'n',
                pass_past: (soft.slice(-1) === a ? soft.slice(0,-1) + 'e' : soft) + 'ttiin',
                pass_conditional: (soft.slice(-1) === a ? soft.slice(0,-1) + 'e' : soft) + 'tt' + a + 'isiin',
                part_pass_past: (soft.slice(-1) === a ? soft.slice(0,-1) + 'e' : soft) + 'tt' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: (soft.slice(-1) === a ? soft.slice(0,-1) + 'e' : soft) + 'tt' + a + 'v' + a,
                part_past: stemS + 'n' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
        else if (three === 'sta' || three === 'stä' || three === 'lla' || three === 'llä' ||
            three === 'rra' || three === 'rrä' || three === "nna" || three === "nnä") {
            let soft = verb.slice(0,-2); 
            verb = harden(verb); 
            let stem = verb.slice(0,-2) + 'e'; 
            let past = verb.slice(0,-2) + 'i'; 
            if (verb === "juosta") { //Irregular juosta
                stem = verb.slice(0,-3) + 'kse'; 
                past = verb.slice(0,-3) + 'ksi'; 
            }
            let a = verb.slice(-1); 
            setConj({
                present: [
                    stem + 'n',
                    stem + 't', 
                    verb !== 'olla' ? stem + stem.slice(-1): 'on', //Irregular olla 
                    stem + 'mme',
                    stem + 'tte',
                    verb !== 'olla' ? stem + 'v' + a + 't': 'ovat'
                    ],
                past: [
                    past + 'n',
                    past + 't',
                    past,
                    past + 'mme',
                    past + 'tte',
                    past + 'v' + a + 't'
                    
                ],
                conditional: [
                    past + 'sin',
                    past + 'sit',
                    past + 'si',
                    past + 'mme',
                    past + 'tte',
                    past + 'siv' + a + 't'
                ],  
                pass_present: soft + (soft.slice(-1) !== 's' ? soft.slice(-1):'t') + a + a + 'n', 
                pass_past: soft + 'tiin',
                pass_conditional: soft + 't' + a + 'isiin',
                part_pass_past: soft + 't' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: soft + 't' + a + 'v' + a,
                part_past: soft + soft.slice(-1) + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
        else if (two[0] === 't') {
            let a = verb.slice(-1); 
            let soft = verb.slice(0,-1); 
            verb = harden(verb); 
            let stem = verb.slice(0,-2); 
            let past = ''; 
            let cond = ''; 
            if (typeLaho.indexOf(soft) >= 0 || soft.search("eerat") >= 0) {
                stem = soft.slice(0,-1); 
            }
            if (typeSelvi.indexOf(soft) >= 0) {
                past = stem + 'si';
                cond = stem + a +'i'; 
                stem += a; 
            } 
            else if (three[0] === 'e' || stem === 'para') {
                past = stem + 'ni';
                cond = past; 
                stem += 'ne'; 
            }
            else if (three[0] === 'i') {
                stem += 'tse'; 
                past = stem.slice(0,-1) + 'i'; 
                cond = past; 
            }
            else if (three[0] === a) {
                past = stem + 'si'; 
                cond = stem + 'i'; 
                stem += a; 
            }
            else {
                past = stem + 'si'; 
                cond = stem + a + 'i'; 
                stem += a; 
            }
            setConj({
                present: [
                    stem + 'n',
                    stem + 't',
                    stem, 
                    stem + 'mme',
                    stem + 'tte',
                    stem + 'v' + a + 't'
                ],
                past: [
                    past + 'n',
                    past + 't',
                    past,
                    past + 'mme',
                    past + 'tte',
                    past + 'v' + a + 't'
                ],
                conditional: [
                    cond + 'sin',
                    cond + 'sit',
                    cond + 'si',
                    cond + 'simme',
                    cond + 'sitte',
                    cond + 'siv' + a + 't'
                ],
                pass_present: soft + a + a + 'n',
                pass_past: soft + 'tiin',
                pass_conditional: soft + 't' + a + 'isiin',
                part_pass_past: soft + 't' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: soft + 't' + a + 'v' + a,
                part_past: soft.slice(0,-1) + 'nn' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
    }

    const soften = (text) => {
        let three = text.slice(-3); 
        text = text.slice(0,-3); 
        let vaihtelu = true; 
        for (let i of Object.keys(aste)) {
            if (vaihtelu && three.search(i) >= 0) {
                three = three.replace(i, aste[i]);
                vaihtelu = false; 
            }
        }
        return (text + three); 
    }
    const isVowel = (char) => {
        for (let i of ['a','e','i','o','u','y','ä','ö']){
            if (i === char) {
                return true; 
            }
        }
        return false; 
    }

    const harden = (text) => {
        let begin = '' 
        let end = ''
        let vahva = ['ll','it','et','at','ät','ot']
        let index = -1; 
        for (let i of vahva) {
            index = text.lastIndexOf(i) > index ? text.lastIndexOf(i) : index; 
        }
        if (index >= 2) {
            end = text.slice(index); 
            if (end.search('ll') !== -1) {
                if (index <= 3) {
                    return text; 
                }
                begin = text.slice(0,index-3); 
                end = text.slice(index); 
                text = text.slice(index-3, index);
            }
            else {
                begin = text.slice(0,index-2); 
                text = text.slice(index-2, index);
            }
            let vaihtelu = true; 
            if (isVowel(text[1])) {
                if (end.search('ll') === -1) text += 'k';
                vaihtelu = false; 
            }
            for (let j of Object.keys(aste)) {
                if (vaihtelu && text.search(aste[j]) >= 0 && aste[j]) {
                    if (text.search(j) < 0) {
                        text = text.replace(aste[j], j);
                    }
                    vaihtelu = false; 
                }
            }
        }
        return (begin + text + end); 
    }

    const upResp = (e) => {
        let val = e.target.value; 
        let index = e.target.dataset.index; 
        let tmp = resp.filter(q => {return true});
        tmp[index] = val; 
        setResp(tmp); 
    }

    const upVQuiz = () => {
        let quiz = []
        let person = [settings[0]['1s'],settings[1]['2s'],settings[2]['3s'],settings[3]['1p'],settings[4]['2p'],settings[5]['3p']] 
        let present = settings[6]['present'];
        let past = settings[7]['past']; 
        let cond = settings[8]['conditional']; 
        let pass = settings[9]['passives'];
        let part = settings[10]['participles']; 
        
        for (let i = 0; i < conj.present.length; i++) {
            if (person[i] && present) {
                quiz.push(conj.present[i]);
            }
            else {
                quiz.push(''); //FLAG
            }
        }
        for (let i = 0; i < conj.past.length; i++) {
            if (person[i] && past) {
                quiz.push(conj.past[i]);
            }
            else {
                quiz.push(''); //FLAG
            }
        }
        for (let i = 0; i < conj.conditional.length; i++) {
            if (person[i] && cond) {
                quiz.push(conj.conditional[i]);
            }
            else {
                quiz.push(''); //FLAG
            }
        }
        if (pass) {
            quiz.push(conj.pass_present); 
            quiz.push(conj.pass_past);
            quiz.push(conj.pass_conditional); 
        }
        else {
            quiz.push(''); quiz.push(''); quiz.push(''); //FLAG
        }
        if (part) { //FLAG
            quiz.push(conj.part_pass_past); 
            quiz.push(conj.part_pass_act);
            quiz.push(conj.part_past);
            quiz.push(conj.part_act); 
        }
        else {
            quiz.push(''); quiz.push(''); quiz.push(''); quiz.push('');//FLAG
        }
        setVQuiz(quiz.map((value, index) => {
            return (
                <Fragment key={index}>
                    {present && index === 0 ? <h2>Present tense</h2> : ''}
                    {past && index === 6 ? <h2>Past tense</h2>: ''}
                    {cond && index === 12 ? <h2>Conditional</h2>: ''}
                    {index / 3 < 6 && value ? 
                        <div className="quizIn">
                            <p className="quiz-desc">{desc[index % 6]}</p>
                            <div className="setting-text">
                                <input data-index={index} onChange={upResp} value={resp[index]}></input>
                            </div>
                            <p className={[(hidden ? 'hidden': ''),(resp[index].toLowerCase() === value ? 'correct':'wrong'),"setting-text"].join(' ')}>{value}</p>
                        </div> : '' }
                    {index >= 18 ? 
                        <Fragment>
                            {pass && index === 18 ? <h2>Passives</h2>: ''}
                            {part && index === 21 ? <h2>Participles</h2>: ''}
                            {(pass && value && index >= 18 && index < 21) ? 
                                <div className="quizIn">
                                    <p className="quiz-desc">{desc[index-12]}</p>
                                    <div className="setting-text">
                                        <input data-index={index} onChange={upResp} value={resp[index]}></input>
                                    </div>
                                    <p className={[(hidden ? 'hidden': ''), (resp[index].toLowerCase() === value ? 'correct':'wrong'),"setting-text"].join(' ')}>{value}</p>
                                </div> : " " }
                            {(part && value && index >=21) ? 
                            <div className="quizIn">
                                <p className="quiz-desc">{desc[index-12]}</p>
                                <div className="setting-text">
                                    <input data-index={index} onChange={upResp} value={resp[index]}></input>
                                </div>
                                <p className={[(hidden ? 'hidden': ''), (resp[index].toLowerCase() === value ? 'correct':'wrong'),"setting-text"].join(' ')}>{value}</p>
                            </div> : " " }

                        </Fragment> : ''}
                </Fragment>
            )
        }));  
    }

    const nextVerb = async(e) => {
        e.target.innerHTML = "Submit"; 
        setResp(Array(25).fill('')); 
        setHidden(true); 
        parseVerb(randomVerb()); 
    }

    const submitResp = (e) => {
        e.target.innerHTML = "Next"; 
        setHidden(false)
    }

    //DEBUG BUTTONS
    // 
    // <button onClick={() => console.log(resp)}>Log response</button>
    // <button onClick={() => console.log(key)}>Log key</button>
    // <input placeholder="tense" defaultValue="" onChange={e => parseVerb(e.target.value)}></input>
    // <button onClick={() => {console.log(conj);console.log(resp)}}>Log conjugations</button>
    // <input placeholder="tense" defaultValue="" onChange={e => parseVerb(e.target.value)}></input>
    // <button onClick={() => {console.log(conj);console.log(resp)}}>Log conjugations</button>

    return(
        <div className="main">
            <a className="verb" href={"https://translate.google.com/?sl=fi&tl=en&text=" + v + "&op=translate"} target="_blank">{v.toUpperCase()[0] + v.slice(1)}</a>
            <div className="quizContainer">
                {vQuiz}
            </div>
            <button onClick={hidden ? submitResp : nextVerb}>Submit</button>
        </div>
    )
}

export default Quiz; 