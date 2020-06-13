import axios from 'axios';
import { initialize } from 'redux-form';
import { description } from './keyAutocomplete';

const BASE_URL = 'http://localhost:8084';
let objects = [];

const initialState = { city1: {id: ''}, city2: {id: ''}, category1: {id: ''} };

export function selectObj(obj) {
    removeRepit(obj);
    objects.push(obj);
    return {
        type: 'OBJ',
        payload: obj
    };
}

export async function getList(param, queryID, queryName) {
    let suggestions = [];
    const regex = /(^[0-9]+)/g;
    const reg = new RegExp(regex);
    if(reg.test(param)){
        param = regex.exec(param)[1];
        param = param.replace(/^0+/, ''); //tirando zeros a esquerda
        try {
            let result = await axios.get(`${BASE_URL}/${queryID}/${param}`);
            result = result.data;
            const suggestion = {
                label: description(result.id, result.name),
                value: result.id,
                name: result.name
            };
            suggestions.push(suggestion);
        } catch (error) {
             suggestions = [];
        }
    }
    else{
        try {
            const result = await axios.get(`${BASE_URL}/${queryID}?${queryName}_like=${param}`);
            suggestions = result.data.map(row => ({
                label: description(row.id, row.name),
                value: row.id,
                name: row.name
            }));
        } catch (error) {
             suggestions = [];
        }
    }

    return {
        type: 'LIST_AUTOCOMPLETE',
        payload: suggestions
    };
}

export function init(){
    return [
        initialize('simple', initialState)
    ];
}

function removeRepit(obj){
    let index = 0;
    for (let myObj of objects) {
        if(Object.keys(myObj)[0] === Object.keys(obj)[0]){
            objects.splice(index, 1);
            break;
        }
        index++;
    }
}

export function returnObj(key){
    for (let myObj of objects) {
        if(Object.keys(myObj)[0] === key){
            return myObj[key];
        }
    }
    return null;
}
