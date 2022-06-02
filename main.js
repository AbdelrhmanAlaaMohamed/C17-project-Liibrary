
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
};
let libraryList = document.querySelector("#library-list");
let myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

    
function render() {

    for (i = libraryList.rows.length - 1; i > 0; i--) {
        libraryList.deleteRow(i);
    }
    for (i = 0; i < myLibrary.length; i++) {
        const newEntryRow = libraryList.insertRow(1);
        const titleCell = newEntryRow.insertCell(0);
        const authorCell = newEntryRow.insertCell(1);
        const pagesCell = newEntryRow.insertCell(2);
        const readCell = newEntryRow.insertCell(3);
        const deleteCell = newEntryRow.insertCell(4);
        const changeStatus = newEntryRow.insertCell(4);
        titleCell.textContent = myLibrary[i].title;
        authorCell.textContent = myLibrary[i].author;
        pagesCell.textContent = myLibrary[i].pages;
        readCell.textContent = myLibrary[i].read;
        deleteCell.innerHTML = "<button onclick='deleteBook(event)' > Remove </button>"
        changeStatus.innerHTML = "<button onclick='changeStatus(event)' > Read or Not Read </button>"
        newEntryRow.dataset.id = `${i}`
    }
};


function deleteBook(event) {
    const table = event.target.parentNode;
    const tr = table.parentNode;
    const arrayIndex = +tr.dataset.id
    libraryList.deleteRow((arrayIndex + 1))
    myLibrary.splice(arrayIndex, 1)
    render()

};

function changeStatus(event) {
    let table = event.target.parentNode;
    let tr = table.parentNode;
    let arrayIndex = +tr.dataset.id

    if (myLibrary[arrayIndex].read == "Not Read") {
        myLibrary[arrayIndex].read = "Read";
        render()
    } else {
        myLibrary[arrayIndex].read = "Not Read";
        render()
    }
};


function getFromForm() {
    let titleForm = document.querySelector("#title").value;
    let authorForm = document.querySelector("#author").value;
    let pagesForm = +document.querySelector("#pages").value;
    return [titleForm, authorForm, pagesForm];

};
let bookForm = document.querySelector("#book-form");
let submit = document.querySelector("#submit-btn");
submit.addEventListener("click", (event) => {
    addBookToLibrary(getFromForm()[0], getFromForm()[1], getFromForm()[2], getFromForm()[3]);
    render();
    event.preventDefault();
    closeForm();
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
});

function closeForm() {
    bookForm.style.display = "none";
};

function openForm() {
    bookForm.style.display = "block";
};
let newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", openForm);