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
    food: {
        image: {
            link: FOOD_CAT_IMG,
            alt: "Image of food",
        },
        favorite: {
            choice: "pizza",
            price: 8.99,
            image: {
                link: FOOD_FAV_IMG,
                alt: "Image of favorite food (pizza)",
            },
        },
    },
    drink: {
        image: {
            link: DRINK_CAT_IMG,
            alt: "Image of a drink",
        },
        favorite: {
            choice: "tea",
            price: 0.99,
            image: {
                link: DRINK_FAV_IMG,
                alt: "Image of favorite drink (tea)",
            },
        },
    },
    movie: {
        image: {
            link: MOVIE_CAT_IMG,
            alt: "Image of movie symbols",
        },
        favorite: {
            choice: "Groundhog Day",
            price: 4.99,
            image: {
                link: MOVIE_FAV_IMG,
                alt: "Image of favorite movie (Groundhog Day)",
            },
        },
    },
    animal: {
        image: {
            link: ANIMAL_CAT_IMG,
            alt: "Image of animals",
        },
        favorite: {
            choice: "owl",
            price: 1275.75,
            image: {
                link: FOOD_FAV_IMG,
                alt: "Image of favorite animal (owl)",
            },
        },
    },
}

let showingImg = false;

// element id's of rows in ".favorite-table", with pictures and alt text
const favoriteCategories = {
    "fav-header-row": [
        { link: "", alt: "blank image: click table row to update" },
        { link: "", alt: "blank image: click table row to update" },
    ], 
    "fav-food-row": [MY_FAV.food.image, MY_FAV.food.favorite.image],
    "fav-drink-row": [MY_FAV.drink.image, MY_FAV.drink.favorite.image],
    "fav-movie-row": [MY_FAV.movie.image, MY_FAV.movie.favorite.image],
    "fav-animal-row": [MY_FAV.animal.image, MY_FAV.animal.favorite.image],
};

window.onload = function () {
    let favoriteRows = document.querySelectorAll(".favorite-table tr");
    let annoyButton = document.querySelector("#annoy-button");

    // Add event listeners for 'favorite table' rows
    for (let row of favoriteRows) {
        row.addEventListener("click", favRowClick);
    }

    // Add event listener to the 'annoy' button
    annoyButton.addEventListener("click", annoyClick);
};

function annoyClick(event) {
    // Change button text
    let btn = event.target;
    btn.innerHTML = ("(Be Annoying)" === btn.innerHTML) ?
                    "(Just chill)" : "(Be Annoying)";

    // Make photo annoying
    let photo = document.querySelector("#photo");
    photo.classList.toggle("annoying");
}

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
    let categoryImage = favoriteCategories[selectedFavorite][0];
    let favoriteImage = favoriteCategories[selectedFavorite][1];

    // Get the images under div-toggles (should be exactly 2)
    let imgs = document.querySelectorAll(".div-content-toggler img");
    if (imgs.length !== 2) {
        alert("Warning: Incorrect Number of Images under Toggle Divs!");
        return; // exit early if not 2 images
    }
    // Update image attributes
    imgs[0].setAttribute("src", categoryImage["link"]);
    imgs[0].setAttribute("alt", categoryImage["alt"]);
    imgs[1].setAttribute("src", favoriteImage["link"]);
    imgs[1].setAttribute("alt", favoriteImage["alt"]);
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