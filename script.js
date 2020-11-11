let search = document.getElementById("search");
let results_container = document.querySelector(".results-container");
let found_or_not = document.querySelector(".found-or-not");
let details_container = document.querySelector(".detail-container");

let show_text = (check) => {
    found_or_not.innerHTML = (check) ? `Search results for '${input_value}':` : `There are no search results. Try again!`;
}

let showDetails = (element) => {
    details_container.innerHTML = "";
    let heading = document.createElement("h1");
    let img = document.createElement("img");
    let category = document.createElement("h3");
    let region = document.createElement("h3");
    let rc_container = document.createElement("div");
    let instructions = document.createElement("p");
    let ingredients_head = document.createElement("h2");
    let ingredients_container = document.createElement("div"); 

    heading.innerText = element.strMeal;
    heading.classList.add("heading");
    img.src = element.strMealThumb;
    category.innerText = element.strCategory;
    region.innerText = element.strArea;
    rc_container.appendChild(category);
    rc_container.appendChild(region);
    rc_container.classList.add("rc-container");
    instructions.innerText = element.strInstructions;
    ingredients_head.innerText = "Ingredients";

    details_container.appendChild(heading);
    details_container.appendChild(img);
    details_container.appendChild(rc_container);
    details_container.appendChild(instructions);
    details_container.appendChild(ingredients_head);
    ingredients_container.classList.add("ingredients-container");

    for(let i=1; i<=20; i++){
        if(eval(`element.strIngredient${i}`)){
            let ingredient = document.createElement("span");
            ingredient.innerText = eval(`element.strIngredient${i}`) + '-' + eval(`element.strMeasure${i}`);
            ingredients_container.appendChild(ingredient);
        }
        details_container.appendChild(ingredients_container);
    }
}

let createGrid = (meals) => {
    results_container.innerHTML = "";
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
        img_container.addEventListener('click', () => {
            showDetails(element);
        })
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