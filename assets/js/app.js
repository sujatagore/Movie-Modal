var cl = console.log;

const btnAdd = document.getElementById("btnAdd");
const backdrop = document.getElementById("backdrop");
const subBtn = document.getElementById("subBtn");
const UpdBtn = document.getElementById("UpdBtn");
const moviemodal = document.getElementById("moviemodal");
const movieform = document.getElementById("movieform");
const titlectl = document.getElementById("title");
const imgurlctl = document.getElementById("imgurl");
const overviewctl = document.getElementById("overview");
const ratingctl = document.getElementById("rating");
const movieCon = document.getElementById("movieCon");
const closemodal = [...document.querySelectorAll(".closemodal")];

let movieArr = [];

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onEdit = (ele) =>{
    let editId = ele.closest(".moviecard").id;
    cl(editId)
    let editObj = movieArr.find(movie => movie.movieId === editId);
    localStorage.setItem("editId" , editId);
    showmovieform();
    titlectl.value = editObj.Title;
    imgurlctl.value = editObj. Image;
    overviewctl.value = editObj.Overview;
    ratingctl.value = editObj.Rating;
    cl(editObj);
    UpdBtn.classList.remove("d-none");
	subBtn.classList.add("d-none");
}

const onDelete = (ele) =>{
    Swal.fire({
        title: "Do you want to Remove Movie ?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let deleteId = ele.closest(".moviecard").id;
            let delIndex = movieArr.findIndex(movie => movie.movieId === deleteId);
            movieArr.splice(delIndex, 1);
            localStorage.setItem("movieArr", JSON.stringify(movieArr));
            let card = ele.closest(".col-md-4").remove();
            Swal.fire("Removed Successfully!", "", "success");
        }
      });
}

const addCard = (obj) =>{
    let card = document.createElement("div");
    card.Id = obj.movieId;
    card.className = "col-md-4";
    card.innerHTML = `<div class="card mb-5">
                        <figure class="moviecard mb-0" id="${obj.movieId}">
                            <img src="${obj.Image}" alt="${obj.Title}" title="${obj.Title}">
                            <figcaption>
                                <div class="ratingSec">
                                    <div class="row">
                                        <div class="col-10">
                                            <h4>${obj.Title}</h4>
                                        </div>
                                        <div class="col-2">
                                            <div class="rating text-center ">    
                                                ${obj.Rating >= 5 ?`<p class="bg-success">${obj.Rating}</p>` :
                                                obj.Rating <= 4 && obj.Rating >= 3 ?`<p class="bg-warning">${obj.Rating}</p>` : 
                                                obj.Rating < 3 ?`<p class="bg-danger">${obj.Rating}</p>`:`<p class="bg-warning">${obj.Rating}</p>`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSec">
                                    <h4>${obj.Title}</h4>
                                    <em>Overview</em>
                                    <p>${obj.Overview}</p>
                                    <div class="action">
                                        <button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
                                        <button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>`;
    movieCon.prepend(card);
}

const templatingArr = (arr) =>{
    let result = ``;
    arr.forEach ((obj) =>{
        result += `<div class="col-md-4">
                        <div class="card mb-5">
                            <figure class="moviecard mb-0" id="${obj.movieId}">
                                <img src="${obj.Image}" alt="${obj.Title}" title="${obj.Title}">
                                <figcaption>
                                    <div class="ratingSec">
                                        <div class="row">
                                            <div class="col-10">
                                                <h4>${obj.Title}</h4>
                                            </div>
                                            <div class="col-2">
                                                <div class="rating text-center ">    
                                                    ${obj.Rating >= 5 ?`<p class="bg-success">${obj.Rating}</p>` :
                                                    obj.Rating <= 4 && obj.Rating >= 3 ?`<p class="bg-warning">${obj.Rating}</p>` : 
                                                    obj.Rating < 3 ?`<p class="bg-danger">${obj.Rating}</p>`:`<p class="bg-warning">${obj.Rating}</p>`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overviewSec">
                                        <h4>${obj.Title}</h4>
                                        <em>Overview</em>
                                        <p>${obj.Overview}</p>
                                        <div class="action">
                                            <button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
                                            <button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>`
    });
    movieCon.innerHTML = result;
}

if(localStorage.getItem("movieArr")){
    movieArr = JSON.parse(localStorage.getItem("movieArr"));
    templatingArr(movieArr);
}

const showmovieform = () =>{
    moviemodal.classList.toggle('active');
    backdrop.classList.toggle('active');
}

const addmovieform = (eve) =>{
    eve.preventDefault();
    let objMovie = {
        Title : titlectl.value,
        Image : imgurlctl.value,
        Overview : overviewctl.value,
        Rating : ratingctl.value,
        movieId : generateUuid()
    };
    //cl(objMovie);
    movieArr.push(objMovie);
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    //templatingArr(movieArr);
    addCard(objMovie);
    eve.target.reset();
    showmovieform();
    Swal.fire({
        icon: "success",
        title: `The Movie ${objMovie.Title} added successfully !!!! `,
        timer: 1500
      });
}


btnAdd.addEventListener("click", showmovieform);

closemodal.forEach((c) => {
    c.addEventListener("click", showmovieform)
});

const onMovieUpdate = () =>{
    let updId = localStorage.getItem("editId");
    cl(updId)
    let updObj = {
        Title : titlectl.value,
        Image : imgurlctl.value,
        Overview : overviewctl.value,
        Rating : ratingctl.value,
        movieId : updId
    };
    cl(updObj.movieId)
    let getIndex = movieArr.findIndex(movie => movie.movieId === updId);
    movieArr[getIndex] = updObj;
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    let getCard = document.getElementById(updId);
    getCard.innerHTML = `<img src="${updObj.Image}" alt="${updObj.Title}" title="${updObj.Title}">
                            <figcaption>
                                <div class="ratingSec">
                                    <div class="row">
                                        <div class="col-10">
                                            <h4>${updObj.Title}</h4>
                                        </div>
                                        <div class="col-2">
                                            <div class="rating text-center ">    
                                                ${updObj.Rating >= 5 ?`<p class="bg-success">${updObj.Rating}</p>` :
                                                updObj.Rating <= 4 && updObj.Rating >= 3 ?`<p class="bg-warning">${updObj.Rating}</p>` : 
                                                updObj.Rating < 3 ?`<p class="bg-danger">${updObj.Rating}</p>`:`<p class="bg-warning">${updObj.Rating}</p>`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="overviewSec">
                                    <h4>${updObj.Title}</h4>
                                    <em>Overview</em>
                                    <p>${updObj.Overview}</p>
                                    <div class="action">
                                        <button class="btn btn-outline-info" onclick="onEdit(this)">Edit</button>
                                        <button class="btn btn-outline-danger" onclick="onDelete(this)">Delete</button>
                                    </div>
                                </div>
                            </figcaption>`;
    movieform.reset();
    showmovieform();
    Swal.fire({
        icon: "success",
        title: `The Movie Information of ${updObj.Title} is updated successfully !!!! `,
        timer: 1500,
      });
}

movieform.addEventListener("submit", addmovieform);

UpdBtn.addEventListener("click", onMovieUpdate);