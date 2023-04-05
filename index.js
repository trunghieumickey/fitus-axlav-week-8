// load face-api.js models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

import * as faceapi from 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/dist/face-api.min.js';

// get canvas element
const canvas = document.getElementById('root')

// create video element from URL
const videoURL = 'https://raw.githubusercontent.com/tensorflow/tfjs-models/master/pose-detection/test_data/pose_squats.mp4'
const video = document.createElement('video')
video.src = videoURL
video.crossOrigin = 'anonymous'
video.loop = true

// start video stream
function startVideo() {
    video.addEventListener('loadeddata', function (e) {
        // set video and canvas size
        const displaySize = { width: video.videoWidth, height: video.videoHeight }
        video.width = displaySize.width
        video.height = displaySize.height
        canvas.width = displaySize.width
        canvas.height = displaySize.height

        // append video to document body
        document.body.appendChild(video)

        // detect faces and draw bounding boxes on canvas
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
        }, 100)

        // play video
        video.play()
    })
}