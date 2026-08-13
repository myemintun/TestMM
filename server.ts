import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client if key is available
  const getGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Itinerary Generation Endpoint
  app.post("/api/generate-itinerary", async (req, res) => {
    try {
      const { destination, days = 3, budget = "moderate", interests = "sightseeing, food, culture" } = req.body;

      if (!destination) {
        return res.status(400).json({ error: "Destination is required" });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not present
        return res.json({
          fallback: true,
          itinerary: {
            title: `${days}-Day Trip to ${destination}`,
            destination,
            days: Array.from({ length: Number(days) }, (_, i) => ({
              dayNumber: i + 1,
              title: `Day ${i + 1}: Exploring ${destination}`,
              activities: [
                {
                  time: "09:00 AM",
                  title: `Morning Highlights in ${destination}`,
                  category: "Sightseeing",
                  cost: budget === "luxury" ? "$80" : "$25",
                  description: `Start your day at the iconic historic center of ${destination}.`,
                  location: `${destination} City Center`,
                  lat: 35.6762 + (i * 0.01),
                  lng: 139.6503 + (i * 0.01)
                },
                {
                  time: "12:30 PM",
                  title: `Local Culinary Experience`,
                  category: "Dining",
                  cost: budget === "luxury" ? "$120" : "$30",
                  description: `Enjoy authentic local cuisine at a top-rated dining spot.`,
                  location: `${destination} Gourmet Lane`,
                  lat: 35.6800 + (i * 0.01),
                  lng: 139.6600 + (i * 0.01)
                },
                {
                  time: "03:00 PM",
                  title: `Cultural & Leisure Discovery`,
                  category: "Culture",
                  cost: "$15",
                  description: `Immerse yourself in museums and scenic parks.`,
                  location: `${destination} Cultural District`,
                  lat: 35.6700 + (i * 0.01),
                  lng: 139.6400 + (i * 0.01)
                }
              ]
            }))
          }
        });
      }

      const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}.
Budget level: ${budget}.
Interests: ${interests}.

Respond ONLY with valid JSON in the following format:
{
  "title": "${days}-Day ${destination} Adventure",
  "destination": "${destination}",
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Title",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "Activity Name",
          "category": "Sightseeing | Dining | Shopping | Culture | Transport",
          "cost": "$25",
          "description": "Short vivid description",
          "location": "Specific location name",
          "lat": 35.6762,
          "lng": 139.6503
        }
      ]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const jsonText = response.text || "";
      const parsed = JSON.parse(jsonText);
      res.json({ success: true, itinerary: parsed });
    } catch (err: any) {
      console.error("Error generating AI itinerary:", err);
      res.status(500).json({ error: "Failed to generate itinerary", details: err?.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
