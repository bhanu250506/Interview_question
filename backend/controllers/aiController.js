const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const extractTextFromResponse = (response) => {
  try {
    return response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch {
    return '';
  }
};

const cleanJsonString = (text) => {
  return text
    .replace(/^```json\s*/i, '')
    .replace(/```$/g, '')
    .trim();
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Please provide all the required fields." });
    }

    const topicsString = Array.isArray(topicsToFocus)
      ? topicsToFocus.join(', ')
      : topicsToFocus;

    const prompt = questionAnswerPrompt(role, experience, topicsString, numberOfQuestions);

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // recommended over 2.0-lite for quality
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const rawText = extractTextFromResponse(response);
    const cleanedText = cleanJsonString(rawText);

    const parsedData = JSON.parse(cleanedText);

    return res.status(200).json({
      success: true,
      questions: parsedData,
    });

  } catch (error) {
    console.error("❌ AI Question Generation Error:", error);
    return res.status(500).json({
      message: "Error generating interview questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const rawText = extractTextFromResponse(response);
    const cleanedText = cleanJsonString(rawText);

    return res.status(200).json({
      success: true,
      explanation: cleanedText, // ✅ just return the explanation string
    });

  } catch (error) {
    console.error("❌ Concept Explanation Error:", error);
    return res.status(500).json({
      message: "Error generating concept explanation",
      error: error.message,
    });
  }
};


module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
