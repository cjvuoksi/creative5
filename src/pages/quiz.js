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

    const randomVerb = () => {
        let flat = []; 
        for (let letter of Object.keys(verbs)) {
            flat = flat.concat(verbs[letter]); 
        }
        return flat[Math.floor(Math.random() * flat.length)];
    }

    const parseVerb = () => {
        let verb = randomVerb(); 
        console.log(verb); 
        let three = verb.slice(-3); 
        let two = verb.slice(-2); 
        if (three === "ida" || three === 'idä') {
            let stem = verb.slice(0,-2); 
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
                    stem + 'n',
                    stem + 't',
                    stem,
                    stem + 'mme',
                    stem + 'tte',
                    stem + 'v' + a + 't'
                ],
                conditional: [
                    stem + 'sin',
                    stem + 'sit',
                    stem + 'si',
                    stem + 'simme',
                    stem + 'sitte',
                    stem + 'siv' + a + 't'
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
        else if (three === "taa" || three === 'tää' || two === "oa" || two === "ua" || two === 'ea' || two === 'ia') {
            let stem = verb.slice(0,-1); 
            let four = verb.slice(-4); 
            let a = verb.slice(-1); 
            let soft; 
            if (four === "ttaa" || four === "ttää") {
                soft = verb.slice(0,-3) + a; 
            } else if (four === "staa" || four === "stää") {
                soft = verb.slice(0,-2) + a;  
            } else if (four === "ntaa" || four === "rtaa" || four === "ltaa") {
                soft = verb.slice(0,-3) + four[0] + a;
            } else if (three === "taa" || three === 'tää') {
                soft = verb.slice(0,-3) + 'd' + verb.slice(-1); 
            }
            else {
                if (four[0] === 's') {
                    soft = stem
                }
                else if (four.slice(0,2) === 'nt' || four.slice(0,2) === 'rt' || four.slice(0,2) === 'lt') {

                }
                soft = verb.slice(0,-3) + two[0]
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
                    soft.slice(0,-1) + 'in',
                    soft.slice(0,-1) + 'it',
                    stem.slice(0,-1) + 'i',
                    soft.slice(0,-1) + 'imme',
                    soft.slice(0,-1) + 'itte',
                    stem.slice(0,-1) + 'iv' + a + 't'
                ],
                conditional: [
                    stem + 'isin', 
                    stem + 'isit',
                    stem + 'isi',
                    stem + 'isimme',
                    stem + 'isitte',
                    stem + 'isiv' + a + 't'
                ],
                pass_present: soft.slice(0,-1) + 'et' + a + a + 'n',
                pass_past: soft.slice(0,-1) + 'ettiin',
                pass_conditional: soft.slice(0,-1) + 'ett' + a + 'isiin',
                part_pass_past: soft.slice(0,-1) + 'ett' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: soft.slice(0,-1) + 'ett' + a + 'v' + a,
                part_past: stem + 'n' + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
        else if (three === 'sta' || three === 'stä' || three === 'lla' || three === 'llä' ||
            three === 'rra' || three === 'rrä' || three === "nna" || three === "nnä") {
            let stem = verb.slice(0,-2) + 'e'; 
            let past = verb.slice(0,-2) + 'i'; 
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
                pass_present: verb + a + 'n', 
                pass_past: stem + 'tiin',
                pass_conditional: stem + 't' + a + 'isiin',
                part_pass_past: stem + 't' + (a === 'a' ? 'u' : 'y'),
                part_pass_act: stem + 't' + a + 'v' + a,
                part_past: stem + stem.slice(-1) + (a === 'a' ? 'u' : 'y') + 't',
                part_act: stem + 'v' + a
            }); 
        }
        else if (three === 'ata' || three === 'ätä' || three === 'eta' || three === 'etä') {
            
        }
    }

    const soften = (verb) => {

    }

    const harden = (verb) => {

    }

    return(
        <div>
            <button onClick={() => alert(randomVerb())} type="button">Random verb</button>
            <button onClick={parseVerb} type="button">Parse Verb</button>   
            <input placeholder="tense" defaultValue=""></input>
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