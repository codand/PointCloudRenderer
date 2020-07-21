import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Slider,
  Tooltip,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { PointCloudAPI } from "./api/PointCloudAPI.js";
import Canvas from "./Canvas.js";
import useStyles from "./useStyles";

function App() {
  const classes = useStyles();
  const [dataset, setDataset] = useState(null);
  const [frame, setFrame] = useState({points: [], index: 0});
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPointCloud = (dataset, index) => {
    setIsLoading(true);
    PointCloudAPI.loadFrame(dataset.id, index)
      .then((points) => {
        setFrame({points, index});
        setIsLoading(false);
        setSliderValue(index);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const fetchDataset = useCallback((id) => {
    PointCloudAPI.loadDataset(id)
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
  }, []);

  useEffect(() => {

    // Renders on mount and unmount
    fetchDataset(1);
  }, [fetchDataset]);

  if (dataset === null) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Canvas points={frame.points} />
      {/* <Sidebar /> */}
      <FormControl className={classes.controls}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={dataset.id}
          onChange={(e) => {fetchDataset(e.target.value)}}
        >
          <MenuItem value={0}>Dataset 0</MenuItem>
          <MenuItem value={1}>Dataset 1</MenuItem>
        </Select>
        <FormHelperText>Select a dataset</FormHelperText>
      </FormControl>
      <Box className={classes.timeline}>
        <Slider
          defaultValue={0}
          disabled={isLoading} 
          value={sliderValue}
          // getAriaValueText={() => "hi"}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={dataset.numFrames - 1}
          onChange={(e, value) => setSliderValue(value)}
          onChangeCommitted={(e, value) => fetchPointCloud(dataset, value)}
        ></Slider>
      </Box>
      <Tooltip
        title="This software was made using the Waymo Open Dataset, provided by Waymo LLC under license terms available at waymo.com/open."
        className={classes.tooltip}
      >
        <InfoIcon color="secondary"></InfoIcon>
      </Tooltip>
    </React.Fragment>
  );
}

export default App;
