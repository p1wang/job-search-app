import Loader from "@/components/Loader";
import useApplications from "@/hooks/useApplications";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function ApplicationPage() {
  const router = useRouter();
  const { applicationId } = router.query;
  const { getApplicationById } = useApplications();

  const { data: application, isLoading } = getApplicationById(applicationId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Box sx={{ my: 1 }}>
          <Typography variant="body2" textAlign="center">
            {`${application.user.firstName} ${application.user.lastName}`}
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
          >{`${application.user.email}`}</Typography>
        </Box>

        <List>
          <Typography variant="h7" textTransform="uppercase">
            Educations
          </Typography>
          <Divider />
          {application.educations.map((education) => (
            <ListItem key={education.id}>
              <Box>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="body2" fontWeight="bold">
                    {"School:"}
                  </Typography>
                  <Typography variant="body2">{education.school}</Typography>
                </Stack>

                <Stack direction="row" gap={0.5} sx={{ ml: 4 }}>
                  <Typography variant="body2">{"Degree:"}</Typography>
                  <Typography variant="body2">{education.degree}</Typography>
                </Stack>
              </Box>
            </ListItem>
          ))}
        </List>

        <List>
          <Typography variant="h7" textTransform="uppercase">
            Experiences
          </Typography>
          <Divider />
          {application.experiences.map((experience) => (
            <ListItem key={experience.id}>
              <Box>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="body2" fontWeight="bold">
                    {"Company:"}
                  </Typography>
                  <Typography variant="body2">{experience.company}</Typography>
                </Stack>
                <Stack direction="row" gap={0.5} sx={{ ml: 4 }}>
                  <Typography variant="body2">{"Role:"}</Typography>
                  <Typography variant="body2">{experience.title}</Typography>
                </Stack>
                <Stack direction="row" gap={0.5} sx={{ ml: 4 }}>
                  <Typography variant="body2">{"Description:"}</Typography>
                  <Typography variant="body2">
                    {experience.description}
                  </Typography>
                </Stack>
              </Box>
            </ListItem>
          ))}
        </List>

        <List>
          <Typography variant="h7" textTransform="uppercase">
            Skills
          </Typography>
          <Divider />
          {application.skills.map((skill) => (
            <ListItem key={skill.id}>
              <Box>
                <Stack direction="row" gap={0.5}>
                  <Typography variant="body2" fontWeight="bold">
                    {skill.title}
                  </Typography>
                  <Typography variant="body2">{`(${skill.level})`}</Typography>
                </Stack>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default ApplicationPage;
