import React from 'react'

const apiData = {
    url: 'http://192.168.2.130:5000'
}

export async function removeItem(item){
    await fetch(apiData.url + '/remove-item?item='+item, {
        method: 'GET'
    })
    .then(response => console.log(response))
}

export async function addItem(item, amount){
    console.log(item)
    await fetch(apiData.url + '/add-item?item='+item+","+amount, {
        method: 'GET'
    })
    .then(response => console.log(response))
}

export async function retrieveItems(){
    let items = null;
    await fetch(apiData.url + '/retrieve-items', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(responseJson){
        items = responseJson
    })
    console.log(items)
    return items
}