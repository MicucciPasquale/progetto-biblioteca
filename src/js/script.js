function goHome() {
  window.location.href = "index.html";
}



function handleKeyPress(event) {
  if (event.key === 'Enter') {
    searchBooks();
  }
}

function searchBooks() {
  const searchBox = document.getElementById('searchBox');
  const category = searchBox.value.trim().toLowerCase();

  if (category === '') {
    alert('Inserisci una categoria valida');
    return;
  }

  const apiUrl = `https://openlibrary.org/search.json?subject=${category}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayBooks(data.docs))
    .catch(error => console.error('Errore nella richiesta API:', error));
}

function displayBooks(books) {
  const bookListContainer = document.getElementById('bookList');
  bookListContainer.innerHTML = '';

  if (!books || books.length === 0) {
    bookListContainer.innerHTML = 'Nessun libro trovato per questa categoria.';
    return;
  }

  books.forEach(book => {
    const title = book.title;
    const authors = book.author_name ? book.author_name.join(', ') : 'Autore sconosciuto';
    const key = book.key;

    const bookItem = document.createElement('div');
    bookItem.classList.add('bookItem');
    bookItem.innerHTML = `<strong>${title}</strong> - ${authors} <button onclick="showBookDescription('${key}')">Mostra Descrizione</button>`;

    bookListContainer.appendChild(bookItem);
  });
}

function showBookDescription(bookKey) {
  const descriptionContainer = document.getElementById('bookDescription');

  const apiUrl = `https://openlibrary.org${bookKey}.json`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const description = data.description || 'Nessuna descrizione disponibile.';
      descriptionContainer.innerHTML = `<strong>Descrizione del Libro:</strong><br>${description}`;
    })
    .catch(error => console.error('Errore nella richiesta API:', error));
}

function getAuthors() {
  const apiUrl = 'https://openlibrary.org/search/authors.json';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayAuthors(data.authors))
    .catch(error => console.error('Errore nella richiesta API:', error));
}

function displayAuthors(authors) {
  const authorListContainer = document.getElementById('authorList');
  authorListContainer.innerHTML = '';

  if (!authors || authors.length === 0) {
    authorListContainer.innerHTML = 'Nessun autore trovato.';
    return;
  }

  authors.forEach(author => {
    const authorName = author.name || 'Autore sconosciuto';

    const authorItem = document.createElement('div');
    authorItem.classList.add('authorItem');
    authorItem.textContent = authorName;

    authorListContainer.appendChild(authorItem);
  });
}


document.getElementById('searchBox').addEventListener('keypress', handleKeyPress);
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchBooks();
  }
}