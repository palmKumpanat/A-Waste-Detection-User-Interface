import Paho from 'paho-mqtt';

var messageDict;
var myClient;

const initMqtt = () => {
  const brokerUrl = 'broker.emqx.io';
  const port = 8083;
  const clientId = `mqtt_${Math.random().toString(16).substr(2, 8)}`;
  const topic = 'WasteDetectionOnRaspberryPi';

  const client = new Paho.Client(brokerUrl, Number(port), clientId);
  myClient = client;

  // Connection callbacks
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log('Connected to MQTT broker');
    // Subscribe to the topic after successful connection
    client.subscribe(topic, { onSuccess: onSubscribe });
  }
  function onSubscribe() {
    console.log('Subscribed to topic: ' + topic + ' success.');
  }
  function onMessageArrived(message) {
    // messageDict = message.payloadString;
    messageDict = message.payloadString;
  }
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.error('Connection lost:', responseObject.errorMessage);
    }
  }
}

const getMessage = () =>{
  return messageDict;
}

const getClient = () =>{
  return myClient;
}


const mqtt = {initMqtt, getMessage, getClient};
export default mqtt;