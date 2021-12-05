let db = [];

const getAll = async () => db;

const getOne = async (id) => {
  const foundBoard = db.find((board) => board.id === id);
  return foundBoard;
};

const create = async (board) => {
  db.push(board);
  return board;
};

const update = async (id, props) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = {id, ...props};
  return db[index];
};

const remove = async (id) => {
  db = db.filter((board) => board.id !== id);
};

module.exports = { getAll, getOne, create, update, remove };
