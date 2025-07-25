const Question = require('../models/Question');
const Session = require('../models/Session');

// Add Questions to a Session
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    return res.status(201).json(createdQuestions);
  } catch (error) {
    console.error("❌ Error adding questions to session:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Toggle Pin/Unpin a Question
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id); // ❗️Fixed typo: "Ouestion" ➜ "Question"

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("❌ Error toggling pin:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Note for a Question
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.note = note || "";
    await question.save();

    return res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
