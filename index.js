import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"



const appSettings = {
    databaseURL: "https://add-to-chart-3aa53-default-rtdb.asia-southeast1.firebasedatabase.app/"
}



const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
    
        clearShoppingListEl() 
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
    
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
    
    
            appendItemToShoppingListEl(currentItem)
        }
    }else {
        shoppingListEl.innerHTML = "No Items here... yet"
    }
})


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.appendChild(newEl)
}



console.log(shoppingListEl)