let postTitle = document.getElementById("post-title");
let postDescription = document.getElementById("post-description");
let postButton = document.querySelector(".post-button");

    postButton.addEventListener("click", function(){

    if (postTitle.value.length > 0 && postDescription.value.length > 0){
        let newPost = {};
            newPost.id_post = posts.length + 1;
            newPost.user = 1;
            newPost.title = postTitle.value;
            newPost.text = postDescription.value;
        
        posts.push(newPost);
        postTitle.value = "";
        postDescription.value = "";

        listPosts();
    }
})

const sugestUsersWrapper = document.querySelector(".follow-suggestions");

for (let i = 0; i < sugestUsers.length; i++){
    idUser = sugestUsers[i];

let li = document.createElement("li");
    li.classList.add("dis-flex", "items-center", "justify-between");

    li.innerHTML = `
            <div class="user-card">
            <div class="img-wrapper">
                <img src=${users[idUser-1].img} alt=${users[idUser-1].user}>
            </div>
            <div>
                <h3>${users[idUser-1].user}</h3>
                <span>${users[idUser-1].stack}</span>          
            </div>
            </div>
    `
    let buttonFollow = document.createElement("button");
        buttonFollow.classList.add("button-follow", "dis-flex", "items-center");
        buttonFollow.innerText = "Seguir";

        buttonFollow.addEventListener("click", function(){
        let following = buttonFollow.classList.toggle("button-following");
        
        if (following){
            this.innerText = "Seguindo";

        }else {
            this.innerText = "Seguir";

        }
})

    li.appendChild(buttonFollow);
    sugestUsersWrapper.appendChild(li);
}

const postWrapper = document.querySelector(".posts-wrapper");

function createPost(item){

    let post = document.createElement("li");
        post.classList.add ("dis-flex", "collun", "gap-2");

    let contLikes = 36;

    let buttonLikeImg = "src/assets/img/vector-hear.png";
    let buttonLikeImgColor = "src/assets/img/vector-red.png";

    post.innerHTML = `
        <div class="user-card">
        <div class="img-wrapper">
            <img src=${users[item.user-1].img} alt=${users[item.user-1].user}>
        </div>
            <div>
            <h3>${users[item.user-1].user}</h3>
            <span>${users[item.user-1].stack}</span>
            </div>
        </div>
        <h2 class="title-1">${item.title}</h2>
        <p class="text-1">
            ${(item.text).substring(0, 150)}...
        </p>
    `

    let buttonsPostsWrapper = document.createElement("div");
        buttonsPostsWrapper.classList.add("dis-flex", "gap-1", "items-center");

        buttonPost = document.createElement("button");
        buttonPost.setAttribute("data-control-post", `${item.id_post}`);
        buttonPost.classList.add("button-open-post");
        buttonPost.setAttribute("id", `${item.user}`);
        buttonPost.innerText = "Abrir Post";
    

    let buttonLikeWrapper = document.createElement("div");
        buttonLikeWrapper.classList.add("dis-flex", "items-center");

    let buttonLike = document.createElement("button");
        buttonLike.classList.add("button-like", "dis-flex", "items-center");
        buttonLike.innerHTML = `<img src=${buttonLikeImg} alt="Button Like">`

        buttonLike.addEventListener("click", function(){       
        let likeTrue = buttonLike.classList.toggle("bg-none");

        if (likeTrue){
            buttonLike.innerHTML = `<img src=${buttonLikeImgColor} alt="Button Like">`
            contLikeSpan.innerHTML = "36";
            contLikeSpan.innerText = contLikes;

        } else {
            buttonLike.innerHTML = `<img src=${buttonLikeImg} alt="Button Like">`
            contLikeSpan.innerHTML = "35";

        }
    })

    let contLikeSpan = document.createElement("span");
        contLikeSpan.classList.add("text-2");

        buttonLikeWrapper.appendChild(buttonLike);
        buttonLikeWrapper.appendChild(contLikeSpan);
        buttonsPostsWrapper.appendChild(buttonPost);
        buttonsPostsWrapper.appendChild(buttonLikeWrapper);
        post.appendChild(buttonsPostsWrapper);          

    return post;
}

function listPosts(){
    postWrapper.innerHTML = "";

    for (let i = 0; i < posts.length; i++){
        let item = posts[i];
        let post = createPost(item);
        postWrapper.appendChild(post);
    }
    createModalBody();
}

listPosts();

    let allButtons = document.querySelectorAll("button");
    for (let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", function(event){
            event.preventDefault();
        });
    };

function createModalBody(){
    let body = document.querySelector("body");

    let buttonsOpenPost = document.querySelectorAll("[data-control-post]");

    for (let i = 0; i < buttonsOpenPost.length; i++){
        let button = buttonsOpenPost[i];
    
        button.addEventListener("click", function(){
            
            body.appendChild(createModal(button));
        })
    }
}

function createModal(btn){
    let idBtn = btn.getAttribute("id");
    let dataValue = btn.getAttribute("data-control-post");

    let modalWrapper = document.createElement("div");
        modalWrapper.classList.add("modal-wrapper");

    let modal = document.createElement("div");
        modal.classList.add("modal");

    let modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");

        modalHeader.innerHTML = `
            <div class="user-card">
                <div class="img-wrapper">
                    <img class="img-main" src=${users[parseInt(idBtn)-1].img} alt=${users[parseInt(idBtn)-1].user}>
                </div>
                <div>
                    <h3>${users[parseInt(idBtn)-1].user}</h3>
                    <span>${users[parseInt(idBtn)-1].stack}</span>
                </div>
            </div>
    `
    let buttonCloseModal = document.createElement("button");
        buttonCloseModal.innerText = "X";
        buttonCloseModal.addEventListener("click", function(e){

        e.composedPath()[3].remove();

    });

        modalHeader.appendChild(buttonCloseModal);
        modal.appendChild(modalHeader);

    let titleModal = document.createElement("h2");
        titleModal.innerHTML = `${posts[parseInt(dataValue) - 1].title}`

    let textModal = document.createElement("p");
        textModal.innerHTML = `${posts[parseInt(dataValue) - 1].text}`

        modal.appendChild(titleModal);
        modal.appendChild(textModal);
        modalWrapper.appendChild(modal);
    
    return modalWrapper; 
};