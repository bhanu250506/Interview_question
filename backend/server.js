require("dotenv").config();
const express  = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');

const { protect } = require("./middlewares/authMiddleware");
const { generateConceptExplanation, generateInterviewQuestions } = require('./controllers/aiController');

const app = express();

// Middle ware to handle cors
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));


connectDB();

// Middleware 
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/session",sessionRoutes);
app.use("/api/questions", questionRoutes);


app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "upload"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
