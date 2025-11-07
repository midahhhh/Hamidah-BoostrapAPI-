const key = '208bf4b665c24b08a1719225f94220a4';
let allNews = [];
const container = document.getElementById("news-container");
const loader = document.getElementById("loader");

// Fetch news by category
function loadNews(category = 'general') {
  container.innerHTML = '';
  loader.style.display = "block";

  fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=12&apiKey=${key}`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = "none";
      if (data.articles && data.articles.length > 0) {
        allNews = data.articles;
        displayNews(allNews);
      } else {
        container.innerHTML = "<p class='col-12 text-center'>No news found.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      loader.style.display = "none";
      container.innerHTML = "<p class='col-12 text-center text-danger'>Failed to load news.</p>";
    });
}

// Display news cards
function displayNews(newsArray) {
  container.innerHTML = "";
  newsArray.forEach(article => {
    let col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top img-fluid" alt="News Image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title || "No title"}</h5>
          <p class="text-muted">${new Date(article.publishedAt).toLocaleDateString()}</p>
          <p class="card-text">${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary mt-auto">Read More</a>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function() {
  let query = this.value.toLowerCase();
  let filtered = allNews.filter(article =>
    (article.title && article.title.toLowerCase().includes(query)) ||
    (article.description && article.description.toLowerCase().includes(query))
  );
  displayNews(filtered);
});

// Category navigation
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const category = this.getAttribute("data-category");
    loadNews(category);
    document.querySelectorAll(".nav-item").forEach(li => li.classList.remove("active"));
    this.parentElement.classList.add("active");
  });
});

// Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("themeToggle").textContent = isDark ? "☀️" : "🌙";
});

// Initial load
loadNews();
