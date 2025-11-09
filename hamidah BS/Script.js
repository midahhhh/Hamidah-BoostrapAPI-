// 🔑 API key NewsAPI
const key = "208bf4b665c24b08a1719225f94220a4";
const api = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${key}`;

// 📰 Variabel global
let allNews = [];
const container = document.getElementById("news-container");

// 🧩 Fungsi untuk menampilkan berita
function displayNews(newsArray) {
  container.innerHTML = "";

  if (newsArray.length === 0) {
    container.innerHTML = "<p class='col-12 text-center'>No news found.</p>";
    return;
  }

  newsArray.forEach((article) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${article.urlToImage || "https://via.placeholder.com/400x200"}" 
             class="card-img-top" alt="News Image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title || "No title"}</h5>
          <p class="text-muted">${new Date(article.publishedAt).toLocaleDateString()}</p>
          <p class="card-text">${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary mt-auto">Read More</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// 🧠 Fetch data dari API
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    if (data.articles && data.articles.length > 0) {
      allNews = data.articles;
      displayNews(allNews);
    } else {
      container.innerHTML = "<p class='col-12 text-center'>No news found.</p>";
    }
  })
  .catch((error) => {
    console.error("Error fetching news:", error);
    container.innerHTML =
      "<p class='col-12 text-center text-danger'>Failed to load news.</p>";
  });

// 🔍 Fitur pencarian berita
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = allNews.filter(
    (article) =>
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.description && article.description.toLowerCase().includes(query))
  );
  displayNews(filtered);
});
