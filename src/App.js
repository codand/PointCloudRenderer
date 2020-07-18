import { Button, Grid, Slider, Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { PointCloudAPI } from "./api/PointCloudAPI.js";
import Canvas from "./Canvas.js";
import Sidebar from "./Sidebar.js";
import useStyles from "./useStyles";

function App() {
  const classes = useStyles();
  const [dataset, setDataset] = useState(null);
  const [points, setPoints] = useState([]);

  const fetchPointCloud = (dataset, frameNum) => {
    PointCloudAPI.loadFrame(dataset.id, frameNum)
      .then((points) => {
        setPoints(points);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const fetchDataset = () => {
      PointCloudAPI.loadDataset(0)
        .then((dataset) => {
          console.log(`Dataset [${dataset.id}] loaded`);
          setDataset(dataset);
          fetchPointCloud(dataset, 0);
        })
        .catch((err) => {
          console.log(err.stack);
          console.trace();
          alert(err);
        });
    };
    // Renders on mount and unmount
    fetchDataset();
  }, []);

  if (dataset === null) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Canvas points={points} />
      {/* <Sidebar /> */}
      <Box className={classes.timeline}>
        <Slider
          defaultValue={0}
          getAriaValueText={() => "hi"}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={dataset.numFrames-1}
          onChangeCommitted={(e, value) => fetchPointCloud(dataset, value)}
        ></Slider>
      </Box>
    </React.Fragment>
  );
}

export default App;
