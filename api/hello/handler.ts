const uuid = require('uuid/v1');
const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

const todoSchema = new Schema({
  id: {
    type: String,
  },
  value: {
    type: String,
  },
  isActive: {
    type: Boolean,
  }
});

dynamoose.local();

let Todo = dynamoose.model(process.env.USERS_TABLE, todoSchema);

export function create(event, context, callback) {

  const data = event.body;

  if (typeof data.value !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      // headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\`t create the item!',
    });
    return;
  }

  Todo.create({
    id: uuid(),
    value: data.value,
    isActive: true,
  }, (err, todo) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        body: 'Couldn\`t create the item!',
      });
      return;
    }

    console.log(todo.value);

    const res = {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
    callback(null, res);
  });
}

export function list(event, context, callback) {
  // const params = {
  //   TableName: process.env.USERS_TABLE,
  // };
  //
  // dynamodb.scan(params, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     callback(null, {
  //       statusCode: err.statusCode || 501,
  //       // headers: { 'Content-Type:': 'text/plain' },
  //       body: 'couldn\t fetch the item',
  //     });
  //     return;
  //   }
  //
  //   console.log(result.Items);
  //
  //   const res = {
  //     statusCode: 200,
  //     body: JSON.stringify(result.Items),
  //   };
  //   callback(null, res);
  // });
}

export function remove(event, context, callback) {
  // const params = {
  //   TableName: process.env.TABLE_USERS,
  //   Key: {
  //     id: event.pathParameters.id,
  //   },
  // };
  //
  // dynamodb.delete(params, (err) => {
  //   if (err) {
  //     console.error(err);
  //     callback(null, {
  //       statusCode: err.statusCode || 501,
  //       // headers: { 'Content-Type': 'text/plain' },
  //       body: 'Couldn\`t remove item',
  //     });
  //     return;
  //   }
  //
  //   const res = {
  //     statusCode: 200,
  //     body: JSON.stringify({}),
  //   };
  //   callback(null, res);
  // });
}

// export function removeAll(event, context, callback) {
//   const params = {
//     TableName: process.env.TABLE_USERS,
//   };
//
//   dynamodb.delete(params, (err) => {
//     if (err) {
//       console.error(err);
//       callback(null, {
//         statusCode: err.statusCode || 501,
//         // headers: { 'Content-Type': 'text/plain' },
//         body: 'Couldn\`t remove items',
//       });
//       return;
//     }
//
//     const res = {
//       statusCode: 200,
//       body: JSON.