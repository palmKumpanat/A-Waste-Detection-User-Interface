import axios from 'axios';

// const sendNotification = async (message, imageURL) => {
const sendNotification = async (message) => {
  const payload = {
    message: message,
    // imageThumbnailUrl: imageURL,
  };

  try {
    const response = await axios.post('http://localhost:3000/api/linenotify', payload);
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};

export default sendNotification;
