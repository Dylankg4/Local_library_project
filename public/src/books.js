function findAuthorById(authors, id) {
  return authors.find((acc) => acc.id === id);
}

function findBookById(books, id) {
  return books.find((acc) => acc.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    return books.reduce((acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if(recent.returned) {
        returned.push(book);
      } else {
        borrowed.push(book);
      }
      return acc;
    }, 
      [[], []]
    );
  }

// function getUsersForUserWishlist(users, selectedUser) {
//   const userObj = Object.keys(users);
//   return userObj.reduce((acc, username) => {
//     const hasBeenVisited = userHasVisitedParkOnWishlist(users, username, selectedUser);
//     if(hasBeenVisited) acc.push(username);
//     return acc;
//   }, []);
// }
// function getUsersForUserWishlist(users, username) {
//   return Object.keys(users)
//     .filter((user) => users[user].visited.find((visit) => users[username].wishlist.find((wish) => visit === wish)))
// }
// function getUsersForUserWishlist(users, username) {
//   let result = [];
//   users[username].wishlist.map((element) => {
//     for(let name in users) {
//       if(users[name].visited.includes(element)) {
//         if (!result.includes(name)) result.push(name);
//       }
//     }
//   })
//   return result;
// }

/** 
 * 
 * getBorrowersForBook()
 * The getBorrowersForBook() function in public/src/books.js has two parameters, 
 * in the following order:
 * 
 * A book object.
 * An array of all accounts.
 * It should return an array of all the transactions from the 
 * book's borrows key. However, each transaction should include 
 * the related account information and the returned key.
 * 
 * Example:

getBorrowersForBook(book, accounts);
/*
  [
    {
      id: "5f446f2e4eff1030e7316861",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/barber.waters@kegular.biz",
      age: 37,
      name: {
        first: "Barber",
        last: "Waters",
      },
      company: "KEGULAR",
      email: "barber.waters@kegular.biz",
      registered: "Tuesday, April 14, 2020 9:15 PM",
    },
    {
      id: "5f446f2ecc5c4787c403f844",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/dyer.trevino@slax.io",
      age: 34,
      name: {
        first: "Dyer",
        last: "Trevino",
      },
      company: "SLAX",
      email: "dyer.trevino@slax.io",
      registered: "Saturday, August 1, 2015 8:13 PM",
    },
  ]
*/
// 1. understand the problem - reflect in your own words what that are asking you.
// 2. devise a plan - aka "peusdo code"
// 3. code your plan - excute your plan
// 4. refactor your code
function getBorrowersForBook(book, accounts) {
  // iterate over the accounts array w/ reduce/map/filter/forEach, etc store values in a variable
    // get the account.id and store it's value in a variable
  // iterate over the book.borrows array get the prev store variable accountById info and the returned info
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  const accountById = accounts.reduce((acc, account) => { // iterate over the accounts array w/ reduce/map/filter/forEach, etc store values in a variable
    acc[account.id] = account; // get the account.id and store it's value in a variable
    return acc;
  }, {});
  return book.borrows
    .map(({ id, returned }) => ({
      ...accountById[id],
      returned,
    }))
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
