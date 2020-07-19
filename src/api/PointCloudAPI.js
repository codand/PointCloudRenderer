import { deflate, gunzip } from "zlib";
import { promisify } from "util";

const DEFAULT_CONFIG = {
  host: "https://cmandrews-lidar.s3-us-west-2.amazonaws.com/datasets",
  timeout: 30000,
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(`Received bad HTTP response: ${response.statusText}`);
  }
  return response;
}

function logResponse(response) {
  console.log(response);
  return response;
}

const unzipBuffer = promisify(gunzip);
function unzipResponse(response) {
  //const buffer = new FileReader().readAsArrayBuffer(response);
  return unzipBuffer(response.getReader(), (err, buffer) => {
    console.log("Unzipping");
    if (err) {
      throw Error(`Failed to decompress point cloud: ${err}`);
    }
    console.log("Unzip");
    return buffer.toString();
  });
}

const apiRequest = async (args, config) => {
  config = { ...DEFAULT_CONFIG, ...config };

  const url = `${config.host}/${args.join("/")}.json`;
  console.log(`API Request [${url}]`);

  // Handle timeout
  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  return (
    fetch(url, { signal })
      .then(handleErrors)
      // .then(response => response.blob())
      // .then(unzipResponse)
      //.then(logResponse)
      //.then(r => r.body)
      //.then(unzipResponse)
      .then((response) => {
        clearTimeout(timeoutId);
        return response.json();
      })
  );
};

const loadFrame = async (datasetID, frameNum, config) => {
  return apiRequest([datasetID, frameNum], config);
};

const loadDataset = async (datasetID, config) => {
  return { id: datasetID, numFrames: 50 };
  //return apiRequest([datasetID], config);
};

const PointCloudAPI = { loadFrame, loadDataset };

export { PointCloudAPI };
