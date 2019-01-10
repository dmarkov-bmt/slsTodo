import { errorHandler } from '../helper/error-handler';

const uuid = require('uuid/v1');
const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;
dynamoose.AWS.config.update({
  region: 'us-east-1',
});
dynamoose.local();

const todoSchema = new Schema({
  id: {
    type: String,
  },
  value: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

let Todo = dynamoose.model(process.env.USERS_TABLE, todoSchema);

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

export async function list(event) {
  return Todo.scan().exec();
}

export async function remove(event) {
  const id = event.path.id;
  console.log(id);
  return Todo.delete({ id: id });

}

export function removeAll() {
  return;
}

export function complete(event) {
  const data = { id: event.body.data.id, value: event.body.data.value, isActive: event.body.data.isActive };
  const todo = new Todo({ id: data.id, isActive: data.isActive, value: data.value });
  console.log(data.isActive);
  return todo.save()
    .then(() => '')
    .catch((err) => errorHandler(err));
}

export function completeAll() {

}