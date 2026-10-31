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

// --------------------------------------------------
