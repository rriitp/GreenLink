import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_CROPS, GOVERNMENT_SCHEMES, MARKET_PRICE_DATA } from './src/data/mockData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Configure EJS Template Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());

// Agricultural Knowledge Base for reliable offline/demo responses
function getAgriculturalFallbackResponse(query: string, language: string = 'en'): string {
  const q = query.toLowerCase();
  
  if (q.includes('wheat') || q.includes('गेहूं') || q.includes('gehu')) {
    if (language === 'hi' || q.includes('hindi') || q.includes('हिंदी')) {
      return `🌾 **गेहूं की खेती हेतु प्रमुख सावधानियां एवं सिफारिशें:**
1. **बुवाई का समय:** उचित समय 1 नवंबर से 25 नवंबर के मध्य है। देरी से बुवाई करने पर उपज में 15-20% की कमी आ सकती है।
2. **बीज उपचार:** प्रमाणित बीज (जैसे HD 2967, PBW 550, Sharbati) को 2.5 ग्राम थीरम या कार्बेन्डाजिम प्रति किलो बीज से उपचारित करें।
3. **सिंचाई प्रबंधन (CRI स्टेज):** प्रथम सिंचाई बुवाई के 20-25 दिनों बाद (शीर्ष जड़ जमने के समय) अत्यंत आवश्यक है। कुल 4-5 हल्की सिंचाई करें।
4. **उर्वरक मात्रा:** मिट्टी परीक्षण के आधार पर N:P:K (120:60:40 किग्रा/हेक्टेयर)। जिंक सल्फेट 25 किग्रा/हेक्टेयर अवश्य डालें।
5. **पीला रतुआ (Yellow Rust) की निगरानी:** पत्तियों पर पीले धब्बे दिखते ही प्रोपिकोनाजोल 25% EC का 1 मिली प्रति लीटर पानी में छिड़काव करें।

📌 *सलाह: स्थानीय कृषि विज्ञान केंद्र (KVK) से अपनी मिट्टी के अनुसार सलाह अवश्य लें।*`;
    }
    return `🌾 **Key Precautions & Best Practices for Wheat Cultivation:**
1. **Sowing Window:** Optimum window is Nov 1 - Nov 25. Late sowing after Nov 30 can reduce yield by up to 25-35 kg/ha/day.
2. **Seed Treatment:** Treat certified seeds (e.g., HD 2967, PBW 550, Sharbati) with Thiram or Carbendazim @ 2.5g/kg seed.
3. **Crown Root Initiation (CRI):** The first irrigation at 20-25 days post-sowing is critical for root anchoring. Ensure field is not waterlogged.
4. **Fertilizer Split:** Apply Nitrogen in 3 splits (half basal, 1/4th at 1st irrigation, 1/4th at 2nd irrigation).
5. **Rust Vigilance:** Monitor for Stripe/Yellow Rust during foggy mornings in Dec-Jan.

📌 *Official Tip: Register on PM Fasal Bima Yojana (PMFBY) before cutoff date to secure your Rabi crop.*`;
  }

  if (q.includes('scheme') || q.includes('योजना') || q.includes('pm-kisan') || q.includes('fasal bima')) {
    return `🏛️ **Official Agricultural Schemes & How to Verify Information:**
1. **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi):**
   - Benefit: ₹6,000 per year directly into bank account in 3 equal installments of ₹2,000.
   - Official portal: [pmkisan.gov.in](https://pmkisan.gov.in)
   - Mandatory: Aadhaar eKYC, Land record seeding, Active Bank NPCI linking.
2. **Pradhan Mantri Fasal Bima Yojana (PMFBY):**
   - Premium: 2% for Kharif crops, 1.5% for Rabi food/oilseeds, 5% for commercial/horticultural crops.
   - Official portal: [pmfby.gov.in](https://pmfby.gov.in)
3. **Kisan Credit Card (KCC):**
   - Short-term crop loans up to ₹3 Lakh at concessional interest of 4% (with prompt repayment incentive).
4. **Soil Health Card Scheme:**
   - Free soil macro & micronutrient profiling every 2 years through your block agriculture office.

⚠️ *Security Note: Never share OTPs or pay advance registration fees to unofficial websites. Always verify on .gov.in domains or at your local Common Service Centre (CSC).*`;
  }

  if (q.includes('price') || q.includes('market') || q.includes('mandi') || q.includes('दाम') || q.includes('भाव')) {
    return `📊 **Checklist Before Selling Your Crops in the Mandi:**
1. **Check Agmarknet / e-NAM Modal Prices:** Review the last 3 days of average modal prices across your district and neighboring district APMC mandis.
2. **Compare Against MSP (Minimum Support Price):** Never accept a distress sale below the notified Central MSP for regulated foodgrains like Paddy and Wheat.
3. **Moisture Content Inspection:** Mandi commission agents deduct value for high moisture. Ensure Paddy is dried below 17% and Wheat below 12%.
4. **Transportation & Labor Deductions:** Calculate net realization: (Mandi Offer - Transport Cost - Labor/Unloading - Mandi cess). Sometimes direct buyer deals on GreenLink save 8-12% in intermediary margins.
5. **Weighment & Payment Slips:** Insist on electronic weighment and digital payments directly to your bank account or authorized APMC receipt.`;
  }

  if (q.includes('rotation') || q.includes('फसल चक्र') || q.includes('soil')) {
    if (language === 'hi' || q.includes('hindi') || q.includes('हिंदी')) {
      return `🌱 **फसल चक्र (Crop Rotation) की सरल समझ:**
फसल चक्र का अर्थ है एक ही खेत में लगातार एक ही फसल न उगाकर, अलग-अलग पोषक तत्वों वाली फसलों को क्रमबद्ध तरीके से उगाना।

**इसके मुख्य लाभ:**
1. **नाइट्रोजन की प्राकृतिक पूर्ति:** दलहनी फसलें (चना, मूंग, उड़द) अपनी जड़ों की ग्रंथियों में हवा से नाइट्रोजन संचित करती हैं, जिससे अगली फसल को कम यूरिया लगता है।
2. **कीट-रोग चक्र टूटना:** एक विशेष फसल पर लगने वाले कीट अगली फसल में भोजन न मिलने से नष्ट हो जाते हैं।
3. **मिट्टी की संरचना सुधार:** गहरी जड़ों वाली फसल के बाद उथली जड़ों वाली फसल लगाने से मिट्टी भुरभुरी और उपजाऊ बनती है।

**लोकप्रिय चक्र:**
- धान ➔ गेहूं ➔ मूंग (ग्रीष्मकालीन)
- मक्का ➔ सरसों ➔ लोबिया`;
    }
    return `🌱 **Crop Rotation Principles & Benefits:**
Crop rotation involves alternating crop families on the same plot across successive growing seasons to maintain soil vitality.

**Why it matters:**
- **Natural Nitrogen Fixation:** Leguminous crops (Moong, Urad, Gram) capture atmospheric nitrogen, reducing chemical fertilizer cost by 25-30% for the subsequent cereal.
- **Pest & Weed Disruption:** Breaking the host plant lifecycle prevents endemic soil-borne fungal pathogens from multiplying.
- **Root Zone Optimization:** Alternating deep taproot crops (like Mustard or Cotton) with shallow fibrous root crops (like Wheat) draws nutrients from different soil depths.
- **Recommended Rotation:** Paddy ➔ Wheat ➔ Summer Moong (or Green Manuring with Dhaincha).`;
  }

  if (q.includes('pest') || q.includes('कीट') || q.includes('disease') || q.includes('tomato') || q.includes('रोग')) {
    return `🐛 **General Integrated Pest Management (IPM) Advisory:**
1. **Mechanical & Biological Traps:** Install Yellow Sticky Traps (for whiteflies/aphids) and Blue Sticky Traps (for thrips) @ 15-20 traps per acre.
2. **Pheromone Traps:** For Helicoverpa (Fruit Borer) in tomato/gram, install 4-5 pheromone traps per acre for early detection.
3. **Neem-Based Sprays:** Use Neem Oil (Azadirachtin 10,000 ppm) @ 2-3 ml per litre of water during the early vegetative stage.
4. **Beneficial Predators:** Avoid prophylactic chemical sprays to preserve natural predators like ladybird beetles and spiders.
5. **Cautious Chemical Use:** Chemical intervention must only be done at Economic Threshold Level (ETL) and in consultation with your local agricultural officer. Wear protective equipment.`;
  }

  // Default helpful response
  return `👨‍🌾 **GreenLink Agriculture Advisory (Kisan Saathi):**
Thank you for your question. Here are key agricultural guidelines to keep in mind:
- **Soil Testing:** Test soil every two seasons to optimize NPK, Zinc, and Boron input costs.
- **Weather-Smart Farming:** Avoid spraying insecticides or applying nitrogen fertilizer right before expected rainfall or during high winds (>15 km/h).
- **Direct Marketplace:** Use the GreenLink Marketplace to list your harvest directly to verified buyers, avoiding middlemen commissions.
- **Scheme Assistance:** Check our Government Schemes tab to verify eligibility for PM-KISAN, PMFBY, and Kisan Credit Card.

💬 *Feel free to ask about specific crops (Wheat, Rice, Tomato, Onion, Mustard), government schemes, pest management, or market price guidance!*`;
}

// Server-side AI chat endpoint with Gemini API & intelligent fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({});
        
        const systemInstruction = `You are "Kisan Saathi" (Farmer's Friend), the AI Agricultural Assistant inside the GreenLink Platform (developed by Team HackForge for Hackoverflow 10.0, NIT Durgapur).
Your purpose is to provide clear, actionable, simple, and cautious agricultural guidance to Indian farmers and agribusinesses.

Key instructions:
1. Support both English, Hindi, and Hinglish. Answer in the language the farmer asked in (or Hindi if requested).
2. Keep explanations simple, respectful, and free of overly academic jargon.
3. When discussing crop practices, specify seasons (Kharif, Rabi, Zaid), sowing times, seed treatment, irrigation stages, and organic/IPM practices.
4. When discussing government schemes, refer to official portals (pmkisan.gov.in, pmfby.gov.in, enam.gov.in). Do NOT invent benefits, deadlines, or approvals.
5. When discussing prices, emphasize comparing APMC Mandi rates, MSP (Minimum Support Price), moisture levels, and using the GreenLink marketplace.
6. CAUTION & SAFETY: Never prescribe dangerous chemical dosages or guarantee disease cures without lab verification. Always encourage consulting the local Krishi Vigyan Kendra (KVK) or Agriculture Extension Officer.
7. Format with clean bullet points and clear emojis. Disclose gently that advice is general and AI-generated.`;

        // Format history for Gemini SDK if provided
        const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
        
        for (const item of history.slice(-6)) {
          formattedContents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
        
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        // Timeout promise to ensure snappy responses
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
        );

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.4,
          },
        });

        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        const replyText = response.text || 'Unable to generate response. Please try again.';

        return res.json({
          reply: replyText,
          source: 'gemini-3.8-flash',
          isLiveAI: true,
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed or rate-limited, falling back to agriculture knowledge engine:', geminiError?.message || geminiError);
        // Fall back seamlessly to agricultural knowledge base
        const fallback = getAgriculturalFallbackResponse(message, language);
        return res.json({
          reply: fallback,
          source: 'greenlink-knowledge-engine',
          isLiveAI: false,
          fallbackReason: 'API key not configured or temporarily unreachable. Using built-in Kisan Saathi agricultural repository.',
        });
      }
    } else {
      // No active external API key: use high quality built-in Kisan Saathi knowledge engine
      const fallback = getAgriculturalFallbackResponse(message, language);
      return res.json({
        reply: fallback,
        source: 'greenlink-knowledge-engine',
        isLiveAI: false,
        fallbackReason: 'Built-in Kisan Saathi agricultural repository. Set GEMINI_API_KEY in environment for live Gemini 3.8 Flash model.',
      });
    }
  } catch (err: any) {
    console.error('Server error handling /api/chat:', err);
    res.status(500).json({ error: 'Internal server error processing agricultural query' });
  }
});

// EJS Server-Side Rendered Route for Mandi Produce Trade Receipt
app.get('/trade-receipt/:id', (req, res) => {
  const cropId = req.params.id;
  const crop = INITIAL_CROPS.find((c) => c.id === cropId) || INITIAL_CROPS[0];
  
  res.render('trade_receipt', {
    title: `Mandi Trade Receipt - ${crop.cropName}`,
    receiptId: 'GL-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    crop,
    buyer: {
      name: 'Anita Sharma',
      company: 'AgriFoods Processing & Wholesale Ltd',
      district: 'New Delhi',
      state: 'Delhi',
    },
    quantity: crop.quantityKg,
    pricePerKg: crop.expectedPricePerKg,
  });
});

// EJS Server-Side Rendered Route for College Project Report & Academic Spec
app.get('/college-project-report', (req, res) => {
  res.render('project_report');
});

// RESTful API endpoints (Node.js + Express backend)
app.get('/api/crops', (req, res) => {
  res.json({
    success: true,
    count: INITIAL_CROPS.length,
    data: INITIAL_CROPS,
  });
});

app.get('/api/schemes', (req, res) => {
  res.json({
    success: true,
    count: GOVERNMENT_SCHEMES.length,
    data: GOVERNMENT_SCHEMES,
  });
});

app.get('/api/prices', (req, res) => {
  res.json({
    success: true,
    count: MARKET_PRICE_DATA.length,
    data: MARKET_PRICE_DATA,
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GreenLink Full-Stack Server',
    environment: isProduction ? 'production' : 'development',
    time: new Date().toISOString(),
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GreenLink Full-Stack server running at http://0.0.0.0:${port}`);
  });
}

startServer();
