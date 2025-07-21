/**
 * Generates a prompt for AI to create technical interview questions and answers.
 *
 * @param {string} role - The job role (e.g., 'Frontend Developer', 'Backend Engineer').
 * @param {string} experience - Experience level (e.g., 'Fresher', '2 years', 'Senior').
 * @param {string} topicToFocus - The topic to focus on (e.g., 'JavaScript', 'Data Structures').
 * @param {number} numberOfQuestions - How many questions to generate.
 * @returns {string} The formatted prompt.
 */
const questionAnswerPrompt = (role, experience, topicToFocus, numberOfQuestions) => {
  return `You are an AI trained as a technical interviewer.

Generate exactly ${numberOfQuestions} high-quality, real-world technical interview questions and answers in **strict JSON format**.

Details:
- Role: ${role}
- Experience Level: ${experience}
- Focus Topics: ${topicToFocus}

Instructions:
- Respond ONLY with a **pure JSON array** like this:
[
  {
    "question": "Explain X in context of Y?",
    "answer": "X is ... and it helps Y by ..."
  },
  ...
]
- Do NOT include:
  - Markdown syntax (e.g., \`\`\`json)
  - Introductory or trailing text
  - Explanations outside the JSON structure
- Ensure:
  - No trailing commas
  - The response is directly parseable using JSON.parse()

Keep the questions thoughtful, and the answers concise but informative.`;
};


/**
 * Generates a prompt for AI to explain a technical question or concept.
 *
 * @param {string} question - The question or concept to explain.
 * @returns {string} The formatted prompt.
 */
const conceptExplainPrompt = (question) => {
  return `You are an AI tutor who helps candidates prepare for technical interviews.

Explain the following concept in simple, clear language for a beginner:

"${question}"

Instructions:
- Focus on clarity, structure, and depth.
- Include examples or analogies if helpful.
- Make it conversational and easy to understand.
- Do NOT include markdown or code fences like \`\`\`.

Begin your explanation now:`;
};


module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
