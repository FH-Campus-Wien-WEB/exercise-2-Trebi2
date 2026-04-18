window.onload = function () {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      for (const movie of movies) {
        const article = document.createElement("article");
        article.id = movie.imdbID;

        const title = document.createElement("h1");
        title.textContent = movie.Title;

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "movie-content";

        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.alt = "Poster of " + movie.Title;

        const info = document.createElement("div");
        info.className = "movie-info";

        const released = document.createElement("p");
        released.textContent = "Released: " + movie.Released;

        const runtime = document.createElement("p");
        runtime.textContent = "Runtime: " + movie.Runtime + " min";

        const genresParagraph = document.createElement("p");
        genresParagraph.textContent = "Genres: ";

        for (const genre of movie.Genres) {
          const genreSpan = document.createElement("span");
          genreSpan.className = "genre";
          genreSpan.textContent = genre;
          genresParagraph.appendChild(genreSpan);
        }

        const directors = document.createElement("p");
        directors.textContent = "Directors: " + movie.Directors.join(", ");

        const writers = document.createElement("p");
        writers.textContent = "Writers: " + movie.Writers.join(", ");

        const actors = document.createElement("p");
        actors.textContent = "Actors: " + movie.Actors.join(", ");

        const plot = document.createElement("p");
        plot.textContent = "Plot: " + movie.Plot;

        const metascore = document.createElement("p");
        metascore.textContent = "Metascore: " + movie.Metascore;

        const imdbRating = document.createElement("p");
        imdbRating.textContent = "IMDb Rating: " + movie.imdbRating;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        info.appendChild(released);
        info.appendChild(runtime);
        info.appendChild(genresParagraph);
        info.appendChild(directors);
        info.appendChild(writers);
        info.appendChild(actors);
        info.appendChild(plot);
        info.appendChild(metascore);
        info.appendChild(imdbRating);
        info.appendChild(editButton);

        contentWrapper.appendChild(poster);
        contentWrapper.appendChild(info);

        article.appendChild(title);
        article.appendChild(contentWrapper);

        bodyElement.appendChild(article);
      }
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };

  xhr.open("GET", "/movies");
  xhr.send();
};