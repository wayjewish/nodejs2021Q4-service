let db = [];

const getAll = async () => db;

const getOne = async (id) => {
  const foundUser = db.find((user) => user.id === id);
  return foundUser;
};

const create = async (user) => {
  db.push(user);
  return user;
};

const update = async (id, props) => {
  const index = db.findIndex((p) => p.id === id);
  db[index] = {id, ...props};
  return db[index];
};

const remove = async (id) => {
  db = db.filter((user) => user.id !== id);
  
};

module.exports = { getAll, getOne, create, update, remove };
