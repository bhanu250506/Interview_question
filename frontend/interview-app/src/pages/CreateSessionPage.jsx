import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Autocomplete, // Import Autocomplete
} from '@mui/material';
import { generateQuestions } from '../api/aiApi';
import { createSession } from '../api/sessionApi';
import toast from 'react-hot-toast';

// Predefined list of common topics for suggestions
const topics = [
  // A
  "Agile Methodologies", "AI/ML", "AWS", "Angular", "API Design", "Apache Kafka", "Authentication",
  
  // B
  "Blockchain", "Bootstrap", "Big Data", "Bash Scripting", "Babel",
  
  // C
  "C", "C++", "C#", "CI/CD", "Cloud Computing", "CSS", "Cybersecurity", "Clean Architecture",

  // D
  "Data Structures", "Databases", "Dart", "Design Patterns", "Django", "Docker",

  // E
  "Express.js", "Elasticsearch", "EC2", "ECS", "ETL Pipelines",

  // F
  "Firebase", "Flask", "FastAPI", "Figma", "Functional Programming",

  // G
  "Git", "GitHub", "Go (Golang)", "GraphQL", "GCP", "Gatsby.js",

  // H
  "HTML", "Heroku", "Helm", "Hibernate",

  // I
  "IoT", "Identity & Access Management", "IndexedDB", "Inversion of Control",

  // J
  "Java", "JavaScript", "Jest", "Jenkins", "JSON", "Jira",

  // K
  "Kotlin", "Kubernetes", "Kafka", "Kibana", "Keras",

  // L
  "Linux", "Load Balancing", "Lambda Functions", "Laravel",

  // M
  "Machine Learning", "MongoDB", "MySQL", "Material UI", "Microservices", "MobX",

  // N
  "Node.js", "Next.js", "Nginx", "NoSQL", "NestJS",

  // O
  "OAuth2", "Object-Oriented Programming", "OpenAPI", "OpenCV", "Operating Systems",

  // P
  "Python", "PostgreSQL", "Postman", "Pandas", "Performance Optimization", "Playwright",

  // Q
  "Queues (RabbitMQ, SQS)", "Query Optimization", "Quick Sort",

  // R
  "React", "Redux", "REST APIs", "Ruby", "Rust", "React Native", "Redis", "Responsive Design",

  // S
  "Spring Boot", "SQL", "System Design", "SASS", "Security Best Practices", "Socket.IO", "Scala",

  // T
  "TypeScript", "Tailwind CSS", "Terraform", "Testing", "TDD", "TensorFlow",

  // U
  "UI/UX Design", "Unit Testing", "UML", "Unix", "UseEffect/UseState",

  // V
  "Vue.js", "Version Control", "Vite", "Vercel", "Virtual DOM",

  // W
  "WebSockets", "Webpack", "WebAssembly", "Web Security", "Wireframing",

  // X
  "XML", "XSS Prevention", "XState",

  // Y
  "YAML", "YouTube API", "Yarn",

  // Z
  "Zustand", "Zod", "Zero Downtime Deployment", "Zig"
];

const step1Schema = z.object({
  role: z.string().min(3, 'Role is required and should be at least 3 characters long.'),
  experience: z.string().min(1, 'Experience level is required.'),
  // Schema remains the same, accepting an array of strings
  topicsToFocus: z.array(z.string().min(1, "Topic cannot be empty")).min(1, 'Select or enter at least one topic.'),
  numberOfQuestions: z.number().min(3).max(15),
});

const step2Schema = z.object({
  description: z.string().optional(),
});

const steps = ['Configure AI', 'Review & Save'];

const CreateSessionPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [sessionData, setSessionData] = useState({});

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    watch,
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      role: '',
      experience: '',
      topicsToFocus: [],
      numberOfQuestions: 5,
    },
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { description: '' },
  });

  const aiMutation = useMutation({
    mutationFn: generateQuestions,
    onSuccess: (data) => {
      setSessionData((prev) => ({ ...prev, questions: data.questions }));
      toast.success('Questions generated successfully! 🤖');
      setActiveStep(1);
    },
    onError: () => toast.error('Failed to generate questions. Please try again. 😥'),
  });

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      toast.success('Session created successfully! 🎉');
      navigate(`/session/${data.session._id}`);
    },
    onError: () => toast.error('Failed to save the session.'),
  });

  const handleStep1Submit = (data) => {
    setSessionData(data);
    aiMutation.mutate(data);
  };

  const handleStep2Submit = (data) => {
    const finalSessionData = { ...sessionData, ...data };
    createSessionMutation.mutate(finalSessionData);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1 - AI Configuration */}
        {activeStep === 0 && (
          <Box component="form" onSubmit={handleSubmit1(handleStep1Submit)} noValidate>
            <Typography variant="h5" gutterBottom>
              Generate Practice Questions
            </Typography>

            <Controller
              name="role"
              control={control1}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Role (e.g., Senior Frontend Developer)"
                  fullWidth
                  margin="normal"
                  error={!!errors1.role}
                  helperText={errors1.role?.message}
                />
              )}
            />

            <Controller
              name="experience"
              control={control1}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors1.experience}>
                  <InputLabel>Experience Level</InputLabel>
                  <Select {...field} label="Experience Level">
                    <MenuItem value="Intern">Intern</MenuItem>
                    <MenuItem value="Junior">Junior (0–2 years)</MenuItem>
                    <MenuItem value="Mid-Level">Mid-Level (2–5 years)</MenuItem>
                    <MenuItem value="Senior">Senior (5+ years)</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            
            {/* MODIFICATION: Replaced Select with Autocomplete */}
            <Controller
              name="topicsToFocus"
              control={control1}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  freeSolo // Allows custom text entry
                  options={topics}
                  onChange={(event, newValue) => field.onChange(newValue)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Topics to Focus On"
                      placeholder="Select or type topics"
                      margin="normal"
                      error={!!errors1.topicsToFocus}
                      helperText={errors1.topicsToFocus?.message}
                    />
                  )}
                />
              )}
            />

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Number of Questions: {watch('numberOfQuestions')}
              </Typography>
              <Controller
                name="numberOfQuestions"
                control={control1}
                render={({ field }) => (
                  <Slider
                    {...field}
                    onChange={(_, value) => field.onChange(value)} // Ensure value is passed correctly
                    min={3}
                    max={15}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                  />
                )}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
              disabled={aiMutation.isPending}
              startIcon={aiMutation.isPending ? <CircularProgress size={20} /> : null}
            >
              {aiMutation.isPending ? 'Generating...' : 'Generate Questions'}
            </Button>
          </Box>
        )}

        {/* Step 2 - Review & Save */}
        {activeStep === 1 && (
          <Box component="form" onSubmit={handleSubmit2(handleStep2Submit)}>
            <Typography variant="h5" gutterBottom>
              Review Generated Questions
            </Typography>

            <Box
              my={2}
              p={2}
              sx={{
                maxHeight: '40vh',
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: 2,
                backgroundColor: '#3A3838FF',
              }}
            >
              {sessionData?.questions?.map((q, i) => (
                <Typography key={i} sx={{ mb: 1 }}>
                  <strong>{i + 1}.</strong> {q.question || q}
                </Typography>
              ))}
            </Box>

            <Controller
              name="description"
              control={control2}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Session Description (Optional)"
                  fullWidth
                  multiline
                  rows={2}
                  margin="normal"
                  error={!!errors2.description}
                  helperText={errors2.description?.message}
                />
              )}
            />

            <Stack direction="row" justifyContent="space-between" mt={3}>
              <Button onClick={handleBack} disabled={createSessionMutation.isPending}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={createSessionMutation.isPending}
                startIcon={createSessionMutation.isPending ? <CircularProgress size={20} /> : null}
              >
                {createSessionMutation.isPending ? 'Saving...' : 'Save Session'}
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CreateSessionPage;