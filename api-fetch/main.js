// ============================================================
// EXERCISE: Fetching data from an API
// ============================================================
//
// GOAL
// ----
// Build a book search using the Open Library API.
// When the user searches for a title, display the results
// (book title + author) as a list on the page.
//
// API endpoint:
// https://openlibrary.org/search.json?q=YOUR_SEARCH_TERM
// e.g.: https://openlibrary.org/search.json?q=the+lord+of+the+rings
//
// Try it in your browser first to see what the response looks like.
// The data you need is inside: response.docs[]
// Each book has: .title and .author_name[]
//
//
// ============================================================

//Without Pictures
// console.log("script loaded");

// const input = document.getElementById("search-input");
// const button = document.getElementById("search-btn");
// const resultsEl = document.getElementById("results");

// async function searchBooks(query) {
//   const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Network response was not ok");
//   const data = await res.json();
//   return data.docs || [];
// }

// function renderResults(books) {
//   resultsEl.innerHTML = "";
//   if (!books || books.length === 0) {
//     resultsEl.textContent = "Keine Ergebnisse.";
//     return;
//   }
//   books.slice(0, 10).forEach((book) => {
//     const li = document.createElement("li");
//     const title = book.title || "Unbekannter Titel";
//     const authors = Array.isArray(book.author_name)
//       ? book.author_name.join(", ")
//       : "Unbekannter Autor";
//     li.textContent = `${title} — ${authors}`;
//     resultsEl.appendChild(li);
//   });
// }

// async function handleSearch() {
//   const query = input.value.trim();
//   if (!query) return;
//   resultsEl.textContent = "Suche…";
//   try {
//     const books = await searchBooks(query);
//     renderResults(books);
//   } catch (err) {
//     resultsEl.textContent = "Fehler bei der Suche.";
//     console.error(err);
//   }
// }

// button.addEventListener("click", handleSearch);
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") handleSearch();
// });

// With Pictures
// ...existing code...
console.log("script loaded");

const input = document.getElementById("search-input");
const button = document.getElementById("search-btn");
const resultsEl = document.getElementById("results");

if (!input || !button || !resultsEl) {
  console.error(
    "DOM elements not found. Öffne api-fetch/index.html im Browser oder starte Live Server.",
  );
}

async function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data.docs || [];
}

// ...existing code...
function renderResults(books) {
  resultsEl.innerHTML = "";
  if (!books || books.length === 0) {
    resultsEl.textContent = "Keine Ergebnisse.";
    return;
  }
  books.slice(0, 10).forEach((book) => {
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.margin = "8px 0";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "12px";

    const title = book.title || "Unbekannter Titel";
    const authors = Array.isArray(book.author_name)
      ? book.author_name.join(", ")
      : "Unbekannter Autor";

    // Cover (if available)
    if (book.cover_i) {
      const img = document.createElement("img");
      img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      img.alt = title;
      img.width = 80;
      img.height = 120;
      img.style.objectFit = "cover";
      li.appendChild(img);
    }

    // Text + Link
    const info = document.createElement("div");
    const a = document.createElement("a");
    a.textContent = title;
    a.href = book.key ? `https://openlibrary.org${book.key}` : "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.fontWeight = "600";
    a.style.textDecoration = "none";
    a.style.color = "inherit";

    const p = document.createElement("p");
    p.textContent = authors;
    p.style.margin = "4px 0 0 0";
    p.style.fontSize = "0.95rem";

    info.appendChild(a);
    info.appendChild(p);
    li.appendChild(info);

    resultsEl.appendChild(li);
  });
}
// ...existing code...

async function handleSearch() {
  const query = input.value.trim();
  if (!query) return;
  resultsEl.textContent = "Suche…";
  try {
    const books = await searchBooks(query);
    renderResults(books);
  } catch (err) {
    resultsEl.textContent = "Fehler bei der Suche.";
    console.error(err);
  }
}

button.addEventListener("click", handleSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
// ...existing code...
