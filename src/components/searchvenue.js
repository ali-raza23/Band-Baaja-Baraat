import React, { useState, useMemo, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Box,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  FormGroup,
  useMediaQuery,
  Radio,
  RadioGroup,
  Collapse,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GiteIcon from '@mui/icons-material/Gite';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LooksIcon from '@mui/icons-material/Looks';
import NatureIcon from '@mui/icons-material/Nature';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import FestivalIcon from '@mui/icons-material/Festival';
import { AnimatePresence, motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SearchVenue = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mode, setMode] = useState('light');
  const [service, setService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [renderStep, setRenderStep] = useState(0);
  const [subLocation, setSubLocation] = useState(null);
  const [parking, setParking] = useState(false);
  const [budget, setBudget] = useState(null);
  const [venueType, setVenueType] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [staffGender, setStaffGender] = useState([]);
  const [photographerBudget, setPhotographerBudget] = useState(null);
  const [photographerGender, setPhotographerGender] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    setRenderStep(activeStep);
  }, [activeStep]);

  const resetStates = () => {
    setActiveStep(0);
    setRenderStep(0);
    setSubLocation(null);
    setParking(false);
    setBudget(null);
    setVenueType(null);
    setCapacity(null);
    setStaffGender([]);
    setPhotographerBudget(null);
    setPhotographerGender([]);
    setCompletedSteps([]);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: 'Jost, sans-serif',
        },
        transitions: {
          duration: {
            standard: 500,
          },
        },
      }),
    [mode]
  );

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, activeStep]);
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
      setCompletedSteps(completedSteps.filter((step) => step !== activeStep - 1));
    }
  };

  const handleStaffGenderChange = (gender) => {
    setStaffGender((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handlePhotographerGenderChange = (gender) => {
    setPhotographerGender((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const weddingVenueSteps = [
    'Select Sub-Location and Parking',
    'Budget (Per Person)',
    'Type',
    'Capacity',
    'Staff Gender',
  ];

  const photographerSteps = ['Photographer Budget', 'Staff Gender'];

  const steps =
    service === 'wedding'
      ? weddingVenueSteps
      : service === 'photographers'
      ? photographerSteps
      : [];

  const getStepContent = (stepIndex) => {
    if (service === 'wedding') {
      switch (stepIndex) {
        case 0:
          return (
            <>
              <Autocomplete
                options={['F10', 'E11', 'G9', 'Islamabad Expressway']}
                value={subLocation}
                onChange={(event, newValue) => setSubLocation(newValue)}
                renderInput={(params) => <TextField {...params} label="Sub-Location" />}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                  />
                }
                label="Parking Space"
              />
            </>
          );
        case 1:
          return isMobile ? (
            <>
              <Typography gutterBottom>Budget (Per Person)</Typography>
              <RadioGroup
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
              >
                <FormControlLabel value={0} control={<Radio />} label="0–1400" />
                <FormControlLabel value={1} control={<Radio />} label="1400–1800" />
                <FormControlLabel value={2} control={<Radio />} label="1800–2400" />
                <FormControlLabel value={3} control={<Radio />} label="2400–3500" />
                <FormControlLabel value={4} control={<Radio />} label="3500–4500" />
                <FormControlLabel value={5} control={<Radio />} label="4500+" />
              </RadioGroup>
            </>
          ) : (
            <>
              <Slider
                value={budget !== null ? budget : 0}
                onChange={(e, newValue) => setBudget(newValue)}
                step={1}
                marks={[
                  { value: 0, label: '0–1400' },
                  { value: 1, label: '1400–1800' },
                  { value: 2, label: '1800–2400' },
                  { value: 3, label: '2400–3500' },
                  { value: 4, label: '3500–4500' },
                  { value: 5, label: '4500+' },
                ]}
                min={0}
                max={5}
              />
            </>
          );
        case 2:
          return (
            <Autocomplete
              options={[
                { label: 'Hall', icon: <LooksIcon /> },
                { label: 'Marquee/Banquet', icon: <FestivalIcon /> },
                { label: 'Outdoor', icon: <NatureIcon /> },
              ]}
              getOptionLabel={(option) => option.label}
              value={venueType}
              onChange={(event, newValue) => setVenueType(newValue)}
              renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {option.icon}
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Type" />}
              sx={{ mt: 2 }}
            />
          );
        case 3:
          return isMobile ? (
            <>
              <Typography gutterBottom>Capacity</Typography>
              <RadioGroup
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
              >
                <FormControlLabel value={0} control={<Radio />} label="0–100" />
                <FormControlLabel value={1} control={<Radio />} label="100–300" />
                <FormControlLabel value={2} control={<Radio />} label="300–600" />
                <FormControlLabel value={3} control={<Radio />} label="600–1000" />
                <FormControlLabel value={4} control={<Radio />} label="1000–1500" />
                <FormControlLabel value={5} control={<Radio />} label="1500+" />
              </RadioGroup>
            </>
          ) : (
            <>
              <Slider
                value={capacity !== null ? capacity : 0}
                onChange={(e, newValue) => setCapacity(newValue)}
                step={1}
                marks={[
                  { value: 0, label: '0–100' },
                  { value: 1, label: '100–300' },
                  { value: 2, label: '300–600' },
                  { value: 3, label: '600–1000' },
                  { value: 4, label: '1000–1500' },
                  { value: 5, label: '1500+' },
                ]}
                min={0}
                max={5}
              />
            </>
          );
        case 4:
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={staffGender.includes('Male')}
                    onChange={() => handleStaffGenderChange('Male')}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <MaleIcon sx={{ mr: 1 }} />
                    Male
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={staffGender.includes('Female')}
                    onChange={() => handleStaffGenderChange('Female')}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <FemaleIcon sx={{ mr: 1 }} />
                    Female
                  </Box>
                }
              />
            </FormGroup>
          );
        default:
          return null;
      }
    } else if (service === 'photographers') {
      switch (stepIndex) {
        case 0:
          return isMobile ? (
            <>
              <RadioGroup
                value={photographerBudget}
                onChange={(e) => setPhotographerBudget(parseInt(e.target.value))}
              >
                <FormControlLabel value={0} control={<Radio />} label="0–15,000" />
                <FormControlLabel value={1} control={<Radio />} label="15,001–40,000" />
                <FormControlLabel value={2} control={<Radio />} label="40,000–70,000" />
                <FormControlLabel value={3} control={<Radio />} label="70,000–100,000" />
                <FormControlLabel value={4} control={<Radio />} label="100,000+" />
              </RadioGroup>
            </>
          ) : (
            <>
              <Slider
                value={photographerBudget !== null ? photographerBudget : 0}
                onChange={(e, newValue) => setPhotographerBudget(newValue)}
                step={1}
                marks={[
                  { value: 0, label: '0–15K' },
                  { value: 1, label: '15K–40K' },
                  { value: 2, label: '40K–70K' },
                  { value: 3, label: '70K–100K' },
                  { value: 4, label: '100K+' },
                ]}
                min={0}
                max={4}
              />
            </>
          );
        case 1:
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photographerGender.includes('Male')}
                    onChange={() => handlePhotographerGenderChange('Male')}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <MaleIcon sx={{ mr: 1 }} />
                    Male
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={photographerGender.includes('Female')}
                    onChange={() => handlePhotographerGenderChange('Female')}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <FemaleIcon sx={{ mr: 1 }} />
                    Female
                  </Box>
                }
              />
            </FormGroup>
          );
        default:
          return null;
      }
    }
    return null;
  };

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {isMobile ? (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          p: 0,
          m: 0,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
            p: 2,
            borderRadius: 0,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => setExpanded(!expanded)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="h5">Venue Search</Typography>
            <Box>
              <IconButton onClick={handleModeToggle}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Box>

          <Collapse in={expanded}>
            <Autocomplete
              options={[
                { label: 'Wedding Venues', icon: <GiteIcon />, value: 'wedding' },
                { label: 'Photographers', icon: <CameraAltIcon />, value: 'photographers' },
              ]}
              getOptionLabel={(option) => option.label}
              value={
                service
                  ? {
                      label: service === 'wedding' ? 'Wedding Venues' : 'Photographers',
                      value: service,
                    }
                  : null
              }
              onChange={(e, newValue) => {
                setService(newValue ? newValue.value : null);
                resetStates();
              }}
              renderOption={(props, option) => (
                <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {option.icon}
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Service" />}
              sx={{ mb: 4, mt: 2 }}
            />

            {service && (
              <>
                {completedSteps.map((step) => (
                  <Box key={step} mb={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      {steps[step]}
                    </Typography>
                    <Box sx={{ pl: 2 }}>{getStepContent(step)}</Box>
                  </Box>
                ))}

                <Box mb={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    {steps[activeStep]}
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`step-${renderStep}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 0.3, ease: 'easeInOut' },
                          exit: { duration: 0 }
                        }}
                      >
                        {getStepContent(renderStep)}
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Box>

                <Box mt={4} display="flex" justifyContent="space-between">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    disabled={activeStep === steps.length - 1 && completedSteps.includes(activeStep)}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </>
            )}
          </Collapse>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            bgcolor: mode === 'light' ? '#ffffff' : '#2c2c2c',
            borderRadius: 0,
            minHeight: '50vh',
          }}
        />
      </Box>
    ) : (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          p: 0,
          m: 0,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            bgcolor: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
            p: 4,
            borderRadius: 0,
            overflowY: 'auto',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Venue Search</Typography>
            <IconButton onClick={handleModeToggle}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          <Autocomplete
            options={[
              { label: 'Wedding Venues', icon: <GiteIcon />, value: 'wedding' },
              { label: 'Photographers', icon: <CameraAltIcon />, value: 'photographers' },
            ]}
            getOptionLabel={(option) => option.label}
            value={
              service
                ? {
                    label: service === 'wedding' ? 'Wedding Venues' : 'Photographers',
                    value: service,
                  }
                : null
            }
            onChange={(e, newValue) => {
              setService(newValue ? newValue.value : null);
              resetStates();
            }}
            renderOption={(props, option) => (
              <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {option.icon}
                {option.label}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Service" />}
            sx={{ mb: 4 }}
          />

          {service && (
            <>
              {completedSteps.map((step) => (
                <Box key={step} mb={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    {steps[step]}
                  </Typography>
                  <Box sx={{ pl: 2 }}>{getStepContent(step)}</Box>
                </Box>
              ))}

              <Box mb={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {steps[activeStep]}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`step-${renderStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.3, ease: 'easeInOut' },
                        exit: { duration: 4 }
                      }}
                    >
                      {getStepContent(renderStep)}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </Box>

              <Box mt={4} display="flex" justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={activeStep === steps.length - 1 && completedSteps.includes(activeStep)}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            bgcolor: mode === 'light' ? '#ffffff' : '#2c2c2c',
            borderRadius: 0,
          }}
        />
      </Box>
    )}
  </ThemeProvider>
);};

export default SearchVenue;
