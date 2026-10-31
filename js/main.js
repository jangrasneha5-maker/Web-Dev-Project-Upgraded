/*
  MODERN MUSICIAN - DOM PRACTICE VERSION

  This project uses the JavaScript concepts from the shared class examples:
  variables, functions, objects, loops, strings, arrays/HTMLCollections,
  DOM selection, styles, attributes, createElement(), appendChild(),
  parentElement, and click/input/change/keydown/submit events.

  No framework is used. Read the numbered sections alongside DOM_GUIDE.md.
*/

// --------------------------------------------------
// 1. SMALL HELPERS TO ADD / REMOVE CSS CLASSES
// --------------------------------------------------
// This uses getAttribute(), setAttribute(), hasAttribute(), split(),
// indexOf(), loops, and removeAttribute() from the DOM/string lessons.

function hasCssClass(element, className) {
  if (element == null || !element.hasAttribute("class")) {
    return false;
  }

  var classNames = element.getAttribute("class").split(" ");
  return classNames.indexOf(className) !== -1;
}

function addCssClass(element, className) {
  if (element != null && !hasCssClass(element, className)) {
    var oldClasses = element.getAttribute("class");

    if (oldClasses == null || oldClasses === "") {
      element.setAttribute("class", className);
    } else {
      element.setAttribute("class", oldClasses + " " + className);
    }
  }
}

function removeCssClass(element, className) {
  if (element != null && element.hasAttribute("class")) {
    var oldClasses = element.getAttribute("class").split(" ");
    var newClasses = "";

    for (var i = 0; i < oldClasses.length; i++) {
      if (oldClasses[i] !== "" && oldClasses[i] !== className) {
        if (newClasses !== "") {
          newClasses = newClasses + " ";
        }
        newClasses = newClasses + oldClasses[i];
      }
    }

    if (newClasses === "") {
      element.removeAttribute("class");
    } else {
      element.setAttribute("class", newClasses);
    }
  }
}

// --------------------------------------------------
// 2. SELECT ELEMENTS + MOBILE NAVIGATION
// --------------------------------------------------
// The page has one menu button and one navigation list.
var menuToggleItems = document.getElementsByClassName("menu-toggle");
var menuToggle = menuToggleItems[0];
var navLinks = document.getElementById("nav-links");
var navLinkItems = document.getElementsByClassName("nav-link");

function closeMenu() {
  if (menuToggle != null && navLinks != null) {
    removeCssClass(navLinks, "open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    removeCssClass(document.body, "menu-open");
  }
}

if (menuToggle != null && navLinks != null) {
  menuToggle.addEventListener("click", function () {
    if (hasCssClass(navLinks, "open")) {
      closeMenu();
    } else {
      addCssClass(navLinks, "open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
      addCssClass(document.body, "menu-open");
    }
  });
}

for (var a = 0; a < navLinkItems.length; a++) {
  navLinkItems[a].addEventListener("click", closeMenu);
}

// If the browser window becomes wider while the menu is open, close it.
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

// Mark the current page by reading each link's data-page attribute.
var pageName = window.location.pathname.split("/").pop();
if (pageName === "" || pageName == null) {
  pageName = "index.html";
}

for (var b = 0; b < navLinkItems.length; b++) {
  if (navLinkItems[b].getAttribute("data-page") === pageName) {
    addCssClass(navLinkItems[b], "active");
    navLinkItems[b].setAttribute("aria-current", "page");
  } else {
    removeCssClass(navLinkItems[b], "active");
    if (navLinkItems[b].hasAttribute("aria-current")) {
      navLinkItems[b].removeAttribute("aria-current");
    }
  }
}

// --------------------------------------------------
// 3. MAKE THE PAGE CONTENT VISIBLE
// --------------------------------------------------
// CSS handles the appearance. This loop adds the class expected by the CSS.
var revealItems = document.getElementsByClassName("reveal");
for (var c = 0; c < revealItems.length; c++) {
  addCssClass(revealItems[c], "is-visible");
}

// 4. MUSIC TRACK SELECTION
// --------------------------------------------------
var tracks = {
  midnight: {
    src: "assets/audio/midnight-dreams.mp3"
  },
  electric: {
    src: "assets/audio/electric-nights.mp3"
  },
  lost: {
    src: "assets/audio/lost-in-sound.mp3"
  }
};

var audioPlayer = document.getElementById("audio-player");
var playerTitle = document.getElementById("player-title");
var playerStatus = document.getElementById("player-status");
var playButtons = document.getElementsByClassName("play-button");

function selectTrack(button) {
  var trackId = button.getAttribute("data-track");
  var track = tracks[trackId];

  if (audioPlayer == null || track == null) {
    return;
  }

  var albumArt = button.parentElement;
  var musicCard = albumArt.parentElement;
  var titleElement = musicCard.getElementsByTagName("h3")[0];
  var selectedTitle = "";

  if (titleElement != null) {
    selectedTitle = titleElement.textContent;
  }

  audioPlayer.setAttribute("src", track.src);
  audioPlayer.setAttribute("controls", "controls");
  addCssClass(audioPlayer, "audio-ready");

  if (playerTitle != null) {
    playerTitle.textContent = selectedTitle;
  }

  if (playerStatus != null) {
    playerStatus.textContent =
      "Track selected. Use the audio controls to start playback.";
  }

  for (var d = 0; d < playButtons.length; d++) {
    var currentButton = playButtons[d];
    var currentCard = currentButton.parentElement.parentElement;
    var playIcons = currentButton.getElementsByClassName("play-icon");

    if (currentButton === button) {
      addCssClass(currentButton, "is-selected");
      addCssClass(currentCard, "is-selected");
      currentButton.setAttribute("aria-pressed", "true");

      if (playIcons.length > 0) {
        playIcons[0].textContent = "✓";
      }
    } else {
      removeCssClass(currentButton, "is-selected");
      removeCssClass(currentCard, "is-selected");
      currentButton.setAttribute("aria-pressed", "false");

      if (playIcons.length > 0) {
        playIcons[0].textContent = "▶";
      }
    }
  }
}

for (let e = 0; e < playButtons.length; e++) {
  playButtons[e].addEventListener("click", function () {
    selectTrack(playButtons[e]);
  });
}
// --------------------------------------------------
// 5. MUSIC CATALOGUE SEARCH AND FILTER
// --------------------------------------------------
var musicSearch = document.getElementById("music-search");
var genreFilter = document.getElementById("genre-filter");
var catalogueCards = document.getElementsByClassName("catalogue-card");
var musicResults = document.getElementById("music-results");
var noMusicResults = document.getElementById("no-music-results");

function filterMusic() {
  var searchValue = "";
  var selectedGenre = "all";
  var visibleCount = 0;

  if (musicSearch != null) {
    searchValue = musicSearch.value.toLowerCase().trim();
  }

  if (genreFilter != null) {
    selectedGenre = genreFilter.value;
  }

  for (var f = 0; f < catalogueCards.length; f++) {
    var card = catalogueCards[f];
    var title = card.getAttribute("data-title");
    var genre = card.getAttribute("data-genre");

    var matchesSearch =
      searchValue === "" ||
      (title != null && title.indexOf(searchValue) !== -1);

    var matchesGenre =
      selectedGenre === "all" ||
      genre === selectedGenre;

    if (matchesSearch && matchesGenre) {
      card.removeAttribute("hidden");
      visibleCount++;
    } else {
      card.setAttribute("hidden", "hidden");
    }
  }

  if (musicResults != null) {
    if (visibleCount === catalogueCards.length) {
      musicResults.textContent = "Showing all releases";
    } else if (visibleCount === 1) {
      musicResults.textContent = "Showing 1 release";
    } else {
      musicResults.textContent =
        "Showing " + visibleCount + " releases";
    }
  }

  if (noMusicResults != null) {
    if (visibleCount === 0) {
      noMusicResults.removeAttribute("hidden");
    } else {
      noMusicResults.setAttribute("hidden", "hidden");
    }
  }
}

if (musicSearch != null) {
  musicSearch.addEventListener("input", filterMusic);
}

if (genreFilter != null) {
  genreFilter.addEventListener("change", filterMusic);
}