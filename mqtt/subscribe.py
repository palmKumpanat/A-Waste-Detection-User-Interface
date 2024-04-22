import paho.mqtt.client as mqtt
import cv2
import numpy as np
#from line_notify import LineNotify

mqttBroker = "broker.emqx.io"
port = 1883
keepAlive = 60

def Notify():
    print("Notify")

def on_message(client, userdata, msg):
    print ("Topic : ", msg.topic)
    message = msg.payload.decode()
    print(f"Received message on topic '{msg.topic}': {message}")

def on_connect(client, userdata, flags, reason_code):
    if reason_code==0:
        print("Connected with result code "+str(reason_code))
        client.subscribe("WasteDetectionOnRaspberryPi")
    else:
        print("Connection failed")

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed with QoS: " + str(granted_qos))
    print(mid)

client = mqtt.Client()
client.on_connect = on_connect
client.on_subscribe = on_subscribe
client.on_message = on_message
client.connect(mqttBroker, port, keepAlive)
# print(mqtt.CallbackAPIVersion.VERSION1)
client.loop_forever()
#client.loop_start()