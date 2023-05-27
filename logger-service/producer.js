/**
 * 
 * Step 1 = Connect to the rabbitMQ server
 * Step2 = Create a new channel on that connection
 * Step3 = Create the exchange
 * Step4 = Publish the message to the exchange with a routing key 
 * 
 **/


const amqp = require('amqplib');
const config = require('./config');

async function createChannel() {
  const connection = await amqp.connect(config.rabbitMQ.url);
  const channel = await connection.createChannel();
  return channel;
}

async function publishMessage(routingKey, message) {
  const channel = await createChannel();

  const exchangeName = config.rabbitMQ.exchangeName;
  await channel.assertExchange(exchangeName, 'direct');

  const logDetails = {
    logType: routingKey,
    message: message,
    dateTime: new Date(),
  };

  await channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(logDetails))
  );

  console.log(`The new ${routingKey} log is sent to exchange ${exchangeName}`);
}

module.exports = {
  publishMessage
};




