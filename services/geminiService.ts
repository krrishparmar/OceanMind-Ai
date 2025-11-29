import { GoogleGenAI, Type } from "@google/genai";
import { StakeholderView } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Dynamic Data Generation ---

export const fetchDashboardData = async (lat: number, lng: number) => {
  if (!apiKey) {
    console.error("No API Key");
    return null;
  }

  const prompt = `Generate a realistic JSON snapshot of ocean conditions for location Latitude ${lat}, Longitude ${lng}.
  Include:
  1. 6 key metrics (temperature, pH, dissolvedOxygen, salinity, turbidity, plasticIndex).
  2. 3 active alerts (mix of oil spills, coral bleaching, or algae).
  3. A short executive summary string.
  
  The data should be scientific and realistic for the current year.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            metrics: {
              type: Type.OBJECT,
              properties: {
                temperature: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
                phLevel: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
                dissolvedOxygen: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
                salinity: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
                turbidity: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
                plasticIndex: { type: Type.OBJECT, properties: { value: {type: Type.NUMBER}, unit: {type: Type.STRING}, trend: {type: Type.STRING}, status: {type: Type.STRING} } },
              }
            },
            alerts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  location: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  status: { type: Type.STRING }
                }
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to generate dashboard data", e);
    // Fallback if API fails
    return null;
  }
};

export const fetchAnalysisData = async (metricType: string) => {
    if (!apiKey) return [];
    
    const prompt = `Generate a JSON array of 24 hourly data points (00:00 to 23:00) representing a ${metricType} trend in a marine environment. Include timestamp and value.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            time: { type: Type.STRING },
                            value: { type: Type.NUMBER },
                            secondaryValue: { type: Type.NUMBER }
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text || '[]');
    } catch (e) {
        console.error(e);
        return [];
    }
}

// --- Text Generation ---

export const generateOceanInsight = async (
  stakeholder: StakeholderView,
  metrics: any,
  alerts: any[]
): Promise<string> => {
  if (!apiKey) return "System initialization: API Key required for Neural Engine analysis.";

  const prompt = `
    You are OceanMind AI.
    Role: ${stakeholder}
    Data: ${JSON.stringify(metrics)}
    Alerts: ${JSON.stringify(alerts)}
    
    Provide a 1-sentence strategic insight.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Data processing complete.";
  } catch (error) {
    return "Analysis unavailable.";
  }
};

export const chatWithOceanMind = async (history: {role: string, text: string}[], message: string): Promise<string> => {
    if (!apiKey) return "API Key missing.";

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are OceanMind AI, a modern marine data assistant. Be concise, professional, and data-driven."
            },
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
        });

        const result = await chat.sendMessage({ message });
        return result.text || "No response.";
    } catch (error) {
        return "Connection error.";
    }
}