export function saveData(key, data) {
    const myData = JSON.stringify(data);
    const setData = localStorage.setItem(key, myData);
}


export function loadData(key) {
    const getData = localStorage.getItem(key);
    const myJson = JSON.parse(getData);

    return myJson;
}
