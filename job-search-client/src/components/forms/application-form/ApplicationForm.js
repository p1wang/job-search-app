import Loader from "@/components/Loader";
import useApplications from "@/hooks/useApplications";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillForm from "./SkillForm";

const initialValues = {
  educations: [
    {
      school: "",
      degree: "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  ],
  experiences: [
    {
      title: "",
      company: "",
      description: "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  ],
  skills: [{ title: "", level: "" }],
};

const schema = [
  yup.object().shape({
    educations: yup.array().of(
      yup.object().shape({
        school: yup.string().required().label("School"),
        degree: yup.string().required().label("Degree"),
        startDate: yup
          .date()
          .required()
          .max(yup.ref("endDate"), "Start date must be before end date"),
        endDate: yup
          .date()
          .required()
          .min(yup.ref("startDate"), "End date must be after start date"),
      })
    ),
  }),
  yup.object().shape({
    experiences: yup.array().of(
      yup.object().shape({
        title: yup.string().required().label("Title"),
        company: yup.string().required().label("Company"),
        description: yup.string().required().label("Description"),
        startDate: yup
          .date()
          .required()
          .max(yup.ref("endDate"), "Start date must be before end date"),
        endDate: yup
          .date()
          .required()
          .min(yup.ref("startDate"), "End date must be after start date"),
      })
    ),
  }),
  yup.object().shape({
    skills: yup.array().of(
      yup.object().shape({
        title: yup.string().required().label("Title"),
        level: yup.string().required().label("Level"),
      })
    ),
  }), // this is for the last step
];

const steps = [
  <EducationForm key={1} />,
  <ExperienceForm key={2} />,
  <SkillForm key={3} />,
];

const stepperLabels = ["Educations", "Experiences", "Skills"];

function ApplicationForm({ jobId }) {
  const [activeStep, setActiveStep] = useState(0);
  const { createApplicationIsLoading, createApplication } = useApplications();

  const methods = useForm({
    resolver: yupResolver(schema[activeStep]),
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    if (activeStep < steps.length - 1) {
      return handleNext();
    }

    try {
      await createApplication({ jobId, ...data });
    } catch (error) {
      return;
      console.log(error);
    }

    handleNext(); // this is to show the last step
    methods.reset();
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (createApplicationIsLoading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="sm"
      component="form"
      noValidate
      onSubmit={methods.handleSubmit(onSubmit)}
      sx={{ mt: 5 }}
    >
      <Typography component="h1" variant="h4" align="center">
        Application
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {stepperLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you.
          </Typography>
          <Typography variant="subtitle1">
            You application has been submitted.
          </Typography>
        </>
      ) : (
        <>
          <FormProvider {...methods}>{steps[activeStep]}</FormProvider>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}

            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default ApplicationForm;
