const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text");
const list = document.getElementById("list-content")


function addingListElement() {
    let text = textInput.value;
    if( text != ""){
        let content = list.innerHTML;
        let shortText;
        if(text.length > 34){
            shortText = text.slice(0,34) + "...";
        }else {
            shortText = text;
        }
        content += `<div class="list-element">
                <h3 class="list-text">${shortText}</h3>
                <div class="done"><i class="fa-solid fa-check"></i></div>
                <div class="delete"><i class="fa-solid fa-trash"></i></div>
                <div class="full-note">
                    <div class="background"></div>
                    <div class="full-note-buttons">
                            <div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
                            <div class="done2"><i class="fa-solid fa-check"></i></div>
                            <div class="delete2"><i class="fa-solid fa-trash"></i></div>
                        </div>
                    <p class="full-note-text">${text}</p>
                </div>
    </div>`
    list.innerHTML = content;
    textInput.value = "";
    }
}

function deletAndDone(e){
    let element = e.target;
    let name = element.className;
    let parent = element.parentElement;
    switch (name) {
        case "done":
            parent.firstElementChild.classList.toggle("text-on");
            parent.lastElementChild.lastElementChild.classList.toggle("text-on");
            break;
        case "delete":
            parent.remove();
            break
        case "list-text text-on":
        case "list-text":
            let lastchilde = parent.lastElementChild;
            lastchilde.firstElementChild.classList.toggle("full-note-backgroud-open");
            lastchilde.lastElementChild.classList.toggle("full-note-text-open");
            lastchilde.children[1].classList.toggle("full-note-buttons-on");
            break
        case "background full-note-backgroud-open":
            parent.firstElementChild.classList.toggle("full-note-backgroud-open");
            parent.lastElementChild.classList.toggle("full-note-text-open");
            parent.children[1].classList.toggle("full-note-buttons-on");
            break
        case "edit":
            let read = parent.parentElement.lastElementChild;
            let write = document.createElement("textarea");
            parent.parentElement.lastElementChild.classList.remove("text-on");
            parent.parentElement.parentElement.firstElementChild.classList.remove("text-on");
            write.innerHTML = read.innerHTML;
            write.className = read.className;
            read.parentElement.replaceChild(write,read);
            parent.innerHTML = `<div class="save"><i class="fa-solid fa-floppy-disk"></i></div>
            <div class="delete2"><i class="fa-solid fa-trash"></i></div>
            `;
            parent.parentElement.firstElementChild.classList.toggle("locked");
            break
        case "save":
            let writer = parent.parentElement.lastElementChild;
            let redader = document.createElement("p");
            let newContent = writer.value;
            let newContentShort;
            if(newContent.length > 34){
                newContentShort = newContent.slice(0,34) + "...";
            }else {
                newContentShort = newContent;
            }
            redader.innerHTML = newContent;
            redader.className = writer.className;
            writer.parentElement.replaceChild(redader,writer);
            element.parentElement.parentElement.parentElement.firstElementChild.innerHTML = newContentShort;
            parent.innerHTML = `<div class="edit"><i class="fa-solid fa-pen-to-square"></i></div>
            <div class="done2"><i class="fa-solid fa-check"></i></div>
            <div class="delete2"><i class="fa-solid fa-trash"></i></div>`
            parent.parentElement.firstElementChild.classList.toggle("locked");
            break
        case "done2":
            parent.parentElement.lastElementChild.classList.toggle("text-on");
            parent.parentElement.parentElement.firstElementChild.classList.toggle("text-on");
            break
        case "delete2":
            parent.parentElement.parentElement.remove();
            break
        default:
            break;
    }
}

document.addEventListener("click", (e) => deletAndDone(e));
addButton.addEventListener("click",() => addingListElement());
