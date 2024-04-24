// util/mqtt/subscribe.js

import Paho from 'paho-mqtt';

const subscribe = () => {
  // Create a client instance with null clientId
  const client = new Paho.Client("broker.emqx.io", 1883, null);

  // Set callback functions
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connect the client
  client.connect({
    onSuccess: onConnect,
    keepAliveInterval: 60 // Set keep alive interval in seconds
  });

  // Called when the client connects
  function onConnect() {
    console.log("Connected to MQTT broker");
    // Subscribe to a topic
    client.subscribe("topic");
  }

  // Called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("Connection lost:", responseObject.errorMessage);
    }
  }

  // Called when a message arrives
  function onMessageArrived(message) {
    console.log("Received message:", message.payloadString);
  }
};

export default subscribe;