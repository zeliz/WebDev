// pictures to conditionally display
const FOOD_CAT_IMG = "https://freesvg.org/img/Restaurant-Sign-White.png";
const FOOD_FAV_IMG = "https://cdn.icon-icons.com/icons2/2070/PNG/512/pizza_icon_126037.png";
const DRINK_CAT_IMG = "https://www.pinpng.com/pngs/m/0-4734_soda-can-beverage-drink-paper-cup-comments-soda.png";
const DRINK_FAV_IMG = "https://icons.veryicon.com/png/o/food--drinks/spring-new-food-series/tea-12.png";
const MOVIE_CAT_IMG = "https://icon-library.com/images/movie-film-icon/movie-film-icon-22.jpg";
const MOVIE_FAV_IMG = "https://www.dvd-covers.org/d/156268-2/Groundhog_Day_-_Bluray_CD.jpg";
const ANIMAL_CAT_IMG = "https://thumbs.dreamstime.com/z/farmers-market-logo-black-farm-animals-icon-vector-symbol-white-background-symbol-vector-67932157.jpg";
const ANIMAL_FAV_IMG = "https://fcit.usf.edu/matrix/wp-content/uploads/2016/12/OwlTablet.png";

const MY_FAV = {
    food: "pizza",
    drink: "tea",
    movie: "Groundhog Day",
    animal: "owl",
}

let showingImg = false;

// element id's of rows in ".favorite-table", with pictures and alt text
const favoriteCategories = {
    "fav-header-row": [
        ["", "blank image: click table row to update"],
        ["", "blank image: click table row to update"]
    ], 
    "fav-food-row": [
        [FOOD_CAT_IMG, "Image of food"],
        [FOOD_FAV_IMG, `Image of favorite food (${MY_FAV.food})`]
    ],
    "fav-drink-row": [
        [DRINK_CAT_IMG, "Image of a drink"],
        [DRINK_FAV_IMG, `Image of favorite drink (${MY_FAV.drink})`]
    ],
    "fav-movie-row": [
        [MOVIE_CAT_IMG, "Image of movie symbols"],
        [MOVIE_FAV_IMG, `Image of favorite movie (${MY_FAV.movie})`]
    ],
    "fav-animal-row": [
        [ANIMAL_CAT_IMG, "Image of animals"],
        [ANIMAL_FAV_IMG, `Image of favorite animal (${MY_FAV.animal})`]
    ],
};

window.onload = function () {
    // Add event listeners for 'favorite table' rows
    let favoriteRows = document.querySelectorAll(".favorite-table tr");
    for (let row of favoriteRows) {
        row.addEventListener("click", favRowClick);
    }
};

function favRowClick(event) {
    let target = event.currentTarget;
    let clickedHeader = (target.id === "fav-header-row");

    // Only update images if header wasn't clicked
    if (!clickedHeader) updateImages(target.id);
    // 'Clicked Header' should not equal 'showing images'
    //    if both are true, hide images and show content.
    //    if both are false, hide content and show images.
    if (clickedHeader === showingImg) toggleContent();

    removeHighlight();
    if (!clickedHeader) target.classList.add("highlight");

    event.stopPropagation();
}

function updateImages(selectedFavorite) {
    let categoryUpdates = favoriteCategories[selectedFavorite][0];
    let favoriteUpdates = favoriteCategories[selectedFavorite][1];

    // New links
    let catLink = categoryUpdates[0];
    let favLink = favoriteUpdates[0];
    // New alt text
    let catAlt = categoryUpdates[1];
    let favAlt = favoriteUpdates[1];

    // Get the images under div-toggles (should be exactly 2)
    let imgs = document.querySelectorAll(".div-content-toggler img");
    if (imgs.length !== 2) {
        alert("Warning: Incorrect Number of Images under Toggle Divs!");
        return; // exit early if not 2 images
    }
    // Update image attributes
    imgs[0].setAttribute("src", catLink);
    imgs[0].setAttribute("alt", catAlt);
    imgs[1].setAttribute("src", favLink);
    imgs[1].setAttribute("alt", favAlt);
}

function toggleContent() {
    let divToggles = document.querySelectorAll(".div-content-toggler");
    for (let div of divToggles) {
        let toggleItems = div.children;
        // Toggles visibility of all children of the div
        for (let elem of toggleItems) {
            elem.classList.toggle("no-display-toggle");
        }
    }
    showingImg = !showingImg;
}

function removeHighlight() {
    let highlighted = document.querySelector(".highlight");
    // only 1 row will ever be highlighted.
    if (highlighted && highlighted.classList.contains("highlight")) {
        highlighted.classList.remove("highlight");
    }
}