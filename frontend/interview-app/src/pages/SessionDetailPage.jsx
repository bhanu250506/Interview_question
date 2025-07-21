import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSessionById, deleteSession } from '../api/sessionApi';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import QuestionCard from '../components/session/QuestionCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

const SessionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const { data: session, isLoading, isError, error } = useQuery({
    queryKey: ['session', id],
    queryFn: () => getSessionById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      toast.success('Session deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['mySessions'] });
      navigate('/dashboard');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to delete session.'),
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
    setConfirmOpen(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Alert severity="error">
          {error?.response?.data?.message || 'Failed to load session.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              {session?.role}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Experience: {session?.experience}
            </Typography>

            {Array.isArray(session?.topicsToFocus) && session.topicsToFocus.length > 0 && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                Topics: {session.topicsToFocus.join(', ')}
              </Typography>
            )}
          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmOpen(true)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Session'}
          </Button>
        </Stack>

        {session?.description && (
          <Typography variant="body1" mt={3}>
            {session.description}
          </Typography>
        )}
      </Paper>

      <Box>
        {session?.questions?.length > 0 ? (
          session.questions.map((q) => (
            <QuestionCard key={q._id} question={q} sessionId={id} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No questions added yet for this session.
          </Typography>
        )}
      </Box>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Session?"
        description="This will permanently delete the session and all its questions. This action cannot be undone."
      />
    </Container>
  );
};

export default SessionDetailPage;
