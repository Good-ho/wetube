const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObj;
let videoRecorder;

const handleVideoData = (event) => {
  //   console.log(event);
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "record.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  //setTimeout(() => videoRecorder.stop(), 3000);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    // console.log(stream);
    videoPreview.srcObject = stream;
    // videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObj = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
