const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getOne = (id) => tasksRepo.getOne(id);

const create = (user) => tasksRepo.create(user);

const update = (id, props) => tasksRepo.update(id, props);

const remove = (id) => tasksRepo.remove(id);

const removeInBoards = (id) => tasksRepo.removeInBoards(id);

const resetUser = (id) => tasksRepo.resetUser(id);

module.exports = { getAll, getOne, create, update, remove, removeInBoards, resetUser };
