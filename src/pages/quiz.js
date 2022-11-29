import { lastIndexOf, replace } from 'lodash';
import { useEffect, useState } from 'react'; 
const verbs = require("../verbs.json");

function Quiz() {
    const [conj, setConj] = useState({
        present: [

        ],
        past: [

        ],
        conditional: [

        ],
        pass_present: '',
        pass_past: '',
        pass_conditional: '',
        part_pass_past: '',
        part_pass_act: '',
        part_past: '',
        part_act: ''
    }); 
    const aste = {
        "ks": "ks",
        "st": "st",
        "pp": "p",
        "tt": "t",
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
        "hk": "h",
        "p": "v",
        "t": "d",
        "k": ''
    }

    



    const randomVerb = () => {
        let flat = []; 
        for (let letter of Object.keys(verbs)) {
            flat = flat.concat(verbs[letter]); 
        }
        return flat[Math.floor(Math.random() * flat.length)];
    }

    const parseVerb = () => {
        let verb = 'tulla'
        console.log(verb); 
        let three = verb.slice(-3); 
        let two = verb.slice(-2); 
        if (two === "da" || two === 'dä') { //Irregular nähdä käydä juoda syödä
            let stem = verb.slice(0,-2); 
            let past = verb.slice(0,-3) + 'i';
            let a = verb.slice(-1); 
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
                    past + 'sin',
                    past + 'sit',
                    past + 'si',
                    past + 'simme',
                    past + 'sitte',
                    past + 'siv' + a + 't'
                ],
                pass_present: verb + a + 'n',
                pass_past: stem + 'tiin',
                pass_conditional: stem + 't' + a + 'isiin',
                part_pass_past: stem + 't' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: stem + 't' + a + 'v' + a,
                part_past: stem + 'n' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            })
        }
        else if (three === "taa" || three === 'tää' || two === "oa" || two === "ua" ||
         two === 'ea' || two === 'ia' || two === 'yä' || two === 'eä' || two === 'iä' ||
         two === 'aa' || two === 'ää') {
            let stem = verb.slice(0,-1); 
            let a = verb.slice(-1); 
            let soft = soften(stem); 
            console.log("Softened stem: " + soft);
            let past = (soft.slice(-1) === a || soft.slice(-1) === 'e' || soft.slice(-1) === 'i') ? soft.slice(0,-1) : soft;
            let condS = (soft.slice(-1) === a || soft.slice(-1) === 'e' || soft.slice(-1) === 'i') ? stem.slice(0,-1) : stem; 
            let pastS = condS; 
            if (past.slice(-4).search('rr')) {
                past = past.replace('rr', 'rs'); 
                pastS = pastS.replace('rt', 'rs')
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
                part_past: stem + 'n' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
        else if (three === 'sta' || three === 'stä' || three === 'lla' || three === 'llä' ||
            three === 'rra' || three === 'rrä' || three === "nna" || three === "nnä") {
            let soft = verb.slice(0,-2); 
            verb = harden(verb); 
            let stem = verb.slice(0,-2) + 'e'; 
            let past = verb.slice(0,-2) + 'i'; 
            if (verb === "juosta") {
                stem = verb.slice(0,-3) + 'kse'; 
                past = verb.slice(0,-3) + 'ksi'; 
            }
            let a = verb.slice(-1); 
            setConj({
                present: [
                    stem + 'n',
                    stem + 't', 
                    stem + stem.slice(-1),
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
        else if (two[0] === 't') { //Irregular eritä, hirvitä, hävitä, levitä, lämmitä, selvitä, siitä, viritä
            //haljeta, iljetä, hävetä, kiivetä, revetä, ruveta, langeta.
            let a = verb.slice(-1); 
            let soft = verb.slice(0,-1); 
            verb = harden(verb); 
            let stem = verb.slice(0,-2); 
            let past = ''; 
            let cond = ''; 
            if (three[0] === 'e') {
                past = stem + 'ni';
                cond = past; 
                stem += 'ne'; 
            }
            else if (three[0] === 'i') {
                stem += 'itse'; 
                past = stem.slice(0,-1) + 'i'; 
                cond = past; 
            }
            else {
                past = stem + 'si'; 
                cond = stem + 'i'; 
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
        let vahva = ['ll','it','et','at','ät']
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
            if (isVowel(text[1]) && end.search('ll') === -1) {
                text += 'k';
                vaihtelu = false; 
            }
            for (let j of Object.keys(aste)) {
                if (vaihtelu && text.search(aste[j]) >= 0 && aste[j]) {
                    console.log(j); 
                    text = text.replace(aste[j], j);
                    vaihtelu = false; 
                }
            }
        }
        return (begin + text + end); 
    }

    return(
        <div>
            <button onClick={() => alert(randomVerb())} type="button">Random verb</button>
            <button onClick={parseVerb} type="button">Parse Verb</button>   
            <input placeholder="tense" defaultValue="" onChange={e => console.log(harden(e.target.value))}></input>
            <button onClick={() => console.log(conj)}>Log conjugations</button>
                {verbs ?
                    <table>
                        {verbs.A.map(verb => {
                                return (
                                    <tr>
                                        <td>{verb}</td>
                                    </tr>
                                )
                            })}
                    </table>
                : 
                <div>
                    "No verbs found"
                </div>
                }
        </div>
    )
}

export default Quiz; 