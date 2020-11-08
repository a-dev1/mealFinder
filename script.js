let search = document.getElementById("search");
let results_container = document.querySelector(".results-container");

let show_text = (check, element) => {
    let result_for = document.createElement(`${element}`);
    result_for.innerHTML = (check) ? `Search results for '${input_value}':` : `There are no search results. Try again!`;
    results_container.appendChild(result_for);
}

let createGrid = (meals) => {
    let grid = document.createElement("")
}

let find = (e) => {
    if(e.keyCode === 13 && search.value.length != 0){
        input_value = search.value;

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input_value}`)
        .then( response => response.json() )
        .then( result => result.meals)
        .then( meals => {
            if(meals != null){
                show_text(true, 'h2');
                createGrid(meals);
                console.log(meals);
            }
            else {
                show_text(false, 'p');
            }
        })
 


    }
 
}
search.addEventListener('keypress', find);