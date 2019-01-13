import { errorHandler } from '../helper/error-handler';

const uuid = require('uuid/v1');
let Todo = require('./dynamodb');

export function create(event) {

  const data = event.body;

  if (!data || !data.value) {
    console.error('Validation Failed');
    return { statusCode: 400 };
  }

  return Todo.create({
    id: uuid(),
    value: data.value,
    isActive: true,
  });
}

export async function list() {
  return Todo.scan().exec();
}

export async function remove(event) {
  const id = event.path.id;
  console.log(id);
  return Todo.delete({ id: id });

}

export function removeAll(event) {
  const data = [{ id: String }];
  event.body.forEach(todoItem => {
    data.push({ id: todoItem.id });
  });
  return Todo.batchDelete(data);
}

export async function update(event) {
  try {
    return await Todo.update({ id: event.body.data.id }, {
      value: event.body.data.value,
      isActive: event.body.data.isActive,
    });
  } catch (err) {
    return errorHandler(err);
  }
}

export function completeAll(event) {
  const data = event.body.data;
  return Todo.batchPut(data);
}