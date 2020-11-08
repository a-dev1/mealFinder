let search = document.getElementById("search");
let results_container = document.querySelector(".results-container");
let found_or_not = document.querySelector(".found-or-not");

let show_text = (check, element) => {
    let result_for = document.createElement(`${element}`);
    result_for.innerHTML = (check) ? `Search results for '${input_value}':` : `There are no search results. Try again!`;
    found_or_not.appendChild(result_for);
}

let createGrid = (meals) => {
    meals.forEach( element => {
        let img_container = document.createElement("div");
        let image = document.createElement("img");

        img_container.classList.add = "img_container";
        image.src = element.strMealThumb;
        image.appendChild(image);
        results_container.appendChild(image);
    });
}

let find = (e) => {
    if(e.keyCode === 13 && search.value.length != 0){
        input_value = search.value;
        search.value = '';
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