//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e) {
  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // // Local Storage Test -> no lib needed
  // localStorage.setItem('test', "Hello World");
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test')
  // console.log(localStorage.getItem('test'));

  // Test if bookmark is null
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    let bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStroage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmark
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmark
  fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  let bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';

  for (const bookmark of bookmarks) {
    const name = bookmark.name;
    const url = bookmark.url;

    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a> ' +
      '</h3>' +
      '</div>'
  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}