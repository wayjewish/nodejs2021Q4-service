let db = [];

const getAll = async () => db;

const getOne = async (id) => {
  const foundTask = db.find((task) => task.id === id);
  return foundTask;
};

const create = async (task) => {
  db.push(task);
  return task;
};

const update = async (id, props) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = {id, ...props};
  return db[index];
};

const remove = async (id) => {
  db = db.filter((task) => task.id !== id);
};

const removeInBoards = async (boardId) => {
  db = db.filter((task) => task.boardId !== boardId);
};

const resetUser = async (userId) => {
  db = db.map((task) =>
    (task.userId === userId)
    ? { ...task, userId: null }
    : { ...task }
  );
};


module.exports = { getAll, getOne, create, update, remove, removeInBoards, resetUser };
