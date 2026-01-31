/**
 * VibeConnect API Integration Layer
 * Connects CentralStatic to the VibeConnect backend for events, matches, and connections
 */

const API_BASE_URL = process.env.REACT_APP_VIBECONNECT_API_URL || 'https://vibeconnect-production.up.railway.app';

class VibeConnectAPI {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`VibeConnect API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ============ EVENTS ============
  async getEvents(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/api/events${params ? `?${params}` : ''}`);
  }

  async getEventById(eventId) {
    return this.request(`/api/events/${eventId}`);
  }

  async getUpcomingEvents(location = null) {
    const params = location ? `?location=${encodeURIComponent(location)}` : '';
    return this.request(`/api/events/upcoming${params}`);
  }

  async rsvpToEvent(eventId, walletAddress) {
    return this.request(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
  }

  async checkInToEvent(eventId, walletAddress, location) {
    return this.request(`/api/events/${eventId}/checkin`, {
      method: 'POST',
      body: JSON.stringify({
        wallet_address: walletAddress,
        location: location
      }),
    });
  }

  // ============ MATCHES ============
  async getMatches(walletAddress, filters = {}) {
    const params = new URLSearchParams({
      wallet_address: walletAddress,
      ...filters,
    }).toString();
    return this.request(`/api/matches?${params}`);
  }

  async getMutualConnections(userAWallet, userBWallet) {
    const params = new URLSearchParams({
      user_a_wallet: userAWallet,
      user_b_wallet: userBWallet,
    }).toString();
    return this.request(`/api/matches/mutual-connections?${params}`);
  }

  // ============ CONNECTIONS ============
  async getConnections(walletAddress) {
    return this.request(`/api/connections?wallet_address=${walletAddress}`);
  }

  async sendConnectionRequest(fromWallet, toWallet) {
    return this.request('/api/connections', {
      method: 'POST',
      body: JSON.stringify({
        from_wallet: fromWallet,
        to_wallet: toWallet,
      }),
    });
  }

  async respondToConnection(connectionId, status) {
    return this.request(`/api/connections/${connectionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // ============ PROFILES ============
  async getProfile(walletAddress) {
    return this.request(`/api/profiles/${walletAddress}`);
  }

  async updateProfile(walletAddress, profileData) {
    return this.request(`/api/profiles/${walletAddress}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // ============ LEADERBOARD ============
  async getLeaderboard(eventId = null, limit = 10) {
    const params = new URLSearchParams({ limit });
    if (eventId) params.append('event_id', eventId);
    return this.request(`/api/leaderboard?${params.toString()}`);
  }

  // ============ AUTH ============
  async verifyWallet(walletAddress, signature, message) {
    return this.request('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({
        wallet_address: walletAddress,
        signature,
        message,
      }),
    });
  }
}

// Export singleton instance
export const vibeConnectAPI = new VibeConnectAPI();
export default vibeConnectAPI;
