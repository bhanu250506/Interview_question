import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoginIcon from '@mui/icons-material/Login';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import interImage from '../assets/inter.png';
import { useAuth } from '../hooks/useAuth';

// --- DATA FOR SECTIONS ---
const features = [
  {
    icon: <SchoolIcon />,
    title: 'Expert Question Bank',
    description: 'Access a vast library of questions and detailed model answers sourced from real interviews at top companies.',
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Intelligent Topic Analysis',
    description: 'Our AI identifies your weak spots from practice sessions and suggests key concepts for you to focus on.',
  },
  {
    icon: <BarChartIcon />,
    title: 'Track Your Mastery',
    description: 'Visualize your progress topic-by-topic. Watch your knowledge grow and build unshakable confidence.',
  },
];

const testimonials = [
    {
        quote: "The AI topic analysis was a game-changer. It showed me exactly where my knowledge gaps were. I went into my interviews feeling more prepared than ever.",
        name: 'Priya Sharma',
        title: 'Backend Developer at a Unicorn Startup',
        avatar: 'PS'
    },
    {
        quote: "I used to just memorize answers. PrepAI taught me how to understand the core concepts behind the questions. This made all the difference.",
        name: 'Rohan Mehra',
        title: 'Data Scientist, ex-IIT Bombay',
        avatar: 'RM'
    }
];

const faqData = [
  {
    question: 'Who is this platform for?',
    answer: 'PrepAI is designed for software engineers, data scientists, product managers, and anyone in the tech industry preparing for job interviews, from entry-level to senior positions.'
  },
  {
    question: 'How are the questions generated?',
    answer: 'Our AI analyzes thousands of recent interview transcripts and job descriptions from top tech companies. It then generates questions tailored to your specific role, experience level, and chosen technologies.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You can start for free with a limited number of practice questions and features to experience the platform. You can upgrade at any time to unlock unlimited access.'
  },
  {
    question: 'Can I use this on my mobile?',
    answer: 'Absolutely. The platform is fully responsive and works beautifully on all devices, so you can practice on your desktop, tablet, or phone.'
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden' }}>

      {/* --- HERO SECTION --- */}
      <Box sx={{ position: 'relative', py: { xs: 8, md: 12 }, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at top, ${theme.palette.background.paper}99, transparent 60%)`, zIndex: 0, } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' }, mb: 3, lineHeight: 1.15 }}>
                Master the Questions, <Box component="span" sx={{ color: 'primary.main' }}>Land the Job</Box>
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, maxWidth: { xs: '100%', md: 500 }, mx: { xs: 'auto', md: 0 } }}>
                Generate unlimited, role-specific questions. Study expert-crafted answers and master the core concepts to walk into any interview with confidence.
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                {isAuthenticated ? (
                  <Button component={RouterLink} to="/dashboard" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: 'primary.main', color: '#000', px: 4, py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button component={RouterLink} to="/register" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: 'primary.main', color: '#000', px: 4, py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
                      Start Free Practice
                    </Button>
                    <Button component={RouterLink} to="/login" variant="outlined" startIcon={<LoginIcon />} sx={{ color: 'primary.main', borderColor: 'primary.main', px: 4, py: 1.5, '&:hover': { borderColor: 'primary.dark', color: 'primary.dark' } }}>
                      Login
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper elevation={12} sx={{ bgcolor: 'background.paper', borderRadius: 4, p: 1, border: '1px solid #334155', maxWidth: 500, width: '100%' }}>
                  <Box sx={{ height: 20, display: 'flex', alignItems: 'center', px: 1, gap: 1, mb: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }}/>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }}/>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }}/>
                  </Box>
                  <Box component="img" src={interImage} alt="AI Interview Prep Platform" sx={{ width: '100%', borderRadius: 2, display: 'block' }}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- FEATURES SECTION --- */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" component="h2">The Ultimate Prep Toolkit</Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto', mt: 2 }}>
              Our platform provides everything you need to turn interview anxiety into confident preparation.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card sx={{ bgcolor: 'background.default', p: 3, height: '100%', borderRadius: 4, textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: `0 20px 25px -5px ${theme.palette.primary.main}20` } }}>
                  <Avatar sx={{ bgcolor: 'primary.main', color: '#000', width: 64, height: 64, mx: 'auto', mb: 3, fontSize: '2rem' }}>{feature.icon}</Avatar>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>{feature.title}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* --- HOW IT WORKS SECTION --- */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
         <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" component="h2">A Clear Path to Mastery</Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto', mt: 2 }}>
              We've simplified interview prep into a powerful, repeatable learning loop.
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ mb: { xs: 8, md: 12 }}}>
            <Grid item xs={12} md={6}><Box component="img" src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop" alt="Defining focus area" sx={{ width: '100%', borderRadius: 4, objectFit: 'cover' }} /></Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" sx={{ mb: 2 }}>1. Define Your Focus Area</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.7 }}>Select your target role, experience, and the technologies you want to master. Our AI tailors question sets and concepts just for you.</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ mb: { xs: 8, md: 12 }}} direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" sx={{ mb: 2 }}>2. Practice & Review Answers</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.7 }}>Tackle your generated questions one by one. Compare your approach with our expert-written model answers and absorb the key talking points.</Typography>
            </Grid>
            <Grid item xs={12} md={6}><Box component="img" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop" alt="Studying model answers" sx={{ width: '100%', borderRadius: 4, objectFit: 'cover' }} /></Grid>
          </Grid>
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}><Box component="img" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Tracking progress" sx={{ width: '100%', borderRadius: 4, objectFit: 'cover' }} /></Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3" sx={{ mb: 2 }}>3. Track & Reinforce Learning</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.7 }}>After each session, review your performance by topic. Bookmark tricky questions and revisit core concepts to solidify your knowledge.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- NEW: TESTIMONIALS SECTION --- */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
             <Box sx={{ textAlign: 'center', mb: 10 }}>
                <Typography component="h2" variant="h3">Don't Just Take Our Word For It</Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto', mt: 2 }}>
                    See how professionals from India and around the world have landed top jobs with PrepAI.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {testimonials.map(item => (
                    <Grid item xs={12} md={6} key={item.name}>
                        <Card sx={{ bgcolor: 'background.default', p: 4, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <FormatQuoteIcon sx={{ color: 'primary.main', fontSize: 48, mb: 2 }}/>
                            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', flexGrow: 1, mb: 3 }}>"{item.quote}"</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: 'primary.dark', mr: 2, fontWeight: 'bold' }}>{item.avatar}</Avatar>
                                <Box>
                                    <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }}>{item.name}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.title}</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
      </Box>

      {/* --- NEW: FAQ SECTION --- */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" component="h2">Frequently Asked Questions</Typography>
          </Box>
          {faqData.map((faq, index) => (
            <Accordion key={index} sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 'none', border: '1px solid', borderColor: 'divider', '&:not(:last-child)': { borderBottom: 0 }, '&:before': { display: 'none' }, '&.Mui-expanded': { mt: '0 !important', mb: '0 !important' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* --- FINAL CTA SECTION --- */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 15 } }}>
        <Container maxWidth="md">
          <Paper sx={{ bgcolor: 'background.default', p: { xs: 4, md: 8 }, borderRadius: 6, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2 }}>Build Your Interview Playbook</Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 4 }}>
              Your next career move is built on solid preparation. Start building your knowledge base for free and walk into your next interview prepared for anything.
            </Typography>
            <Button component={RouterLink} to="/register" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: 'primary.main', color: '#000', px: 6, py: 2, fontSize: '1.1rem', '&:hover': { bgcolor: 'primary.dark' } }}>
              Start for Free
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* --- NEW: FOOTER SECTION --- */}
      <Box component="footer" sx={{ bgcolor: 'background.default', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>PrepAI</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>Your personal AI-powered interview preparation toolkit.</Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                      <Typography sx={{ fontWeight: 'bold' }}>Product</Typography>
                      <Link component={RouterLink} to="/features" color="text.secondary" display="block" sx={{ mt: 1 }}>Features</Link>
                      <Link component={RouterLink} to="/pricing" color="text.secondary" display="block" sx={{ mt: 1 }}>Pricing</Link>
                  </Grid>
                  <Grid item xs={6} md={2}>
                      <Typography sx={{ fontWeight: 'bold' }}>Company</Typography>
                      <Link component={RouterLink} to="/about" color="text.secondary" display="block" sx={{ mt: 1 }}>About Us</Link>
                      <Link component={RouterLink} to="/contact" color="text.secondary" display="block" sx={{ mt: 1 }}>Contact</Link>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' }}}>
                      <IconButton aria-label="Twitter" sx={{ color: 'text.secondary' }}><TwitterIcon /></IconButton>
                      <IconButton aria-label="LinkedIn" sx={{ color: 'text.secondary' }}><LinkedInIcon /></IconButton>
                  </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
                  © {new Date().getFullYear()} PrepAI. Made with ❤️ in Ajmer, India.
              </Typography>
          </Container>
      </Box>
    </Box>
  );
};

export default React.memo(HomePage);