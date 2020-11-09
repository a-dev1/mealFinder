let search = document.getElementById("search");
let results_container = document.querySelector(".results-container");
let found_or_not = document.querySelector(".found-or-not");

let show_text = (check) => {
    found_or_not.innerHTML = (check) ? `Search results for '${input_value}':` : `There are no search results. Try again!`;
}

let createGrid = (meals) => {
    meals.forEach( element => {
        let img_container = document.createElement("div");
        let image = document.createElement("img");
        let meal_info = document.createElement("div");

        img_container.classList.add("img_container");
        meal_info.classList.add("meal_info");

        meal_info.innerText = element.strMeal;
        image.src = element.strMealThumb;
        img_container.appendChild(image);
        img_container.appendChild(meal_info);
        results_container.appendChild(img_container);
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
                show_text(true);
                createGrid(meals);
                console.log(meals);
            }
            else {
                show_text(false);
            }
        })
 


    }
 
}

search.addEventListener('keypress', find);