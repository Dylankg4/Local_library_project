function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// 1. understand the problem - reflect in your own words what that are asking you.
// 2. devise a plan - aka "peusdo code"
// 3. code your plan - excute your plan
// 4. refactor your code
function getBooksBorrowedCount(books) {
  // iterate over the books to review the recent 
    // return if the recent is false .length
  return books.filter((book) => {
    const [recent] = book.borrows;
    return !recent.returned;
  }).length;
}

// helper function
function _sortObjByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  })
}

/**
 * getMostCommonGenres(books);
  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ]
*/
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if(acc[genre]) {
      acc[genre] += 1
    } else {
      acc[genre] = 1
    }
    return acc;
  }, {});

  const sortCount = _sortObjByValues(count);
  // console.log('sortCount: ', sortCount)
  return sortCount.map((name) => ({ name, count: count[name]})).slice(0, 5)
}


function getMostPopularBooks(books) {
  // iterate over the books object and store into variable
    // create an object of "popularity" books w/ key/value pair of name and count
    // review the borrows.length of a given book and store it as count on object of popularity
    // return the popularity object
  // sort values store into a variable
  // slice(0, 5) five books are present, only the top five should be returned.
const results = books.map((book) => {
  const popularity = {
    name: book.title,
    count: book.borrows.length
  }
  return popularity
})
return results.sort((titleA, titleB) => titleB.count - titleA.count).slice(0, 5)
}

// function getMostPopularBooks(books) {
//   const groupById = books.reduce((acc, { id, borrows }) => {
//     acc[id] = borrows.length;
//     return acc;
//   }, {});

//   const sorted = _sortObjectByValues(groupById);
//   return sorted
//     .map((id) => {
//       const { title: name } = books.find(({ id: bookId }) => bookId === id);
//       return { name, count: groupById[id] };
//     })
//     .slice(0, 5);
// }

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
