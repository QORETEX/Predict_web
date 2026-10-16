"use client";

import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Trophy,
  Users,
  TrendingUp,
  Target,
  CircleDot,
  Timer,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MarketTab =
  | "1X2"
  | "Over/Under"
  | "Both Teams to Score"
  | "Correct Score"
  | "Double Chance"
  | "First Goal";

interface OddsOption {
  label: string;
  value: number;
  sublabel: string;
}

interface MatchStat {
  label: string;
  home: number;
  away: number;
}

interface KeyEvent {
  minute: number;
  type: "goal" | "yellow" | "red" | "sub";
  player: string;
  team: "home" | "away";
}

interface EventData {
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  isLive: boolean;
  venue: string;
  date: string;
  homeForm: ("W" | "L" | "D")[];
  awayForm: ("W" | "L" | "D")[];
  matchStats: MatchStat[];
  keyEvents: KeyEvent[];
  oddsMap: Record<MarketTab, OddsOption[]>;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildOddsMap(
  home: string,
  away: string,
  h: number,
  d: number,
  a: number
): Record<MarketTab, OddsOption[]> {
  return {
    "1X2": [
      { label: home, value: h, sublabel: "Home" },
      { label: "Draw", value: d, sublabel: "Draw" },
      { label: away, value: a, sublabel: "Away" },
    ],
    "Over/Under": [
      { label: "Over 2.5", value: +(1.7 + Math.random() * 0.4).toFixed(2), sublabel: "Goals" },
      { label: "Under 2.5", value: +(1.8 + Math.random() * 0.4).toFixed(2), sublabel: "Goals" },
    ],
    "Both Teams to Score": [
      { label: "Yes", value: +(1.5 + Math.random() * 0.3).toFixed(2), sublabel: "BTTS" },
      { label: "No", value: +(2.0 + Math.random() * 0.3).toFixed(2), sublabel: "BTTS" },
    ],
    "Correct Score": [
      { label: "2-1", value: 8.5, sublabel: home },
      { label: "2-2", value: 11.0, sublabel: "Draw" },
      { label: "1-2", value: 12.5, sublabel: away },
      { label: "3-1", value: 14.0, sublabel: home },
      { label: "1-1", value: 6.5, sublabel: "Draw" },
      { label: "0-1", value: 9.0, sublabel: away },
    ],
    "Double Chance": [
      { label: "Home or Draw", value: +(1.1 + Math.random() * 0.2).toFixed(2), sublabel: "1X" },
      { label: "Away or Draw", value: +(1.6 + Math.random() * 0.3).toFixed(2), sublabel: "X2" },
      { label: "Home or Away", value: +(1.1 + Math.random() * 0.2).toFixed(2), sublabel: "12" },
    ],
    "First Goal": [
      { label: home, value: +(1.4 + Math.random() * 0.3).toFixed(2), sublabel: "First Goal" },
      { label: away, value: +(2.1 + Math.random() * 0.5).toFixed(2), sublabel: "First Goal" },
      { label: "No Goal", value: 12.0, sublabel: "None" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Event data map                                                     */
/* ------------------------------------------------------------------ */

const eventDataMap: Record<string, EventData> = {
  /* ---- Football ---- */
  "football-mancity-arsenal": {
    competition: "Premier League",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    minute: 65,
    isLive: true,
    venue: "Etihad Stadium, Manchester",
    date: "Oct 17, 2026 · 15:00 GMT",
    homeForm: ["W", "W", "D", "W", "L"],
    awayForm: ["W", "L", "W", "W", "D"],
    matchStats: [
      { label: "Possession", home: 58, away: 42 },
      { label: "Shots", home: 14, away: 9 },
      { label: "Shots on Target", home: 6, away: 4 },
      { label: "Corners", home: 7, away: 3 },
      { label: "Fouls", home: 8, away: 12 },
    ],
    keyEvents: [
      { minute: 23, type: "goal", player: "Haaland", team: "home" },
      { minute: 45, type: "goal", player: "De Bruyne", team: "home" },
      { minute: 52, type: "goal", player: "Saka", team: "away" },
      { minute: 61, type: "yellow", player: "Rodri", team: "home" },
    ],
    oddsMap: buildOddsMap("Man City", "Arsenal", 1.72, 3.95, 4.2),
  },

  "football-liverpool-chelsea": {
    competition: "Premier League",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    homeScore: 3,
    awayScore: 2,
    minute: 78,
    isLive: true,
    venue: "Anfield, Liverpool",
    date: "Oct 17, 2026 · 17:30 GMT",
    homeForm: ["W", "W", "W", "D", "W"],
    awayForm: ["W", "L", "D", "W", "L"],
    matchStats: [
      { label: "Possession", home: 52, away: 48 },
      { label: "Shots", home: 16, away: 11 },
      { label: "Shots on Target", home: 7, away: 5 },
      { label: "Corners", home: 6, away: 5 },
      { label: "Fouls", home: 10, away: 9 },
    ],
    keyEvents: [
      { minute: 12, type: "goal", player: "Salah", team: "home" },
      { minute: 28, type: "goal", player: "Palmer", team: "away" },
      { minute: 41, type: "goal", player: "Diaz", team: "home" },
      { minute: 55, type: "yellow", player: "Caicedo", team: "away" },
      { minute: 67, type: "goal", player: "Gakpo", team: "home" },
      { minute: 72, type: "goal", player: "Jackson", team: "away" },
    ],
    oddsMap: buildOddsMap("Liverpool", "Chelsea", 1.65, 3.80, 5.0),
  },

  "football-manutd-tottenham": {
    competition: "Premier League",
    homeTeam: "Man United",
    awayTeam: "Tottenham",
    homeScore: 1,
    awayScore: 1,
    minute: 54,
    isLive: true,
    venue: "Old Trafford, Manchester",
    date: "Oct 18, 2026 · 14:00 GMT",
    homeForm: ["D", "W", "L", "W", "D"],
    awayForm: ["W", "W", "L", "D", "W"],
    matchStats: [
      { label: "Possession", home: 45, away: 55 },
      { label: "Shots", home: 8, away: 12 },
      { label: "Shots on Target", home: 3, away: 5 },
      { label: "Corners", home: 4, away: 6 },
      { label: "Fouls", home: 11, away: 7 },
    ],
    keyEvents: [
      { minute: 18, type: "goal", player: "Son", team: "away" },
      { minute: 33, type: "yellow", player: "Casemiro", team: "home" },
      { minute: 44, type: "goal", player: "Hojlund", team: "home" },
    ],
    oddsMap: buildOddsMap("Man United", "Tottenham", 2.40, 3.50, 2.90),
  },

  "football-realmadrid-barcelona": {
    competition: "La Liga",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 2,
    awayScore: 2,
    minute: 82,
    isLive: true,
    venue: "Santiago Bernabéu, Madrid",
    date: "Oct 18, 2026 · 20:00 CET",
    homeForm: ["W", "W", "W", "D", "W"],
    awayForm: ["W", "W", "L", "W", "W"],
    matchStats: [
      { label: "Possession", home: 47, away: 53 },
      { label: "Shots", home: 15, away: 13 },
      { label: "Shots on Target", home: 7, away: 6 },
      { label: "Corners", home: 5, away: 7 },
      { label: "Fouls", home: 14, away: 11 },
    ],
    keyEvents: [
      { minute: 15, type: "goal", player: "Vinicius Jr", team: "home" },
      { minute: 29, type: "goal", player: "Lewandowski", team: "away" },
      { minute: 56, type: "goal", player: "Yamal", team: "away" },
      { minute: 68, type: "red", player: "Gavi", team: "away" },
      { minute: 74, type: "goal", player: "Bellingham", team: "home" },
    ],
    oddsMap: buildOddsMap("Real Madrid", "Barcelona", 2.10, 3.60, 3.30),
  },

  "football-juventus-inter": {
    competition: "Serie A",
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    homeScore: 0,
    awayScore: 1,
    minute: 37,
    isLive: true,
    venue: "Allianz Stadium, Turin",
    date: "Oct 19, 2026 · 18:00 CET",
    homeForm: ["D", "W", "W", "L", "D"],
    awayForm: ["W", "W", "W", "D", "W"],
    matchStats: [
      { label: "Possession", home: 44, away: 56 },
      { label: "Shots", home: 5, away: 8 },
      { label: "Shots on Target", home: 1, away: 4 },
      { label: "Corners", home: 2, away: 5 },
      { label: "Fouls", home: 9, away: 6 },
    ],
    keyEvents: [
      { minute: 22, type: "goal", player: "Lautaro", team: "away" },
      { minute: 30, type: "yellow", player: "Vlahovic", team: "home" },
    ],
    oddsMap: buildOddsMap("Juventus", "Inter Milan", 2.60, 3.20, 2.70),
  },

  "football-bayern-dortmund": {
    competition: "Bundesliga",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 3,
    awayScore: 1,
    minute: 90,
    isLive: false,
    venue: "Allianz Arena, Munich",
    date: "Oct 16, 2026 · 18:30 CET",
    homeForm: ["W", "W", "W", "W", "D"],
    awayForm: ["W", "L", "W", "D", "L"],
    matchStats: [
      { label: "Possession", home: 62, away: 38 },
      { label: "Shots", home: 18, away: 7 },
      { label: "Shots on Target", home: 9, away: 3 },
      { label: "Corners", home: 8, away: 2 },
      { label: "Fouls", home: 7, away: 13 },
    ],
    keyEvents: [
      { minute: 11, type: "goal", player: "Kane", team: "home" },
      { minute: 34, type: "goal", player: "Musiala", team: "home" },
      { minute: 51, type: "goal", player: "Adeyemi", team: "away" },
      { minute: 63, type: "yellow", player: "Sule", team: "away" },
      { minute: 79, type: "goal", player: "Sane", team: "home" },
    ],
    oddsMap: buildOddsMap("Bayern Munich", "Borussia Dortmund", 1.55, 4.20, 5.50),
  },

  /* ---- Basketball ---- */
  "basketball-lakers-warriors": {
    competition: "NBA",
    homeTeam: "LA Lakers",
    awayTeam: "GS Warriors",
    homeScore: 98,
    awayScore: 102,
    minute: 4,
    isLive: true,
    venue: "Crypto.com Arena, Los Angeles",
    date: "Oct 17, 2026 · 19:30 PT",
    homeForm: ["W", "L", "W", "W", "L"],
    awayForm: ["W", "W", "L", "W", "W"],
    matchStats: [
      { label: "Field Goal %", home: 46, away: 49 },
      { label: "3-Point %", home: 35, away: 41 },
      { label: "Free Throw %", home: 78, away: 82 },
      { label: "Rebounds", home: 42, away: 38 },
      { label: "Turnovers", home: 14, away: 11 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "LeBron James", team: "home" },
      { minute: 2, type: "goal", player: "Steph Curry", team: "away" },
      { minute: 3, type: "goal", player: "Curry (3PT)", team: "away" },
      { minute: 3, type: "yellow", player: "A. Davis", team: "home" },
    ],
    oddsMap: buildOddsMap("LA Lakers", "GS Warriors", 2.10, 15.0, 1.75),
  },

  "basketball-celtics-heat": {
    competition: "NBA",
    homeTeam: "Boston Celtics",
    awayTeam: "Miami Heat",
    homeScore: 87,
    awayScore: 79,
    minute: 3,
    isLive: true,
    venue: "TD Garden, Boston",
    date: "Oct 18, 2026 · 19:00 ET",
    homeForm: ["W", "W", "W", "D", "W"],
    awayForm: ["L", "W", "L", "W", "L"],
    matchStats: [
      { label: "Field Goal %", home: 51, away: 43 },
      { label: "3-Point %", home: 39, away: 32 },
      { label: "Free Throw %", home: 85, away: 76 },
      { label: "Rebounds", home: 44, away: 36 },
      { label: "Turnovers", home: 9, away: 15 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Tatum", team: "home" },
      { minute: 2, type: "goal", player: "Butler", team: "away" },
      { minute: 2, type: "goal", player: "Brown", team: "home" },
    ],
    oddsMap: buildOddsMap("Boston Celtics", "Miami Heat", 1.45, 18.0, 2.80),
  },

  "basketball-duke-unc": {
    competition: "NCAA Basketball",
    homeTeam: "Duke",
    awayTeam: "UNC",
    homeScore: 72,
    awayScore: 68,
    minute: 2,
    isLive: true,
    venue: "Cameron Indoor Stadium, Durham",
    date: "Oct 19, 2026 · 20:00 ET",
    homeForm: ["W", "W", "L", "W", "W"],
    awayForm: ["W", "L", "W", "W", "D"],
    matchStats: [
      { label: "Field Goal %", home: 48, away: 44 },
      { label: "3-Point %", home: 37, away: 34 },
      { label: "Free Throw %", home: 80, away: 74 },
      { label: "Rebounds", home: 35, away: 32 },
      { label: "Turnovers", home: 10, away: 13 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Flagg", team: "home" },
      { minute: 1, type: "goal", player: "Trimble", team: "away" },
      { minute: 2, type: "yellow", player: "Mitchell", team: "away" },
    ],
    oddsMap: buildOddsMap("Duke", "UNC", 1.80, 16.0, 2.05),
  },

  /* ---- Tennis ---- */
  "tennis-alcaraz-sinner": {
    competition: "ATP Finals",
    homeTeam: "Carlos Alcaraz",
    awayTeam: "Jannik Sinner",
    homeScore: 2,
    awayScore: 1,
    minute: 0,
    isLive: true,
    venue: "Pala Alpitour, Turin",
    date: "Oct 17, 2026 · 14:00 CET",
    homeForm: ["W", "W", "L", "W", "W"],
    awayForm: ["W", "W", "W", "L", "W"],
    matchStats: [
      { label: "Aces", home: 12, away: 9 },
      { label: "Double Faults", home: 2, away: 4 },
      { label: "1st Serve %", home: 68, away: 62 },
      { label: "Winners", home: 34, away: 28 },
      { label: "Unforced Errors", home: 18, away: 22 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Alcaraz (6-4)", team: "home" },
      { minute: 2, type: "goal", player: "Sinner (7-5)", team: "away" },
      { minute: 3, type: "goal", player: "Alcaraz (6-3)", team: "home" },
    ],
    oddsMap: buildOddsMap("Alcaraz", "Sinner", 1.85, 12.0, 1.95),
  },

  "tennis-djokovic-fritz": {
    competition: "US Open",
    homeTeam: "Novak Djokovic",
    awayTeam: "Taylor Fritz",
    homeScore: 1,
    awayScore: 0,
    minute: 0,
    isLive: true,
    venue: "Arthur Ashe Stadium, New York",
    date: "Oct 18, 2026 · 19:00 ET",
    homeForm: ["W", "W", "W", "W", "D"],
    awayForm: ["W", "L", "W", "W", "L"],
    matchStats: [
      { label: "Aces", home: 8, away: 11 },
      { label: "Double Faults", home: 1, away: 3 },
      { label: "1st Serve %", home: 72, away: 65 },
      { label: "Winners", home: 22, away: 19 },
      { label: "Unforced Errors", home: 10, away: 16 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Djokovic (7-6)", team: "home" },
    ],
    oddsMap: buildOddsMap("Djokovic", "Fritz", 1.35, 15.0, 3.20),
  },

  "tennis-medvedev-rune": {
    competition: "ATP Masters 1000",
    homeTeam: "Daniil Medvedev",
    awayTeam: "Holger Rune",
    homeScore: 1,
    awayScore: 1,
    minute: 0,
    isLive: true,
    venue: "Accor Arena, Paris",
    date: "Oct 19, 2026 · 15:00 CET",
    homeForm: ["W", "L", "W", "D", "W"],
    awayForm: ["W", "W", "L", "W", "L"],
    matchStats: [
      { label: "Aces", home: 6, away: 5 },
      { label: "Double Faults", home: 3, away: 2 },
      { label: "1st Serve %", home: 64, away: 67 },
      { label: "Winners", home: 20, away: 24 },
      { label: "Unforced Errors", home: 15, away: 17 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Rune (6-4)", team: "away" },
      { minute: 2, type: "goal", player: "Medvedev (7-5)", team: "home" },
    ],
    oddsMap: buildOddsMap("Medvedev", "Rune", 1.70, 14.0, 2.20),
  },

  /* ---- NSMQ ---- */
  "nsmq-kumasi-prempeh": {
    competition: "NSMQ 2026",
    homeTeam: "Kumasi High",
    awayTeam: "Prempeh College",
    homeScore: 42,
    awayScore: 48,
    minute: 4,
    isLive: true,
    venue: "KNUST Great Hall, Kumasi",
    date: "Oct 17, 2026 · 10:00 GMT",
    homeForm: ["W", "L", "W", "W", "D"],
    awayForm: ["W", "W", "W", "L", "W"],
    matchStats: [
      { label: "Round 1 Pts", home: 14, away: 16 },
      { label: "Round 2 Pts", home: 12, away: 15 },
      { label: "Round 3 Pts", home: 10, away: 11 },
      { label: "Riddles", home: 3, away: 4 },
      { label: "Bonuses", home: 3, away: 2 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Kumasi (Rd 1: 14pts)", team: "home" },
      { minute: 2, type: "goal", player: "Prempeh (Rd 2: 15pts)", team: "away" },
      { minute: 3, type: "goal", player: "Prempeh (Riddle bonus)", team: "away" },
    ],
    oddsMap: buildOddsMap("Kumasi High", "Prempeh College", 2.80, 5.50, 1.90),
  },

  "nsmq-aquinas-achimota": {
    competition: "NSMQ 2026",
    homeTeam: "St Thomas Aquinas",
    awayTeam: "Achimota School",
    homeScore: 51,
    awayScore: 44,
    minute: 5,
    isLive: false,
    venue: "University of Ghana, Legon",
    date: "Oct 16, 2026 · 14:00 GMT",
    homeForm: ["W", "W", "D", "W", "W"],
    awayForm: ["L", "W", "W", "L", "D"],
    matchStats: [
      { label: "Round 1 Pts", home: 16, away: 12 },
      { label: "Round 2 Pts", home: 14, away: 13 },
      { label: "Round 3 Pts", home: 12, away: 11 },
      { label: "Riddles", home: 5, away: 4 },
      { label: "Bonuses", home: 4, away: 4 },
    ],
    keyEvents: [
      { minute: 1, type: "goal", player: "Aquinas (Rd 1: 16pts)", team: "home" },
      { minute: 2, type: "goal", player: "Achimota (Rd 2: 13pts)", team: "away" },
      { minute: 3, type: "goal", player: "Aquinas (Riddle streak)", team: "home" },
      { minute: 4, type: "goal", player: "Aquinas (Rd 4: 9pts)", team: "home" },
    ],
    oddsMap: buildOddsMap("St Thomas Aquinas", "Achimota School", 1.65, 5.00, 2.40),
  },

  /* ---- Dashboard IDs (PL / UCL prefixes) ---- */
  "pl-mancity-arsenal": {
    competition: "Premier League",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    minute: 65,
    isLive: true,
    venue: "Etihad Stadium, Manchester",
    date: "Oct 17, 2026 · 15:00 GMT",
    homeForm: ["W", "W", "D", "W", "L"],
    awayForm: ["W", "L", "W", "W", "D"],
    matchStats: [
      { label: "Possession", home: 58, away: 42 },
      { label: "Shots", home: 14, away: 9 },
      { label: "Shots on Target", home: 6, away: 4 },
      { label: "Corners", home: 7, away: 3 },
      { label: "Fouls", home: 8, away: 12 },
    ],
    keyEvents: [
      { minute: 23, type: "goal", player: "Haaland", team: "home" },
      { minute: 45, type: "goal", player: "De Bruyne", team: "home" },
      { minute: 52, type: "goal", player: "Saka", team: "away" },
      { minute: 61, type: "yellow", player: "Rodri", team: "home" },
    ],
    oddsMap: buildOddsMap("Man City", "Arsenal", 1.72, 3.95, 4.2),
  },

  "pl-liverpool-chelsea": {
    competition: "Premier League",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    homeScore: 3,
    awayScore: 2,
    minute: 78,
    isLive: true,
    venue: "Anfield, Liverpool",
    date: "Oct 17, 2026 · 17:30 GMT",
    homeForm: ["W", "W", "W", "D", "W"],
    awayForm: ["W", "L", "D", "W", "L"],
    matchStats: [
      { label: "Possession", home: 52, away: 48 },
      { label: "Shots", home: 16, away: 11 },
      { label: "Shots on Target", home: 7, away: 5 },
      { label: "Corners", home: 6, away: 5 },
      { label: "Fouls", home: 10, away: 9 },
    ],
    keyEvents: [
      { minute: 12, type: "goal", player: "Salah", team: "home" },
      { minute: 28, type: "goal", player: "Palmer", team: "away" },
      { minute: 41, type: "goal", player: "Diaz", team: "home" },
      { minute: 55, type: "yellow", player: "Caicedo", team: "away" },
      { minute: 67, type: "goal", player: "Gakpo", team: "home" },
      { minute: 72, type: "goal", player: "Jackson", team: "away" },
    ],
    oddsMap: buildOddsMap("Liverpool", "Chelsea", 1.65, 3.80, 5.0),
  },

  "ucl-realmadrid-bayern": {
    competition: "UEFA Champions League",
    homeTeam: "Real Madrid",
    awayTeam: "Bayern Munich",
    homeScore: 1,
    awayScore: 0,
    minute: 42,
    isLive: true,
    venue: "Santiago Bernabéu, Madrid",
    date: "Oct 20, 2026 · 21:00 CET",
    homeForm: ["W", "W", "D", "W", "W"],
    awayForm: ["W", "W", "W", "L", "W"],
    matchStats: [
      { label: "Possession", home: 49, away: 51 },
      { label: "Shots", home: 7, away: 6 },
      { label: "Shots on Target", home: 3, away: 2 },
      { label: "Corners", home: 4, away: 3 },
      { label: "Fouls", home: 6, away: 8 },
    ],
    keyEvents: [
      { minute: 35, type: "goal", player: "Vinicius Jr", team: "home" },
      { minute: 38, type: "yellow", player: "Kimmich", team: "away" },
    ],
    oddsMap: buildOddsMap("Real Madrid", "Bayern Munich", 2.30, 3.40, 3.00),
  },

  /* ---- Other ---- */
  "other-india-australia": {
    competition: "ICC Cricket World Cup",
    homeTeam: "India",
    awayTeam: "Australia",
    homeScore: 287,
    awayScore: 241,
    minute: 42,
    isLive: true,
    venue: "Wankhede Stadium, Mumbai",
    date: "Oct 17, 2026 · 09:30 IST",
    homeForm: ["W", "W", "W", "L", "W"],
    awayForm: ["W", "L", "W", "W", "D"],
    matchStats: [
      { label: "Run Rate", home: 6, away: 5 },
      { label: "Wickets Lost", home: 6, away: 8 },
      { label: "Boundaries", home: 28, away: 21 },
      { label: "Sixes", home: 8, away: 5 },
      { label: "Extras", home: 12, away: 15 },
    ],
    keyEvents: [
      { minute: 15, type: "goal", player: "Kohli (82 runs)", team: "home" },
      { minute: 25, type: "goal", player: "Sharma (64 runs)", team: "home" },
      { minute: 30, type: "goal", player: "Starc (3 wickets)", team: "away" },
      { minute: 38, type: "yellow", player: "Warner (run out)", team: "away" },
    ],
    oddsMap: buildOddsMap("India", "Australia", 1.60, 8.00, 2.30),
  },

  "other-navi-g2": {
    competition: "ESL Pro League",
    homeTeam: "NAVI",
    awayTeam: "G2 Esports",
    homeScore: 13,
    awayScore: 10,
    minute: 23,
    isLive: true,
    venue: "Online",
    date: "Oct 17, 2026 · 16:00 CET",
    homeForm: ["W", "W", "L", "W", "W"],
    awayForm: ["L", "W", "W", "L", "W"],
    matchStats: [
      { label: "Kills", home: 45, away: 38 },
      { label: "Deaths", home: 38, away: 45 },
      { label: "Headshot %", home: 52, away: 48 },
      { label: "Clutches Won", home: 4, away: 2 },
      { label: "Flash Assists", home: 11, away: 8 },
    ],
    keyEvents: [
      { minute: 5, type: "goal", player: "s1mple (Ace)", team: "home" },
      { minute: 12, type: "goal", player: "NiKo (1v3 clutch)", team: "away" },
      { minute: 18, type: "goal", player: "b1t (4K)", team: "home" },
    ],
    oddsMap: buildOddsMap("NAVI", "G2 Esports", 1.70, 12.0, 2.15),
  },
};

/* ------------------------------------------------------------------ */
/*  Data lookup                                                        */
/* ------------------------------------------------------------------ */

const defaultEventData = eventDataMap["football-mancity-arsenal"];

function getEventData(id: string): EventData {
  return eventDataMap[id] ?? defaultEventData;
}

function getBackLink(id: string): { href: string; label: string } {
  const prefix = id.split("-")[0];
  switch (prefix) {
    case "football":
      return { href: "/football", label: "Back to Football" };
    case "basketball":
      return { href: "/basketball", label: "Back to Basketball" };
    case "tennis":
      return { href: "/tennis", label: "Back to Tennis" };
    case "nsmq":
      return { href: "/nsmq", label: "Back to NSMQ" };
    case "pl":
    case "ucl":
      return { href: "/football", label: "Back to Football" };
    default:
      return { href: "/live", label: "Back to Events" };
  }
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const marketTabs: MarketTab[] = [
  "1X2",
  "Over/Under",
  "Both Teams to Score",
  "Correct Score",
  "Double Chance",
  "First Goal",
];

const stakePresets = [50, 100, 200, 500];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-500">
      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function TeamAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2747] text-lg font-bold text-white">
      {initials}
    </div>
  );
}

function FormBadge({ result }: { result: "W" | "L" | "D" }) {
  const styles = {
    W: "bg-[#22C55E]/15 text-[#22C55E]",
    L: "bg-[#F43F5E]/15 text-[#F43F5E]",
    D: "bg-[#AAB5D0]/15 text-[#AAB5D0]",
  };
  return (
    <span
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded text-xs font-bold",
        styles[result]
      )}
    >
      {result}
    </span>
  );
}

function StatBar({
  stat,
}: {
  stat: MatchStat;
}) {
  const total = stat.home + stat.away;
  const homePct = Math.round((stat.home / total) * 100);
  const awayPct = 100 - homePct;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white">{stat.home}</span>
        <span className="text-[#AAB5D0]">{stat.label}</span>
        <span className="font-semibold text-white">{stat.away}</span>
      </div>
      <div className="flex h-1.5 gap-1 overflow-hidden rounded-full">
        <div
          className="rounded-full bg-[#603BFF] transition-all"
          style={{ width: `${homePct}%` }}
        />
        <div
          className="rounded-full bg-[#FBBF24] transition-all"
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}

function EventIcon({ type }: { type: KeyEvent["type"] }) {
  switch (type) {
    case "goal":
      return <CircleDot className="h-4 w-4 text-[#22C55E]" />;
    case "yellow":
      return (
        <div className="flex h-4 w-4 items-center justify-center">
          <div className="h-3 w-2 rounded-[1px] bg-[#FBBF24]" />
        </div>
      );
    case "red":
      return (
        <div className="flex h-4 w-4 items-center justify-center">
          <div className="h-3 w-2 rounded-[1px] bg-[#F43F5E]" />
        </div>
      );
    case "sub":
      return <AlertCircle className="h-4 w-4 text-[#AAB5D0]" />;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function EventDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const event = getEventData(id);
  const backLink = getBackLink(id);

  const [activeMarket, setActiveMarket] = useState<MarketTab>("1X2");
  const [selectedOdds, setSelectedOdds] = useState<string | null>(null);
  const [stake, setStake] = useState<number>(100);
  const [pickPlaced, setPickPlaced] = useState(false);

  const handlePlacePick = () => {
    // Simulate placing the pick
    setPickPlaced(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setPickPlaced(false);
      setSelectedOdds(null);
      setStake(100);
    }, 3000);
  };

  const currentOdds = event.oddsMap[activeMarket];
  const selectedOddsValue = currentOdds.find(
    (o) => o.label === selectedOdds
  )?.value;
  const potentialReturn = selectedOddsValue
    ? (stake * selectedOddsValue).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-5">
      {/* Success notification */}
      {pickPlaced && (
        <div className="rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#22C55E]">
                Pick placed successfully!
              </p>
              <p className="text-xs text-[#AAB5D0]">
                {stake} TKN on {selectedOdds} · Potential return: {potentialReturn} TKN
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Back Navigation                                              */}
      {/* ============================================================ */}
      <Link
        href={backLink.href}
        className="inline-flex items-center gap-2 text-sm text-[#AAB5D0] transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLink.label}
      </Link>

      {/* ============================================================ */}
      {/*  Match Header Card                                            */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        {/* Competition + Live Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Trophy className="h-4 w-4 text-[#FBBF24]" />
            </div>
            <span className="text-sm font-medium text-[#AAB5D0]">
              {event.competition}
            </span>
          </div>
          {event.isLive ? (
            <LiveBadge />
          ) : (
            <span className="inline-flex items-center rounded-full bg-[#AAB5D0]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#AAB5D0]">
              FT
            </span>
          )}
        </div>

        {/* Teams + Score */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-10">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2">
            <TeamAvatar name={event.homeTeam} />
            <span className="text-base font-semibold text-white">
              {event.homeTeam}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">{event.homeScore}</span>
              <span className="text-2xl font-medium text-[#AAB5D0]">-</span>
              <span className="text-4xl font-bold text-white">{event.awayScore}</span>
            </div>
            {event.isLive && (
              <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-[#FBBF24]" />
                <span className="text-sm font-bold text-[#FBBF24]">{event.minute}&apos;</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2">
            <TeamAvatar name={event.awayTeam} />
            <span className="text-base font-semibold text-white">
              {event.awayTeam}
            </span>
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#AAB5D0]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {event.venue}
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Market Tabs                                                  */}
      {/* ============================================================ */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {marketTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveMarket(tab);
              setSelectedOdds(null);
            }}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              activeMarket === tab
                ? "bg-[#603BFF] text-white"
                : "bg-[#0C1532] text-[#AAB5D0] hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Odds Grid                                                    */}
      {/* ============================================================ */}
      <div
        className={cn(
          "grid gap-3",
          currentOdds.length <= 3
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3"
        )}
      >
        {currentOdds.map((odds) => {
          const isSelected = selectedOdds === odds.label;
          return (
            <button
              key={odds.label}
              type="button"
              onClick={() =>
                setSelectedOdds(isSelected ? null : odds.label)
              }
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-4 transition-all",
                isSelected
                  ? "bg-[#603BFF] border border-[#603BFF] text-white"
                  : "bg-[#0F1A36] text-white hover:border hover:border-[#23315A]"
              )}
            >
              <span className="text-xs text-[#AAB5D0]">
                {odds.sublabel}
              </span>
              <span className="text-lg font-bold">{odds.label}</span>
              <span
                className={cn(
                  "text-2xl font-bold",
                  isSelected ? "text-white" : "text-[#FBBF24]"
                )}
              >
                {odds.value.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  Place Pick Section                                           */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <h3 className="text-sm font-semibold text-white">Place Your Pick</h3>

        {/* Stake input */}
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={stake}
              onChange={(e) =>
                setStake(Math.max(0, Number(e.target.value)))
              }
              className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 pr-14 text-sm font-medium text-white outline-none focus:border-[#603BFF]"
              placeholder="Stake amount"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#AAB5D0]">
              TKN
            </span>
          </div>
        </div>

        {/* Preset buttons */}
        <div className="mt-3 flex gap-2">
          {stakePresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setStake(preset)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                stake === preset
                  ? "bg-[#603BFF] text-white"
                  : "bg-[#0C1532] text-[#AAB5D0] hover:text-white"
              )}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Return + Button */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#AAB5D0]">Potential Return</p>
            <p className="text-lg font-bold text-white">
              {potentialReturn}{" "}
              <span className="text-xs font-normal text-[#AAB5D0]">TKN</span>
            </p>
          </div>
          <Button
            onClick={handlePlacePick}
            disabled={!selectedOdds || stake <= 0 || pickPlaced}
            className="h-11 bg-[#22C55E] px-8 text-sm font-bold text-white hover:bg-[#1EAD52] disabled:opacity-40"
          >
            {pickPlaced ? "Pick Placed! ✓" : "Place Pick"}
          </Button>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Two-column layout                                            */}
      {/* ============================================================ */}
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Match Stats */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Target className="h-4 w-4 text-[#FBBF24]" />
              Match Stats
            </h3>
            <div className="mt-4 space-y-4">
              {event.matchStats.map((stat) => (
                <StatBar key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Recent Form */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <h3 className="text-sm font-semibold text-white">Recent Form</h3>
            <div className="mt-4 space-y-4">
              {/* Home */}
              <div className="flex items-center justify-between">
                <span className="w-20 truncate text-sm font-medium text-white">
                  {event.homeTeam}
                </span>
                <div className="flex gap-1.5">
                  {event.homeForm.map((r, i) => (
                    <FormBadge key={i} result={r} />
                  ))}
                </div>
              </div>
              {/* Away */}
              <div className="flex items-center justify-between">
                <span className="w-20 truncate text-sm font-medium text-white">
                  {event.awayTeam}
                </span>
                <div className="flex gap-1.5">
                  {event.awayForm.map((r, i) => (
                    <FormBadge key={i} result={r} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column (380px) */}
        <div className="space-y-5">
          {/* Pool Info */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <TrendingUp className="h-4 w-4 text-[#22C55E]" />
              Pool Info
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
                <span className="text-xs text-[#AAB5D0]">Total Pool</span>
                <span className="text-sm font-bold text-white">
                  245,700{" "}
                  <span className="text-xs font-normal text-[#AAB5D0]">
                    TKN
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
                <span className="text-xs text-[#AAB5D0]">Predictors</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <Users className="h-3.5 w-3.5 text-[#AAB5D0]" />
                  1,247
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
                <span className="text-xs text-[#AAB5D0]">
                  Live Multiplier
                </span>
                <span className="text-sm font-bold text-[#22C55E]">
                  1.96x
                </span>
              </div>
            </div>
          </div>

          {/* Key Events Timeline */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <h3 className="text-sm font-semibold text-white">Key Events</h3>
            <div className="mt-4 space-y-0">
              {event.keyEvents.map((evt, idx) => (
                <div key={idx} className="flex gap-3">
                  {/* Timeline rail */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C1532]">
                      <EventIcon type={evt.type} />
                    </div>
                    {idx < event.keyEvents.length - 1 && (
                      <div className="w-px flex-1 bg-[#23315A]" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#FBBF24]">
                        {evt.minute}&apos;
                      </span>
                      <span className="text-sm font-medium text-white">
                        {evt.type === "goal" && "Goal"}
                        {evt.type === "yellow" && "Yellow Card"}
                        {evt.type === "red" && "Red Card"}
                        {evt.type === "sub" && "Substitution"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#AAB5D0]">
                      {evt.player} &middot;{" "}
                      {evt.team === "home" ? event.homeTeam : event.awayTeam}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <EventDetailContent />
    </Suspense>
  );
}
