/**
 * React hook for VibeConnect API integration
 * Falls back to mock data when API is unavailable
 */

import { useState, useEffect, useCallback } from 'react';
import vibeConnectAPI from './vibeconnect';

// Mock data fallback for development/demo
const MOCK_EVENTS = [
  {
    id: 1,
    name: "Underground Wednesdays @ Basement",
    date: "2026-02-05",
    time: "10:00 PM",
    location: "Brooklyn, NY",
    artist: "DJ Velvet",
    genre: "Deep House",
    vibe: "deep",
    attendees: 47,
    exclusiveDrop: {
      title: "Velvet - Midnight Theory (Unreleased)",
      unlockType: "attend",
      claimed: false
    },
    vibeScore: 94,
    description: "Intimate basement vibes with deep, hypnotic house sets"
  },
  {
    id: 2,
    name: "Friday Frequencies @ The Loft",
    date: "2026-02-07",
    time: "11:30 PM",
    location: "Manhattan, NY",
    artist: "STATIC",
    genre: "Techno",
    vibe: "energetic",
    attendees: 89,
    exclusiveDrop: {
      title: "STATIC - Signal Loss EP (Event Only)",
      unlockType: "attend",
      claimed: false
    },
    vibeScore: 88,
    description: "High-energy techno marathon until sunrise"
  },
  {
    id: 3,
    name: "Sunday Sessions @ Rooftop Garden",
    date: "2026-02-09",
    time: "4:00 PM",
    location: "Queens, NY",
    artist: "Lunar Collective",
    genre: "Ambient / Experimental",
    vibe: "chill",
    attendees: 32,
    exclusiveDrop: {
      title: "Lunar Collective - Garden State (Live Recording)",
      unlockType: "attend",
      claimed: false
    },
    vibeScore: 91,
    description: "Sunset ambient soundscapes with live instrumentation"
  }
];

export function useEvents(location = null) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await vibeConnectAPI.getUpcomingEvents(location);
        setEvents(data);
        setIsUsingMockData(false);
      } catch (err) {
        console.warn('Failed to fetch events from API, using mock data:', err);
        setEvents(MOCK_EVENTS);
        setIsUsingMockData(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [location]);

  return { events, loading, error, isUsingMockData };
}

export function useEventRSVP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rsvp = useCallback(async (eventId, walletAddress) => {
    try {
      setLoading(true);
      setError(null);
      const result = await vibeConnectAPI.rsvpToEvent(eventId, walletAddress);
      return result;
    } catch (err) {
      setError(err.message);
      // Return mock success for demo
      console.warn('RSVP API failed, returning mock success');
      return { success: true, message: 'RSVP confirmed (demo mode)' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { rsvp, loading, error };
}

export function useEventCheckIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkIn = useCallback(async (eventId, walletAddress, location) => {
    try {
      setLoading(true);
      setError(null);
      const result = await vibeConnectAPI.checkInToEvent(eventId, walletAddress, location);
      return result;
    } catch (err) {
      setError(err.message);
      // Return mock success for demo
      console.warn('Check-in API failed, returning mock success');
      return {
        success: true,
        message: 'Checked in! Exclusive drop unlocked (demo mode)',
        drop_unlocked: true
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return { checkIn, loading, error };
}

export function useMatches(walletAddress) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false);
      return;
    }

    async function fetchMatches() {
      try {
        setLoading(true);
        const data = await vibeConnectAPI.getMatches(walletAddress);
        setMatches(data);
      } catch (err) {
        console.warn('Failed to fetch matches:', err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [walletAddress]);

  return { matches, loading, error };
}

export function useLeaderboard(eventId = null) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const data = await vibeConnectAPI.getLeaderboard(eventId, 10);
        setLeaderboard(data);
      } catch (err) {
        console.warn('Failed to fetch leaderboard:', err);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [eventId]);

  return { leaderboard, loading };
}

// Connection status indicator
export function useConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Simple health check - try to hit any endpoint
        await vibeConnectAPI.getEvents();
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    }

    checkConnection();
  }, []);

  return { isConnected, checking };
}
