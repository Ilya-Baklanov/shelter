let pets = [],
    randPetsIndArr = [],
    petsName = [];

const request = new XMLHttpRequest();
request.open('GET', '../pets/pets.json');

request.onload = () => {
    pets = JSON.parse(request.response);

    randPetsInd();
    
    checkItemsPerPage();

    createPets(randPetsIndArr);

    petsNameIdentif();

    getNamePets();

    checkBurgerActive();
}

let itemsPerPage = 3;
let burger = false;
const checkItemsPerPage = () => {
    if (window.innerWidth >= 1280) {
        itemsPerPage = 3; 
        burger = false;
    } else if(window.innerWidth >= 768 && window.innerWidth < 1280) {
        itemsPerPage = 2;
        burger = false;
    } else if(window.innerWidth >= 320 && window.innerWidth < 768) {
        itemsPerPage = 1;
        burger = true;
    }
    return itemsPerPage, burger;
}

const checkBurgerActive = () => {
    if(burger === true){
        menu.classList.remove("burger-menu_off");
        document.querySelector("body > header > div > nav").classList.add('navbar_off');
    } else {
        menu.classList.add("burger-menu_off");
        document.querySelector("body > header > div > nav").classList.remove('navbar_off');
        document.querySelector("body > header > div > div.header-logo").classList.remove('header-logo_off');
        menu.classList.remove("burger-menu_active");
        logo.classList.add("header-logo_burger_off");
    }
}

const randPetsInd = () => {
    if(randPetsIndArr.length === pets.length){
        return randPetsIndArr;
    }
    let randInd = Math.floor((Math.random() * pets.length));
    if(randPetsIndArr.includes(randInd)){
        randPetsInd();
    } else{
        randPetsIndArr.push(randInd);
        randPetsInd();
    }
}

let tempArr = [];
let pseudoRand = () => {
    randPetsIndArr = [];
    randPetsInd();
    let currentDuplicateTemp = 0;
    for(let i = 0; i < itemsPerPage; i++){
        if(randPetsIndArr.slice(0, itemsPerPage).includes(tempArr.slice(0, itemsPerPage)[i])){
            currentDuplicateTemp += 1;
        }
    };
    if(currentDuplicateTemp > 0){
        pseudoRand();
    } else {
        return randPetsIndArr;
    }
}

const createPets = (randPetsIndArr) => {
    const elem = document.querySelector("#slider");
    elem.innerHTML = createElements(randPetsIndArr);
}

const createElements = (randPetsIndArr) => {
    let str = '';
    for(let i = 0; i < itemsPerPage; i++){
        str = str + `<div class="our-friends-content-slider-pets">
                        <img src="${pets[randPetsIndArr[i]].img}" alt="pets-katrine">
                        <h3 class="our-friends-content-slider-header-pets">${pets[randPetsIndArr[i]].name}</h3>
                        <button class="our-friends-content-slider-button-pets">Learn more</button>
                    </div>`
    }
    return str;
}


request.send();


document.querySelector("#prevSlide").addEventListener('click', (e) => {
    tempArr = randPetsIndArr;
    pseudoRand();
    createPets(randPetsIndArr);
    getNamePets();
});

document.querySelector("#nextSlide").addEventListener('click', (e) => {
    tempArr = randPetsIndArr;
    pseudoRand();
    createPets(randPetsIndArr);
    getNamePets();
});


window.onresize = () => {
    checkItemsPerPage(); 
    createPets(randPetsIndArr);
    getNamePets();
    checkBurgerActive();
}


let petsNameIdentif = () => {
    for(let i = 0; i < pets.length; i++){
        petsName.push(pets[i].name);
    }
}

let learnMore = (namePets) => {
    const popup = document.querySelector("#b-popup-content"),
        buttonClose = document.querySelector("body > div.b-popup > div > button"),
        overlay = document.querySelector("#overlay");

    let petsInd = petsName.indexOf(namePets),
    nameUnit = pets[petsInd].name,
    imgUnit = pets[petsInd].img,
    typeUnit = pets[petsInd].type,
    breedUnit = pets[petsInd].breed,
    descriptionUnit = pets[petsInd].description,
    ageUnit = pets[petsInd].age,
    inoculationsUnit = pets[petsInd].inoculations,
    diseasesUnit = pets[petsInd].diseases,
    parasitesUnit = pets[petsInd].parasites;

    popup.innerHTML = `<div class="b-popup-content__img">
                        <img src="${imgUnit}" alt="">
                        </div>
                        <div class="b-popup-content-description">
                        <h2 class="b-popup-content-description__header">${nameUnit}</h2>
                        <h3 class="b-popup-content-description__subheader">${typeUnit} - ${breedUnit}</h3>
                        <p class="b-popup-content-description__text">${descriptionUnit}</p>
                        <ul class="b-popup-content-description-list">
                            <li><span>Age: ${ageUnit}</span></li>
                            <li><span>Inoculations: ${inoculationsUnit.join(',')}</span></li>
                            <li><span>Diseases: ${diseasesUnit.join(',')}</span></li>
                            <li><span>Parasites: ${parasitesUnit.join(',')}</span></li>
                        </ul>
                    </div>`;

    document.querySelector("body > div.b-popup").style.display = `flex`;
    document.querySelector("#body").classList.add('modal-open');

    buttonClose.addEventListener('click', () => {
        closePopup();
        document.querySelector("#body").classList.remove('modal-open');
    });
    overlay.addEventListener('click', () => {
        closePopup();
        document.querySelector("#body").classList.remove('modal-open');
    });

    let closeButtonHover = () => {
        buttonClose.classList.toggle('closeHover');
    }

    overlay.addEventListener('mouseenter', () => {
        closeButtonHover();
    })
    overlay.addEventListener('mouseleave', () => {
        closeButtonHover();
    })
}

let closePopup = () => {
    document.querySelector("body > div.b-popup").style.display = `none`;
}

let getNamePets = () => {
    for(let i = 1; i <= itemsPerPage; i++){
        let namePets = document.querySelector(`#slider > div:nth-child(${i})`).children[1].textContent;
        document.querySelector(`#slider > div:nth-child(${i})`).addEventListener('click', (e) => {
            learnMore(namePets)
        })    
    }
}


/*BURGER MENU*/

    let menu = document.getElementById('burger-menu'),
        button = document.getElementById('burger-menu_button'),
        links = document.getElementById("burger-menu_link"),
        overlay = document.getElementById("burger-menu_overlay"),
        logo = document.querySelector("#burger-menu > div.burger-menu-header > div");

let toggleMenu = () => {
    menu.classList.toggle("burger-menu_active");
    logo.classList.toggle("header-logo_burger_off");
    document.querySelector("body > header > div > div.header-logo").classList.toggle('header-logo_off');
    document.querySelector("#body").classList.toggle('modal-open');
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});
links.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);


