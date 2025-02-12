let currentChat = 0;

let currentButtonTranslation = 0;

let chatBoxElem = document.querySelector(".chat-box");
let responseButtonsElem = document.querySelector(".response-buttons");

function updateChat(newChatID) {
    let newChat = chatText[newChatID];
    chatBoxElem.innerHTML = newChat.content;
    responseButtonsElem.innerHTML = ""
    newChat.buttons.forEach((button) => {
        let buttonElem = document.createElement("button");
        buttonElem.setAttribute("class", "response-button");
        buttonElem.setAttribute("data-attribute", button.id);
        buttonElem.textContent = button.content;
        responseButtonsElem.appendChild(buttonElem);
    })
}

function dodge(selectedButton) {
    selectedButton.style.transform = `translateY(${Math.random() * 300}px)`; // Move the button down by 50px
}

responseButtonsElem.addEventListener("click", (event) => {
    let selectedButton = event.target;
    if (selectedButton.classList.contains("response-button")) {
        newChatID = selectedButton.getAttribute("data-attribute");
        if (newChatID != -1) {
            updateChat(newChatID);
        } else {
            dodge(selectedButton);
        }
        
    }
})

responseButtonsElem.addEventListener("mouseover", (event) => {
    let selectedButton = event.target;
    if (selectedButton.classList.contains("response-button")) {
        newChatID = selectedButton.getAttribute("data-attribute");
        if (newChatID == -1) {
            dodge(selectedButton);
        }
    }
})

let chatText = [
    {
        id: 0,
        content: `<div>Oh, <span style="color: red">Hey</span></div><div>Didn't see you there.</div>`,
        buttons: [
            {
                id: 1,
                content: "Oh hey, yeah I was following a link my boyfriend sent me"
            },
            {
                id: 1,
                content: "Yeah I didn't want to be here... I'm gonna head out"
            },
        ]
    },
    {
        id: 1,
        content: `<div>Oh nice nice</div><br><div>Oh, uh since I have you here...</div><br><div>I have <span style="color: red;">something I've been meaning to ask</span></div>`,
        buttons: [
            {
                id: 2,
                content: "Yeah?"
            },
            {
                id: 4,
                content: "Eek, I see where this is going and I really think we're better off as..."
            }
        ]
    },
    {
        id: 2,
        content: `<div>Phew! Okay.</div><br><div>Will you let me lick <span style="color: red;">whip cream</span> off them?</div>`,
        buttons: [
            {
                id: 3,
                content: "OMG YES!!!",
            },
            {
                id: 3,
                content: "Be so fucking fr rn",
            }
        ]
    },
    {
        id: 3,
        content: `<div>Ok ok ok. For real.</div><br><div>For the <span style="color: red;">fourth time</span>...</div>`,
        buttons: [
            {
                id: 5,
                content: "Yeahhhh?",
            },
            {
                id: 5,
                content: "Literally spit it the fuck out you fucking pest"
            }
        ]
    },
    {
        id: 4,
        content: `<div>WOAH WOAH WAIT</div><br><div>We've been dating for four years -</div><br><div>We <span style="color: red;">LIVE</span> together</div>`,
        buttons: [
            {
                id: 2,
                content: "Oh yeah, haha. Ok you can ask your question"
            },
            {
                id: 3,
                content: "Yeah about that..."
            }
        ]
    },
    {
        id: 5,
        content: `<div>Will you be my</div><br><div><span style="color: red;">Valentine?</span></div>`,
        buttons: [
            {
                id: 6,
                content: "Yes!! <33",
            },
            {
                id: -1,
                content: "Yuck!",
                disabled: true
            }
        ]
    },
    {
        id: 6,
        content: `<div>Hooray!!!</div><br><div><span style="color: red;">Yippee</span></div><br><div>Ok ILY, bye</div>`,
        buttons: []
    },
]

window.addEventListener("load", () => {
    updateChat(0);
})  
