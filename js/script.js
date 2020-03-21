
class Book {
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI
{
    static displayBooks()
    {
        const data = Store.getBooks();
        const books = data;
        books.forEach((book)=>{UI.addBookToList(book)})
    }


    static addBookToList(book)
    {
        const booklist = document.getElementById("book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td> <i class="btn btn-danger fa fa-trash delete"></i> </td>
                     
                        `
        booklist.appendChild(row);
    }



    // add new book to table
    static addNewBook()
    {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        if(title === '' || author === '' || isbn === '')
        {
            UI.showAlert("Please Fill All Fields","danger")
            return false;
        }

        const book = new Book(title,author,isbn);
        UI.addBookToList(book)
        Store.addBook(book);
        UI.showAlert("Book Added","success")
        UI.clearFields();
        
    }


    static deleteBook(el)
    {
        if(el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove()
        }
    }


    // clear all fields
    static clearFields()
    {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value='';
    }

    static showAlert(message,className)
    {
        document.getElementById("message").innerHTML = `<h3 class="alert alert-${className} text-center"> ${message}</h3>`;
        setTimeout(()=>{
            document.getElementById("message").classList.remove("alert","alert-"+className);
            document.getElementById("message").innerHTML = '';
        },1500)
    }
}


class Store
{
    static getBooks()
    {
        let books;
        if(localStorage.getItem("books") === null)
        {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem("books"))
        }

        return books;
    }


    static addBook(book)
    {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }


    static removeBook(isbn)
    {
        const books = Store.getBooks();
        const newBooks = books.filter((book)=> book.isbn !== isbn);
        localStorage.setItem("books",JSON.stringify(newBooks));

    }
}




// display box 

document.addEventListener("DOMContentLoaded",UI.displayBooks());

document.getElementById("book-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    UI.addNewBook();
})


// delete 

document.getElementById("book-list").addEventListener("click",(e)=>
{
    const el = e.target;
    UI.deleteBook(el)
    Store.removeBook(el.parentElement.previousElementSibling.textContent);
})
