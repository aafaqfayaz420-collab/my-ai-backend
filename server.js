import express from "express";
import fetch from "node-fetch";
const app = express();

// Enable CORS for your mobile app/frontend
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Higher limit for base64 audio data

/**
 * Health Check & Root
 */
app.get('/', (req, res) => {
    res.json({ status: 'active', service: 'LinguaBuddy SaaS API' });
});

/**
 * AUTHENTICATION ROUTES - FIXES THE 404
 */
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    // In production, verify credentials via Supabase:
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log(`Login attempt: ${email}`);
    
    // Return User object matching types.ts
    res.json({
        user: {
            id: "usr_" + Math.random().toString(36).substr(2, 9),
            email: email,
            is_premium: false,
            plan_type: 'free',
            subscription_status: 'none',
            usage_stats: {
                daily_credits_used: 0,
                last_reset_date: new Date().toISOString()
            }
        }
    });
});

app.post('/auth/signup', async (req, res) => {
    const { email } = req.body;
    
    console.log(`New Signup: ${email}`);

    res.json({
        user: {
            id: "usr_" + Math.random().toString(36).substr(2, 9),
            email: email,
            is_premium: false,
            plan_type: 'free',
            subscription_status: 'none',
            usage_stats: {
                daily_credits_used: 0,
                last_reset_date: new Date().toISOString()
            }
        }
    });
});

/**
 * AI & VOICE ROUTES (Placeholders for Groq/Gemini logic)
 */
app.post('/chat', async (req, res) => {
    // Logic: 1. Verify credit 2. Call Groq 3. Format response
    res.json({
        data: {
            text: "Hello! I am your AI tutor. How can I help you today?",
            details: {
                vocabulary: ["practice", "conversation"]
            }
        }
    });
});

app.post('/voice/stream', async (req, res) => {
    // Logic: 1. Transcribe audio 2. Call AI 3. TTS response
    res.json({
        audioResponse: "BASE64_PCM_DATA_HERE",
        userTranscription: "Hello",
        aiResponseText: "Hi there!"
    });
});

app.post('/evaluate', async (req, res) => {
    res.json({
        evaluation: {
            overall_score: 88,
            reason: "Excellent natural flow and vocabulary usage."
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`LinguaBuddy SaaS Backend running on port ${PORT}`);
});
