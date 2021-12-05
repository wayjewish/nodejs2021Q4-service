const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getOne = (id) => boardsRepo.getOne(id);

const create = (user) => boardsRepo.create(user);

const update = (id, props) => boardsRepo.update(id, props);

const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getOne, create, update, remove };
