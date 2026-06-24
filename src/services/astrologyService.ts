export interface DailyInsight {
  fortune: number;
  love: number;
  career: number;
  element: string;
  compatible: string[];
  incompatible: string[];
  do: string;
  dont: string;
  moonPhase: string;
  horoscope: string;
  planetaryPositions?: { planet: string; sign: string; details: string }[];
}

export interface BirthChartInsight {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  rulingPlanet: string;
  analysis: string;
  elements: { fire: number; earth: number; air: number; water: number };
}

export interface MoonPhaseEvent {
  date: string;
  phase: string;
  significance: string;
  zodiacSign: string;
}

export async function getDailyHoroscope(sign: string): Promise<DailyInsight> {
  try {
    const response = await fetch('/api/daily-horoscope', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sign }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Fallback to mock daily horoscope due to missing API key or network error.');
    return getMockData(sign);
  }
}

export async function getBirthChartAnalysis(name: string, date: string, time: string, location: string): Promise<BirthChartInsight> {
  try {
    const response = await fetch('/api/birth-chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, time, location }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Fallback: Unable to fetch birth chart analysis.');
    throw new Error("Unable to analyze chart at this time.");
  }
}

export async function getMoonPhaseCalendar(month: string, year: number): Promise<MoonPhaseEvent[]> {
  try {
    const response = await fetch('/api/moon-calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, year }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Fallback: Unable to fetch moon calendar.');
    throw new Error("Unable to generate moon calendar at this time.");
  }
}

function getMockData(sign: string): DailyInsight {
  return {
    fortune: 85,
    love: 90,
    career: 75,
    element: "Fire",
    compatible: ["Leo", "Sagittarius"],
    incompatible: ["Cancer", "Capricorn"],
    do: "Take risks",
    dont: "Overthink things",
    moonPhase: "Waxing Crescent",
    horoscope: `Today is a powerful day for ${sign}. The cosmic alignments are in your favor, bringing unexpected opportunities. Trust your intuition and don't be afraid to take the lead.`,
    planetaryPositions: [
      { planet: "Mars", sign: "Aries", details: "Drive and energy are heightened." },
      { planet: "Venus", sign: "Taurus", details: "A focus on comfort and relationships." },
      { planet: "Mercury", sign: "Gemini", details: "Communication flows effortlessly." }
    ]
  };
}

