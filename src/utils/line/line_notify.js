import axios from 'axios';

// const sendNotification = async (message, imageURL) => {
const sendNotification = async (message) => {
  const accessToken = 's3X00hZmjmELFT2epvgR2BdfyhSm5CLjy2rYPwyydI8';
  const payload = {
    message: message,
    // imageThumbnailUrl: imageURL,
  };

  try {
    const response = await axios.post('https://notify-api.line.me/api/notify', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};

export default sendNotification;
