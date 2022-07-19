import { utilService } from './util-service';

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
};

async function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return entities;
}

async function get(entityType, entityId) {
  try {
    const entities = await query(entityType);
    entities.find(entity => entity._id === entityId);
  } catch (err) {
    throw new Error('Cannot get entity');
  }
}

async function post(entityType, newEntity) {
  newEntity._id = utilService.makeId();
  const entities = await query(entityType);
  entities.push(newEntity);
  _save(entityType, entities);
  return newEntity;
}

async function postMany(entityType, newEntities) {
  const entities = await query(entityType);
  newEntities = newEntities.map(entity => ({
    ...entity,
    id: utilService.makeId(),
  }));
  entities.push(...newEntities);
  _save(entityType, entities);
  return entities;
}

async function put(entityType, updatedEntity) {
  try {
    const entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  } catch (err) {
    console.error(err);
  }
}

async function remove(entityType, entityId) {
  try {
    const entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  } catch (err) {
    console.error(err);
  }
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
