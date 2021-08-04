function findAccountById(accounts, id) {
  return accounts.find((acc) => acc.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => (acc1.name.last > acc2.name.last ? 1 : -1));
  // return accounts.sort((acc1, acc2) => (acc1.name.last.toLowerCase() > acc2.name.last.toLowerCase() ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  // const total = sameId.filter((acc) => acc.borrows === account.id)
  // console.log(total)
  // return total.length
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);
    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books  
    .filter((book) => {
      const recent = book.borrows[0];
      return !recent.returned && recent.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author}
    })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
