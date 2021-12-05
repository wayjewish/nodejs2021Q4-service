const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getOne = (id) => tasksRepo.getOne(id);

const create = (user) => tasksRepo.create(user);

const update = (id, props) => tasksRepo.update(id, props);

const remove = (id) => tasksRepo.remove(id);

module.exports = { getAll, getOne, create, update, remove };
