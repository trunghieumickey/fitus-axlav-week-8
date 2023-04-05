// load face-api.js models
const modelLink = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(modelLink),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelLink),
    faceapi.nets.faceRecognitionNet.loadFromUri(modelLink),
    faceapi.nets.faceExpressionNet.loadFromUri(modelLink)
  ]).then(startVideo)

import * as faceapi from 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api';

// get video element and canvas element
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')

// start video stream
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

// detect faces and draw bounding boxes on canvas
video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
  }, 100)
})