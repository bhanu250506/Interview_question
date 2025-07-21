import React, { useState, useCallback } from 'react';
import {
  Card, CardContent, Typography, IconButton, Collapse, Box, TextField, Button,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, Tooltip
} from '@mui/material';
import {
  ExpandMore, PushPin, PushPinOutlined, LightbulbOutlined, Notes
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePinQuestion, updateQuestionNote } from '../../api/sessionApi';
import { getConceptExplanation } from '../../api/aiApi';
import toast from 'react-hot-toast';
import _ from 'lodash';

const QuestionCard = ({ question, sessionId }) => {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState(question.note || '');
  const [explanation, setExplanation] = useState('');
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const queryClient = useQueryClient();

  const pinMutation = useMutation({
    mutationFn: togglePinQuestion,
    onSuccess: () => {
      toast.success(`Question ${question.isPinned ? 'unpinned' : 'pinned'}!`);
      queryClient.invalidateQueries({ queryKey: ['session', sessionId] });
    },
    onError: () => toast.error('Failed to update pin status.'),
  });

  const noteMutation = useMutation({
    mutationFn: updateQuestionNote,
    onSuccess: () => {
      toast.success('Note saved!');
      queryClient.invalidateQueries({ queryKey: ['session', sessionId] });
    },
    onError: () => toast.error('Failed to save note.'),
  });

  const explanationMutation = useMutation({
    mutationFn: getConceptExplanation,
    onSuccess: (data) => {
      setExplanation(data.explanation);
      setIsExplanationOpen(true);
    },
    onError: () => toast.error('Failed to generate explanation.'),
  });

  const debouncedUpdateNote = useCallback(
    _.debounce((newNote) => {
      noteMutation.mutate({ questionId: question._id, note: newNote });
    }, 1000),
    []
  );

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    debouncedUpdateNote(e.target.value);
  };

  return (
    <>
      <Card
        sx={{
          mb: 3,
          borderLeft: question.isPinned ? '5px solid #facc15' : '5px solid transparent',
          backgroundColor: '#1a1a1a',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: '0.3s',
          '&:hover': { boxShadow: '0 6px 28px rgba(0,0,0,0.08)' },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" sx={{ color: '#D8DCE3FF', fontWeight: 600, pr: 2 }}>
              {question.question}
            </Typography>
            <Box>
              <Tooltip title={question.isPinned ? 'Unpin' : 'Pin'}>
                <IconButton
                  onClick={() => pinMutation.mutate(question._id)}
                  disabled={pinMutation.isPending}
                >
                  {question.isPinned ? (
                    <PushPin sx={{ color: '#C2BFB5FF' }} />
                  ) : (
                    <PushPinOutlined sx={{ color: '#D9E1ECFF' }} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title={expanded ? 'Hide Answer' : 'Show Answer'}>
                <IconButton onClick={() => setExpanded(!expanded)}>
                  <ExpandMore
                    sx={{
                      color: '#ADB7C5FF',
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0 }}>
            <Box
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: '#f1f5f9',
                borderRadius: 2,
                fontSize: 15,
                color: '#585A5FFF',
              }}
            >
              <Typography sx={{ fontWeight: 600, color: '#0f172a', mb: 1 }}>Answer:</Typography>
              {question.answer}
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <Notes sx={{ mr: 1, color: '#475569' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569' }}>
                My Notes
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Write your thoughts here..."
              value={note}
              onChange={handleNoteChange}
              disabled={noteMutation.isPending}
              sx={{
                backgroundColor: '#534F4FFF',
                borderRadius: 1,
              }}
            />

            <Button
              variant="contained"
              startIcon={
                explanationMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <LightbulbOutlined />
              }
              onClick={() => explanationMutation.mutate(question.question)}
              sx={{
                mt: 2,
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: '#facc15',
                color: '#1f2937',
                '&:hover': {
                  backgroundColor: '#eab308',
                },
              }}
              disabled={explanationMutation.isPending}
            >
              {explanationMutation.isPending ? 'Generating...' : 'Explain Concept'}
            </Button>
          </CardContent>
        </Collapse>
      </Card>

      <Dialog
        open={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#1e293b' }}>
          Concept Explanation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              whiteSpace: 'pre-wrap',
              color: '#DCEAFFFF',
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            {explanation}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionCard;
