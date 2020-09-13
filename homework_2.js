/**
 * fruits arr is a store of fruits, fill as you wish
 * Example
 * ['banana', 'orange', 'orange']
*/
const fruits = ['banana', 'orange', 'orange','lemon','kiwi','banana','apple','lemon','apple','banana'];

/**
 * fruitsBought arr is a store of bought fruits
 * push fruit here after buying
 */

const fruitsBought = [ ];
/**
 * logs array is used to store logs on the page.
 * Can be filled with executing log function
 * 
 * Example:
 * log(customerName, fruitName, success)
 * where
 * - customerName is name of customer
 * - fruitName is name of fruit
 * - success is state if customer bought a fruit
 */
const logs = [ ]; 

/**
 * Example of customer
 */
const customers = [
    {
    name: 'Ivan',
    balance: 46,
    fruitsToBuy: [{
        name: 'banana',
        count: 3,
    }]},
    {
    name: 'Max',
    balance: 30,
    fruitsToBuy: [{
        name: 'apple',
        count: 2,
    }]},
    {
    name: 'Olga',
    balance: 50,
    fruitsToBuy: [{
        name: 'orange',
        count: 4,
    }]}
];

/**
 * Function buyFruits is used to iterate over array passes as a param
 * if customer wants to buy 4 banana try to remove banana from fruits array (find it above)
 * and push it to fruitsBought array (find it above)
 * 
 * Push execution result in log
 * function log is written below, you'll find execution example on line 18 of this file
 * 
 * Example:
 * buyFruits(customers)
 */
function buyFruits(customersArr) {
    // write code here
    customersArr.forEach( customer=>{
        const fruitsToBuy = customer.fruitsToBuy;

        fruitsToBuy.forEach (fruit=>{
            const fruitName = fruit.name;

            for (let i=0;i<fruit.count;i++) {
                const idx = fruits.indexOf(fruitName);

                if(idx !==-1) {
                    const fruitToBy = fruits.splice(idx,1);
                    fruitsBought.push (fruitToBy);
                    log (customer.name,fruitName,true);
                } else {
                    log (customer.name,fruitName,false); 
                }
            }
        });
    })
}

/**
 * Function getFruitsMap returns map of fruits
 * Example:
 * 
 * const fr = ['banana', 'orange', 'orange']
 * getFruitsMap(fr); -> { banana: 1, orange: 2 }
 * 
 */
 function getFruitsMap(fruitsArr) {
    // write code here
    return fruitsArr.reduce((acc,frut) => {
        if (frut in acc === false)
        {
            acc[frut] = 0;
        }
        acc[frut] +=1;
        return acc;
        
    },{});
} ;
        
console.log (getFruitsMap);

// DONT'T EDIT FOLLOWING CODE
buyFruits(customers);
const fruitsLeftMap = getFruitsMap(fruits);
const fruitsBoughtMap = getFruitsMap(fruitsBought);


function log (customerName, fruitName, success) {
    const action = success ? 'bought' : 'faliled to buy';
    const className = success ? 'green' : 'red'
    logs.push(`${customerName} <span class=${className}>${action}</span> ${fruitName}`);
}

function render () {
    renderLog();
    renderFruits('fruits-left', fruitsLeftMap);
    renderFruits('fruits-bought', fruitsBoughtMap);

    function renderLog() {
        let existingLogsContainer = document.getElementById('messages');
        let mainLogsContainer =  document.getElementById('log');
        
        if (existingLogsContainer) {
            mainLogsContainer.removeChild(existingLogsContainer);
        }
        
        const logsContainer = document.createElement('ul');
        logsContainer.id = 'messages';
        
        logs.forEach(log => {
            const logEl = document.createElement('li');
            logEl.innerHTML = log;
            logsContainer.appendChild(logEl);
        });
        
        mainLogsContainer.appendChild(logsContainer);    
    }
    
    function renderFruits (id, mappedData) {
        const mainFruitsContainer = document.getElementsByClassName(id)[0];
        const existingFruitsBoughtContainer = (mainFruitsContainer.getElementsByClassName('fruits-list') || [])[0];
        
        if (existingFruitsBoughtContainer) {
            mainFruitsContainer.removeChild(existingFruitsBoughtContainer);
        }
        
        const fruitsContainer = document.createElement('ul');
        fruitsContainer.classList.add('fruits-list');
        
        for (let key in mappedData) {
            const fruitEl = document.createElement('li');
            const nameEl = document.createElement('span');
            const countEl = document.createElement('span');
            nameEl.innerText = `${key}:`;
            countEl.innerText = mappedData[key];
        
            fruitEl.appendChild(nameEl);
            fruitEl.appendChild(countEl);
            fruitsContainer.appendChild(fruitEl);
        }
        
        mainFruitsContainer.appendChild(fruitsContainer);
    }
}
