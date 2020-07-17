import { Box, Button, Slider, Typography } from "@material-ui/core";
import React from "react";
import useStyles from './useStyles';

function Sidebar() {
  const classes = useStyles();

  return (
    <Box className={classes.clearbox}>
      <Typography variant="h6">Navigation</Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={() => "hi"}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        // onChangeCommitted={(e, value) => fetchPointCloud(dataset, value)}
      ></Slider>
      <Button variant="contained" color="primary" onClick={() => {}}>
        Load Point Cloud
      </Button>
    </Box>
  );
}

export default Sidebar;
