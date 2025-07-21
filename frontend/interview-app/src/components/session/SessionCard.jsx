import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Tooltip,
  Stack,
} from '@mui/material';
import { Person, FormatListNumbered as QuestionsIcon } from '@mui/icons-material'; // Changed to a more relevant icon
import { useNavigate } from 'react-router-dom';

// Color function remains the same, it's a good feature
const getRoleColor = (role) => {
  switch (role?.toLowerCase()) {
    case 'frontend':
      return '#3b82f6'; // blue
    case 'backend':
      return '#6366f1'; // indigo
    case 'fullstack':
      return '#10b981'; // emerald
    case 'data scientist':
      return '#f43f5e'; // rose
    case 'java developer':
      return '#f97316'; // orange
    default:
      return '#facc15'; // yellow
  }
};

const SessionCard = ({ session }) => {
  const roleColor = getRoleColor(session.role);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/session/${session._id}`);
  };

  // Split topics string into an array for displaying as chips
  const topics = session.topicsToFocus ? session.topicsToFocus.split(',').map(t => t.trim()) : [];

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: '#1e293b', // Using a consistent theme color
        borderRadius: 4,
        color: '#f8fafc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 10px 20px rgba(0,0,0,0.4), 0 0 0 1px ${roleColor}`, // Added a colored border on hover
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with Main Role Chip */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip
            label={session.role || 'General'}
            sx={{
              backgroundColor: roleColor,
              color: '#fff',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {new Date(session.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Main Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: 'text.primary',
            mb: 1,
          }}
        >
          {session.role} Practice Set
        </Typography>

        {/* Topics as Chips */}
        {topics.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
            {topics.slice(0, 3).map((topic, index) => ( // Show up to 3 topics
              <Chip
                key={index}
                label={topic}
                size="small"
                sx={{ bgcolor: 'background.default', color: 'text.secondary' }}
              />
            ))}
            {topics.length > 3 && (
                <Tooltip title={topics.slice(3).join(', ')}>
                     <Chip label={`+${topics.length - 3}`} size="small" sx={{ bgcolor: 'background.default', color: 'text.secondary' }} />
                </Tooltip>
            )}
          </Stack>
        )}
        
        <Box sx={{ flexGrow: 1 }} /> {/* Pushes footer to the bottom */}
        
        <Divider sx={{ borderColor: 'divider', my: 2 }} />

        {/* Footer Info: Experience and Question Count */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Person sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Experience: {session.experience || 'Any'} Yrs
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <QuestionsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {session.questionCount || 15} Questions
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SessionCard;