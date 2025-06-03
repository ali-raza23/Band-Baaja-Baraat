import React, { useState, useMemo } from 'react';
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

const SearchVenue = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mode, setMode] = useState('light');
  const [service, setService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [subLocation, setSubLocation] = useState(null);
  const [parking, setParking] = useState(false);
  const [budget, setBudget] = useState(null);
  const [venueType, setVenueType] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [staffGender, setStaffGender] = useState([]);
  const [photographerBudget, setPhotographerBudget] = useState(null);
  const [photographerGender, setPhotographerGender] = useState([]);

  const resetStates = () => {
    setActiveStep(0);
    setSubLocation(null);
    setParking(false);
    setBudget(null);
    setVenueType(null);
    setCapacity(null);
    setStaffGender([]);
    setPhotographerBudget(null);
    setPhotographerGender([]);
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
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      const newStep = activeStep - 1;
      setActiveStep(newStep);
      if (service === 'wedding') {
        if (newStep < 1) setBudget(null);
        if (newStep < 2) setVenueType(null);
        if (newStep < 3) setCapacity(null);
        if (newStep < 4) setStaffGender([]);
      } else if (service === 'photographers') {
        if (newStep < 1) setPhotographerGender([]);
      }
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

  const photographerSteps = ['Budget', 'Photographer Gender'];

  const steps =
    service === 'wedding'
      ? weddingVenueSteps
      : service === 'photographers'
      ? photographerSteps
      : [];

  const isStepValid = () => {
    if (service === 'wedding') {
      switch (activeStep) {
        case 0:
          return subLocation !== null;
        case 1:
          return budget !== null;
        case 2:
          return venueType !== null;
        case 3:
          return capacity !== null;
        case 4:
          return staffGender.length > 0;
        default:
          return false;
      }
    } else if (service === 'photographers') {
      switch (activeStep) {
        case 0:
          return photographerBudget !== null;
        case 1:
          return photographerGender.length > 0;
        default:
          return false;
      }
    }
    return false;
  };

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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub-Location"
                    required
                    error={subLocation === null}
                    helperText={subLocation === null ? 'Required' : ''}
                  />
                )}
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
              <Typography gutterBottom>Budget (Per Person)</Typography>
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  required
                  error={venueType === null}
                  helperText={venueType === null ? 'Required' : ''}
                />
              )}
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
              <Typography gutterBottom>Capacity</Typography>
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
              <Typography gutterBottom>Photographer Budget</Typography>
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
              <Typography gutterBottom>Photographer Budget</Typography>
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
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: isMobile ? '100%' : 600,
            maxWidth: '100%',
            p: isMobile ? 2 : 9,
            borderRadius: 4,
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {getStepContent(activeStep)}
                <Box mt={4} display="flex" justifyContent="space-between">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    disabled={!isStepValid()}
                    onClick={handleNext}
                    variant="contained"
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </motion.div>
            </AnimatePresence>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SearchVenue;