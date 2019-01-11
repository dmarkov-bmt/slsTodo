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


module.exports = dynamoose.model(process.env.USERS_TABLE, todoSchema);

