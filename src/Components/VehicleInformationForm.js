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
    background: "#fff",
    paddingBottom: theme.spacing(4),
    borderRadius: 5,
    textAlign: "left",
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

const yearRange = [];

for (let i = 2021; i >= 1930; i--) {
  yearRange.push(i);
}

const getMakeData = async (year) => {
  const makeData = [];
  const makes = await axios.get(`/api/makes/${year}`).catch((err) => {
    console.log(err);
  });

  if (!makes.data.length) return [];

  for (let i = 0; i < makes.data.length; i++) {
    makeData.push(makes.data[i].model_make_id);
  }

  return makeData;
};

const getModelData = async (year, make) => {
  const modelData = [];
  const models = await axios.get(`/api/models/${year}/${make}`).catch((err) => {
    console.log(err);
    return;
  });

  for (let i = 0; i < models.data.length; i++) {
    modelData.push(models.data[i].model_name);
  }

  return modelData;
};

const getSubmodelData = async (year, make, model) => {
  const submodelData = [];
  const submodels = await axios
    .get(`/api/submodels/${year}/${make}/${model}`)
    .catch((err) => {
      console.log(err);
      return;
    });

  for (let i = 0; i < submodels.data.length; i++) {
    submodelData.push(submodels.data[i].model_trim);
  }

  return submodelData;
};

const getEngineData = async (submodel) => {
  const engineData = [];
  const engines = await axios.get(`/api/engines/${submodel}`).catch((err) => {
    console.log(err);
    return;
  });

  for (let i = 0; i < engines.data.length; i++) {
    engineData.push(engines.data[i].model_engine_cc);
  }

  return engineData;
};

export default function VehicleInformationForm(props) {
  const classes = useStyles();
  const [VIN, setVIN] = useState("");
  const [trim, setTrim] = useState("");
  const [year, setYear] = useState("");
  const [makeData, setMakeData] = useState([]);
  const [make, setMake] = useState("");
  const [modelData, setModelData] = useState([]);
  const [model, setModel] = useState("");
  const [submodelData, setSubmodelData] = useState([]);
  const [submodel, setSubmodel] = useState("");
  const [engineData, setEngineData] = useState([]);
  const [engine, setEngine] = useState("");
  const [partsData, setPartsData] = useState([]);
  const [part, setPart] = useState("");

  useEffect(() => {
    if (year && make && model && submodel && engine) {
      getParts();
    }
  }, [year, make, model, submodel, engine]);

  const handleChange = (event, type) => {
    if (type === "VIN") {
      setVIN(event.target.value);
      return;
    }

    if (type === "year") {
      setYear(event.target.value);
      if (makeData) {
        setMake("");
        setModel("");
        setSubmodel("");
        setEngine("");
        setMakeData([]);
        setModelData([]);
        setSubmodelData([]);
        setEngineData([]);
      }
      event.target.value &&
        getMakeData(event.target.value).then((makes) => setMakeData(makes));
    }

    if (type === "make") {
      setMake(event.target.value);
      if (modelData) {
        setModel("");
        setSubmodel("");
        setEngine("");
        setModelData([]);
        setSubmodelData([]);
        setEngineData([]);
      }
      event.target.value &&
        getModelData(year, event.target.value).then((models) =>
          setModelData(models)
        );
    }

    if (type === "model") {
      setModel(event.target.value);
      if (submodelData) {
        setSubmodel("");
        setEngine("");
        setSubmodelData([]);
        setEngineData([]);
      }
      event.target.value &&
        getSubmodelData(year, make, event.target.value).then((submodels) =>
          setSubmodelData(submodels)
        );
    }

    if (type === "sub model") {
      setSubmodel(event.target.value);
      if (engineData) {
        setEngine("");
        setEngineData([]);
      }
      event.target.value &&
        getEngineData(event.target.value).then((engines) =>
          setEngineData(engines)
        );
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
              submodelData.push(res.data.Results[i].Value);
              setTrim(res.data.Results[i].Value);
              setSubmodel(res.data.Results[i].Value);
            }

          if (res.data.Results[i].Variable === "Series")
            if (res.data.Results[i].Value && trim === "") {
              submodelData.push(res.data.Results[i].Value);
              setSubmodel(res.data.Results[i].Value);
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
              disabled={!year}
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
              disabled={!makeData.length}
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
            <InputLabel>Submodel</InputLabel>
            <Select
              disabled={!modelData.length}
              value={submodel}
              onChange={(event) => handleChange(event, "sub model")}
              defaultValue="Select a Sub Model"
            >
              {submodelData.map((elem, i) => {
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
              disabled={!submodelData.length}
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

          {props.partFinder && (
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
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
