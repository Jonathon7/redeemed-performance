import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "left",
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

const yearRange = [];
const subModelData = ["val1", "val2", "val3", "val4", "val5"];
const engineData = ["engine1", "engine2"];

for (let i = 2021; i >= 1930; i--) {
  yearRange.push(i);
}

const getMakeData = async () => {
  const makeData = [];
  const makes = await axios
    .get("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
    .catch((err) => {
      console.log(err);
    });

  if (!makes) return;

  for (let i = 0; i < 100; i++) {
    makeData.push(makes.data.Results[i].Make_Name);
  }

  return makeData;
};

const getModelData = async (make) => {
  const modelData = [];
  const models = await axios
    .get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
    )
    .catch((err) => {
      console.log(err);
      return;
    });

  for (let i = 0; i < models.data.Results.length; i++) {
    modelData.push(models.data.Results[i].Model_Name);
  }

  return modelData;
};

export default function VehicleInformationForm() {
  const classes = useStyles();
  const [VIN, setVIN] = useState("");
  const [year, setYear] = useState("");
  const [makeData, setMakeData] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [modelData, setModelData] = useState([]);
  const [subModel, setSubModel] = useState("");
  const [engine, setEngine] = useState("");
  const [partsData, setPartsData] = useState([]);
  const [part, setPart] = useState("");

  useEffect(() => {
    getMakeData().then((res) => {
      setMakeData(res);
    });

    if (make) {
      getModelData(make).then((res) => setModelData(res));
    }

    if (year && make && model && subModel && engine) {
      getParts();
    }
  }, [year, make, model, subModel, engine]);

  const handleChange = (event, type) => {
    if (type === "VIN") {
      setVIN(event.target.value);
      return;
    }

    if (type === "year") {
      setYear(event.target.value);
    }

    if (type === "make") {
      setMake(event.target.value);
    }

    if (type === "model") {
      setModel(event.target.value);
    }

    if (type === "sub model") {
      setSubModel(event.target.value);
    }

    if (type === "engine") {
      setEngine(event.target.value);
    }

    if (type === "part") {
      setPart(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${VIN}?format=json`
      )
      .then((res) => {
        for (let i = 0; i < res.data.Results.length; i++) {
          console.log(res.data.Results[i]);
          if (res.data.Results[i].Variable === "Model Year")
            if (!isNaN(res.data.Results[i].Value))
              setYear(res.data.Results[i].Value);

          if (res.data.Results[i].Variable === "Make") {
            if (res.data.Results[i].Value) {
              setMake(res.data.Results[i].Value);
            }
          }

          if (res.data.Results[i].Variable === "Model")
            if (res.data.Results[i].Value) setModel(res.data.Results[i].Value);

          if (res.data.Results[i].Variable === "Trim")
            if (res.data.Results[i].Value) {
              subModelData.push(res.data.Results[i].Value);
              setTrim(res.data.Results[i].Value);
              setSubModel(res.data.Results[i].Value);
            }

          if (res.data.Results[i].Variable === "Series")
            if (res.data.Results[i].Value && trim === "") {
              subModelData.push(res.data.Results[i].Value);
              setSubModel(res.data.Results[i].Value);
            }

          if (res.data.Results[i].Variable === "Displacement (L)")
            if (res.data.Results[i].Value) {
              engineData.push(res.data.Results[i].Value);
              setEngine(res.data.Results[i].Value + "L");
            }
        }
      })
      .catch((err) => {
        console.log("ERRRROR: ", err);
      });
  };

  const getParts = () => {
    // get the parts
    const partsData = [];
    partsData.push("part1", "part2", "part3");
    setPartsData(partsData);
  };

  return (
    <React.Fragment>
      <Container className={classes.container} maxWidth="sm">
        <Grid container direction="column">
          <FormControl className={classes.formControl} disabled={!makeData}>
            <TextField
              label="VIN"
              onChange={(event) => handleChange(event, "VIN")}
              disabled={!makeData}
            />
            <Button type="submit" onClick={handleSubmit} disabled={!makeData}>
              Submit
            </Button>
          </FormControl>

          <Typography
            component="p"
            variant="h6"
            style={{ textAlign: "center" }}
          >
            or
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              onChange={(event) => handleChange(event, "year")}
            >
              {yearRange.map((elem) => {
                return (
                  <MenuItem value={elem} key={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Make</InputLabel>
            <Select
              value={make}
              onChange={(event) => handleChange(event, "make")}
              defaultValue="Select a Make"
            >
              {makeData &&
                makeData.map((elem, i) => {
                  return (
                    <MenuItem key={i} value={elem}>
                      {elem}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Model</InputLabel>
            <Select
              value={model}
              onChange={(event) => handleChange(event, "model")}
              defaultValue="Select a Model"
            >
              {modelData.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Sub Model</InputLabel>
            <Select
              value={subModel}
              onChange={(event) => handleChange(event, "sub model")}
              defaultValue="Select a Sub Model"
            >
              {subModelData.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Engine</InputLabel>
            <Select
              value={engine}
              onChange={(event) => handleChange(event, "engine")}
              defaultValue="Select an Engine"
            >
              {engineData.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Part</InputLabel>
            <Select
              value={part}
              onChange={(event) => handleChange(event, "part")}
              disabled={!partsData.length}
            >
              {partsData.map((elem, i) => {
                return (
                  <MenuItem key={i} value={elem}>
                    {elem}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
