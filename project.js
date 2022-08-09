const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

const ui=new UI();
const storage=new Storage();
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}

function  addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title==="" ||director==="" || url==="" ){
        ui.displayMassages("tum alanlari doldurun","danger");
    }else{
        const newFilm=new Film(title,director,url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMassages("film basariyla eklendi","success");
    }


    ui.clearInputs(titleElement,directorElement,urlElement);
    
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id="delete-film"){
        ui.deleteFilmFromUI(e.target);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMassages("silme islemi basarili..","success");
        
    }
}
function clearAllFilms(){
    if(confirm("emin misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();  
    }
    
}