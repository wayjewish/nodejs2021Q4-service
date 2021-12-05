const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getOne = (id) => usersRepo.getOne(id);

const create = (user) => usersRepo.create(user);

const update = (id, props) => usersRepo.update(id, props);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getOne, create, update, remove };
