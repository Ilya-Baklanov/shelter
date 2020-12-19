let pets = [],
    randPetsIndArr = [],
    fullPetsList = [],
    petsName = [];

const request = new XMLHttpRequest();
request.open('GET', './pets.json');

request.onload = () => {
    pets = JSON.parse(request.response);

    document.querySelector("#currentPage").innerText = currentPage+1;

    checkItemsPerPage();

    fullPets();

    createPets(fullPetsList);

    checkDisabled();

    petsNameIdentif();

    getNamePets();
    
    checkBurgerActive();
}

let itemsPerPage = 3;
let burger = false;
const checkItemsPerPage = () => {
    if (window.innerWidth >= 1280) {
        itemsPerPage = 8;
        burger = false; 
    } else if(window.innerWidth >= 768 && window.innerWidth < 1280) {
        itemsPerPage = 6;
        burger = false;
    } else if(window.innerWidth >= 320 && window.innerWidth < 768) {
        itemsPerPage = 3;
        burger = true;
    }
    return itemsPerPage;
}

const checkBurgerActive = () => {
    if(burger === true){
        menu.classList.remove("burger-menu_off");
        document.querySelector("body > header > div > nav").classList.add('navbar_off');
    } else {
        menu.classList.add("burger-menu_off");
        document.querySelector("body > header > div > nav").classList.remove('navbar_off');
        document.querySelector("body > header > div > a").classList.remove('header-logo_off');
        menu.classList.remove("burger-menu_active");
        logo.classList.add("header-logo_burger_off");
    }
}

const randPetsInd = (itemsPerPage) => {
    if(randPetsIndArr.length === itemsPerPage){
        return randPetsIndArr;
    }
    let randInd = Math.floor((Math.random() * itemsPerPage));
    if(randPetsIndArr.includes(randInd)){
        randPetsInd(itemsPerPage);
    } else{
        randPetsIndArr.push(randInd);
        randPetsInd(itemsPerPage);
    }
}

let pseudoRand = () => {
    randPetsIndArr = [];
    randPetsInd(itemsPerPage);
    if(randPetsIndArr.filter((item, index) => randPetsIndArr.indexOf(item) !== index) > 0){
        pseudoRand();
    }
    return randPetsIndArr;
}

const fullPets = () => {
    if(fullPetsList.length === 48/itemsPerPage){
        return fullPetsList;
    }
    pseudoRand();
    fullPetsList.push(randPetsIndArr);    
    fullPets();
}

const createPets = (fullPetsList) => {
    const elem = document.querySelector("body > section > div > div.our-pets-content-slider");
    elem.innerHTML = createElements(fullPetsList);
}

const createElements = (fullPetsList) => {
    let str = '';
    petsList = fullPetsList[currentPage];
    for(let i = 0; i < petsList.length; i++){
        str = str + `<div class="our-pets-content-slider-pets">
                    <img src="${pets[petsList[i]].img}">
                    <h3 class="our-pets-content-slider-header-pets">${pets[petsList[i]].name}</h3>
                    <button class="our-pets-content-slider-button-pets">Learn more</button>
                    </div>`;
    }
    return str;
}


request.send();

window.onresize = () => {
    checkItemsPerPage();
    let fullPetsListTemp = fullPetsList.join(',').split(',');
    let tempArr = [];
    let duplicateTemp = [];
    let resizeFullPets = () => {
        fullPetsList = [];
        for(let i = 0; i < fullPetsListTemp.length; i++) {
            tempArr.push(fullPetsListTemp[i]);
            if(tempArr.length === itemsPerPage){
                fullPetsList.push(tempArr);
                tempArr = [];
            }
        }
    };
    resizeFullPets();
    if(currentPage > 48/itemsPerPage -1){
        currentPage = 48/itemsPerPage - 1;
        document.querySelector("#currentPage").innerText = currentPage+1;
    }
    createPets(fullPetsList);
    checkDisabled();
    getNamePets();
    checkBurgerActive();
}

//PAGINATION
const startPage = document.querySelector("#startPage"),
    prevPage = document.querySelector("#prevPage"),
    nextPage = document.querySelector("#nextPage"),
    endPage = document.querySelector("#endPage");

let currentPage = 0;

let checkDisabled = () => {
    if(currentPage === 0){
        startPage.toggleAttribute('disabled');
        prevPage.toggleAttribute('disabled');
        nextPage.removeAttribute('disabled')
        endPage.removeAttribute('disabled')
    } else if(currentPage === (48 / itemsPerPage) - 1) {
        nextPage.toggleAttribute('disabled')
        endPage.toggleAttribute('disabled')
        startPage.removeAttribute('disabled');
        prevPage.removeAttribute('disabled');
    } else if(currentPage > 0 && currentPage < (48 / itemsPerPage) - 1) {
        startPage.removeAttribute('disabled');
        prevPage.removeAttribute('disabled');
        nextPage.removeAttribute('disabled')
        endPage.removeAttribute('disabled')
    }
    if(startPage.getAttributeNames().includes('disabled')){
        startPage.innerHTML = `<img src="../../assets/icons/2x-row-gray.svg" alt="">`
        document.querySelector("#startPage > img").style.transform = `rotate(-180deg)`;
    } else{
        startPage.innerHTML = `<img src="../../assets/icons/2x-row-black.svg" alt="">`
    }
    if(prevPage.getAttributeNames().includes('disabled')){
        prevPage.innerHTML = `<img src="../../assets/icons/row-gray.svg" alt="">`
        document.querySelector("#prevPage > img").style.transform = `rotate(-180deg)`;
    } else{
        prevPage.innerHTML = `<img src="../../assets/icons/row-black.svg" alt="">`
    }
    if(nextPage.getAttributeNames().includes('disabled')){
        nextPage.innerHTML = `<img src="../../assets/icons/row-gray.svg" alt="">`
        document.querySelector("#nextPage > img").style.transform = `rotate(-180deg)`;
    } else{
        nextPage.innerHTML = `<img src="../../assets/icons/row-black.svg" alt="">`
    }
    if(endPage.getAttributeNames().includes('disabled')){
        endPage.innerHTML = `<img src="../../assets/icons/2x-row-gray.svg" alt="">`
        document.querySelector("#endPage > img").style.transform = `rotate(-180deg)`;
    } else{
        endPage.innerHTML = `<img src="../../assets/icons/2x-row-black.svg" alt="">`
    }
}

startPage.addEventListener('click', (e) => {
    if(currentPage > 0){
        currentPage = 0;
        createPets(fullPetsList);
    }
    document.querySelector("#currentPage").innerText = currentPage+1;
    checkDisabled();
    getNamePets();
});

prevPage.addEventListener('click', (e) => {
    if(currentPage > 0){
        currentPage--;
        createPets(fullPetsList);
    }
    document.querySelector("#currentPage").innerText = currentPage+1;
    checkDisabled();
    getNamePets();
});

nextPage.addEventListener('click', (e) => {
    if(currentPage < fullPetsList.length - 1){
        currentPage++;
        createPets(fullPetsList);
    }
    document.querySelector("#currentPage").innerText = currentPage+1;
    checkDisabled();
    getNamePets();
});

endPage.addEventListener('click', (e) => {
    if(currentPage < fullPetsList.length - 1){
        currentPage = fullPetsList.length - 1;
        createPets(fullPetsList);
    }
    document.querySelector("#currentPage").innerText = currentPage+1;
    checkDisabled();
    getNamePets();
});

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
                    </div>
                    <div class="overlay" id="overlay"></div>`;

    document.querySelector("body > div.b-popup").style.display = `flex`;
    overlay.style.display = `flex`;
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
        let namePets = document.querySelector(`body > section > div > div.our-pets-content-slider > div:nth-child(${i})`).children[1].textContent;
        document.querySelector(`body > section > div > div.our-pets-content-slider > div:nth-child(${i})`).addEventListener('click', (e) => {
            learnMore(namePets)
        })    
    }
}


/*BURGER MENU*/

let menu = document.getElementById('burger-menu'),
button = document.getElementById('burger-menu_button'),
links = document.getElementById("burger-menu_link"),
overlay = document.getElementById("burger-menu_overlay"),
logo = document.querySelector("#burger-menu > div.burger-menu-header > a");

let toggleMenu = () => {
menu.classList.toggle("burger-menu_active");
logo.classList.toggle("header-logo_burger_off");
document.querySelector("body > header > div > a").classList.toggle('header-logo_off');
document.querySelector("#body").classList.toggle('modal-open');
}

button.addEventListener('click', (e) => {
e.preventDefault();
toggleMenu();
});
links.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

