const express = require('express');
const ffmpeg = require('fluent-ffmpeg'); // Or use browser automation tools

const app = express();
const port = 3000; // Replace with your desired port

app.get('/capture-image', async (req, res) => {
  try {
    const cameraStreamUrl = 'http://192.168.1.44:5000/video_feed_predicted'; // Replace with your actual URL
    const timestamp = Date.now();
    const outputFilename = `image-${timestamp}.png`;

    await ffmpeg(cameraStreamUrl)
      .output(outputFilename)
      .on('end', () => {
        console.log('Image captured:', outputFilename);
        res.send({ message: 'Image captured successfully!', filename: outputFilename });
      })
      .on('error', (err) => {
        console.error('Error capturing image:', err);
        res.status(500).send({ message: 'Failed to capture image' });
      })
      .run();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

