export const city1 = 'city1.id';
export const city2 = 'city2.id';
export const entityCity = 'city';
export const category1 = 'category1.id';
export const entityCategory = 'category';

export function description(id, name, returnName){
    if(returnName){
        return name;
    }
    return ("000000" + id).slice(-4) + " - " + name;
}

export function returnId(txt){
    let pos = txt.indexOf("-");
    if(pos === -1){
        return txt;
    }
    return txt.substring(0, pos-1);
}

export function removePontFront(txt){
    txt = txt.replace(/[.].*/g, "");
    return txt;
}
