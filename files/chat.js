/* FORM USER */

var uname;
const socket = io()
var chat = document.querySelector('#chat');
var ADD_USER = document.getElementById('ADD_USER');
var ADD_USER_INPUT = document.querySelector('#ADD_USER input');
var ENTER_username = document.getElementById('ENTER_username');

ADD_USER.addEventListener('submit', e => {
    e.preventDefault()
    if (ADD_USER_INPUT.value.length == 0) {
        return;
    } else {
        uname_DEFINE()
    }
})


function uname_DEFINE() {
    var uname = ADD_USER_INPUT.value;
    document.cookie = uname;
    ENTER_username.style.display = "none";
}

/* USER COOKIE */

if (document.cookie) {
    var uname = document.cookie;
    ENTER_username.style.display = "none";
} else {
    ENTER_username.style.display = "flex";
}

/* FIGURE */

var group_FIGURE_BUTTON = document.querySelectorAll('#group_FIGURE button img');
var figure_URL;

var btn_FIGURE = document.querySelector('.btn_FIGURE');
var group_FIGURE = document.querySelector('#group_FIGURE');

btn_FIGURE.addEventListener('click', e => {
    group_FIGURE.style.display = "flex";
})

chat.addEventListener('click', e => {
    group_FIGURE.style.display = "none";
})

/* WEB SOCKET */

socket.emit("newuser", uname)
var send = document.querySelector('.send');
var no_msg = document.querySelector('.no_msg');

function renderMessage(type, message) {
    if (type == "my") {
        var el = document.createElement("div")
        el.setAttribute("class", "message MY_message")
        no_msg.style.display = "none";
        el.innerHTML = `
        
        <div>
        
        <div class="name">Você</div>
        <div class="text">${message.text}</div>
        
        </div>
        
        `
        chat.appendChild(el);
    } else if (type == "other") {
        var el = document.createElement("div")
        el.setAttribute("class", "message OTHER_message")
        no_msg.style.display = "none";
        el.innerHTML = `
        
        <div>
        <div class="name">${message.username}</div>
        <p class="text">${message.text}</p>
        
        </div>
        
        `
        chat.appendChild(el);
    } else if (type == "update") {
        var el = document.createElement("div")
        el.setAttribute("class", "message UPDATE_message")
        el.innerHTML = `
        <div class="update">
        
        <p class="update_TEXT">${message} Join!</p>
        
        </div>
        `
        chat.appendChild(el);
    } else if (type == "figure") {
        var el = document.createElement("div")
        el.setAttribute("class", "message MY_message MY_FIG")
        el.innerHTML = `
        <div class="update">
        
        <div class="name">${message.username}</div>
        <div class="image"><img src="${message.figure}" /></div>
        
        </div>
        `
        chat.appendChild(el);
    } else if (type == "figureOTH") {
        var el = document.createElement("div")
        el.setAttribute("class", "message OTHER_message MY_FIG")
        el.innerHTML = `
        <div class="update">
        
        <div class="name">${message.username}</div>
        <div class="image"><img src="${message.figure}" /></div>
        
        </div>
        `
        chat.appendChild(el);
    }
}

send.addEventListener('click', () => {
    var message = document.querySelector('#message').value;

    if (message.length == 0) {
        return;
    }

    renderMessage("my", {
        username: uname,
        text: message
    });

    socket.emit("message", {
        username: uname,
        text: message
    });
    window.scrollTo(0, document.body.scrollHeight);
    var message = document.querySelector('#message').value = "";
})

group_FIGURE_BUTTON.forEach(figure => {
    figure.addEventListener('click', () => {
        var figure_URL = figure;
        socket.emit("figure", {
            username: uname,
            figure: figure_URL.src
        });

        renderMessage("figure", {
            username: uname,
            figure: figure_URL.src
        });


        no_msg.style.display = "none";
        group_FIGURE.style.display = "none";
        window.scrollTo(0, chat.scrollHeight);
    });
});

socket.on('figure', function (fg) {
    renderMessage("figureOTH", fg)
});

socket.on("update", update => {
    renderMessage("update", update)
});

socket.on("message", message => {
    renderMessage("other", message)
});


/* SCROLL */
window.scrollTo(0, chat.scrollHeight);


/* Copy INVITE */

var URL = window.location.href;
var sucess = document.getElementById('sucess');
var sucess_STRONG = document.querySelector('#sucess strong');
var sucess_P = document.querySelector('#sucess p');

function copyURL() {
    navigator.clipboard.writeText(URL);
    sucess_STRONG.textContent = "Copy!";
    sucess_P.textContent = "Link copiado!";
    sucess.classList.add('active');

    setTimeout(() => {
        sucess.classList.remove('active');
    }, 2500)

}

