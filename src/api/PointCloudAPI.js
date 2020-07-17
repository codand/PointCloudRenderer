const DEFAULT_CONFIG = {
  host: "http://localhost:5000",
  timeout: 30000,
};

function handleErrors(response) {
  console.log("Handle errors");
  if (!response.ok) {
    throw Error(`Received bad HTTP response: ${response.statusText}`);
  }
  return response;
}

const apiRequest = async (endpoint, args, config) => {
  config = { ...DEFAULT_CONFIG, ...config };

  const url = `${config.host}/${endpoint}/${args.join("/")}`;
  console.log(`API Request [${url}]`);

  // Handle timeout
  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  return fetch(url, { signal })
    .then(handleErrors)
    .then(response => {
      console.log("This is a response")
      clearTimeout(timeoutId)
      return response.json();
    })
};

const loadFrame = async (datasetID, frameNum, config) => {
  return apiRequest("pointcloud", [datasetID, frameNum], config);
};

const loadDataset = async (datasetID, config) => {
  return apiRequest("pointcloud", [datasetID], config);
};

const PointCloudAPI = { loadFrame, loadDataset };

export { PointCloudAPI };
