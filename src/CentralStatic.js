import React, { useState } from 'react';
import { Radio, Waves, Users, Coins, Zap, Music, MapPin, Calendar, Lock, Unlock, ExternalLink, ArrowRight, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useEvents, useEventCheckIn, useConnectionStatus } from './api/useVibeConnect';

export default function CentralStatic() {
  const [currentVibe, setCurrentVibe] = useState('discovering');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [unlockedDrops, setUnlockedDrops] = useState([]);

  // API Integration
  const { events: upcomingEvents, loading: eventsLoading, isUsingMockData } = useEvents();
  const { checkIn, loading: checkInLoading } = useEventCheckIn();
  const { isConnected: apiConnected, checking: checkingConnection } = useConnectionStatus();

  const vibes = ['chill', 'energetic', 'deep', 'experimental', 'discovering'];

  const handleEventRSVP = (event) => {
    setSelectedEvent(event);
  };

  const unlockDrop = async (eventId) => {
    if (!unlockedDrops.includes(eventId)) {
      // In production, this would use wallet address from connected wallet
      const result = await checkIn(eventId, 'demo-wallet-address', { lat: 0, lng: 0 });
      if (result.success || result.drop_unlocked) {
        setUnlockedDrops([...unlockedDrops, eventId]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-stone-800">CentralStatic</h1>
              <p className="text-xs text-stone-500">Cut Through The Static</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm text-stone-600">
              <a href="#radio" className="hover:text-orange-600 transition">Radio</a>
              <a href="#events" className="hover:text-orange-600 transition">Events</a>
              <a href="#label" className="hover:text-orange-600 transition">Label</a>
              <a href="#artists" className="hover:text-orange-600 transition">Artists</a>
            </nav>
            {/* API Connection Status */}
            <div className="flex items-center gap-2">
              {checkingConnection ? (
                <Loader2 className="w-4 h-4 text-stone-400 animate-spin" />
              ) : apiConnected ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="hidden sm:inline">Live</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-amber-600" title="Using demo data">
                  <WifiOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Demo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-stone-800 mb-4">
            Real Music.<br />Real People.<br />Real Vibes.
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            While algorithms feed you propaganda, we're here broadcasting authenticity. 
            AI-curated radio that evolves with your energy, not corporate agendas.
          </p>
        </div>

        {/* Current Vibe Indicator */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-stone-700">Current Frequency</span>
            </div>
            <div className="flex gap-2">
              {vibes.map(vibe => (
                <button
                  key={vibe}
                  onClick={() => setCurrentVibe(vibe)}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    currentVibe === vibe 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>
          
          {/* Vibe Analyzer */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-16 bg-gradient-to-t from-orange-600 to-orange-300 rounded-lg relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 w-full bg-orange-600/30 animate-pulse"
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-stone-500">
            AI analyzing collective energy in real-time
          </p>
        </div>

        {/* SoundCloud Player */}
        <div id="radio" className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-200 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold text-stone-800">Live on CentralStatic</h3>
          </div>
          <iframe 
            width="100%" 
            height="450" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/p64553oAFeAmCT8wPa&color=%23ea580c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            className="rounded-xl"
          />
          <div className="mt-4 p-4 bg-orange-50 rounded-xl">
            <p className="text-sm text-stone-700">
              <strong>What you're hearing:</strong> Unfiltered sound from artists who create without corporate interference. 
              No payola. No playlist politics. Just music that moves.
            </p>
          </div>
        </div>
      </section>

      {/* VibeConnect Events Integration */}
      <section id="events" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Powered by VibeConnect</span>
          </div>
          <h2 className="text-4xl font-bold text-stone-800 mb-4">
            From Radio to Real Life
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover events where your favorite CentralStatic artists are performing. 
            Attend and unlock exclusive drops you can't get anywhere else.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-200">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-lg font-bold text-orange-600">1</span>
            </div>
            <h3 className="font-bold text-stone-800 mb-2">Discover on Radio</h3>
            <p className="text-sm text-stone-600">
              Hear an artist you vibe with? Check if they're playing nearby.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-200">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-lg font-bold text-orange-600">2</span>
            </div>
            <h3 className="font-bold text-stone-800 mb-2">Connect at Event</h3>
            <p className="text-sm text-stone-600">
              Use VibeConnect - no phone numbers, no social media required.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-200">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-lg font-bold text-orange-600">3</span>
            </div>
            <h3 className="font-bold text-stone-800 mb-2">Unlock Exclusive Drops</h3>
            <p className="text-sm text-stone-600">
              Get unreleased tracks, live recordings, and event-only releases.
            </p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        {isUsingMockData && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Demo Mode:</strong> Showing sample events. Connect your wallet to see real events from VibeConnect.
            </p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {eventsLoading ? (
            <div className="col-span-3 flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            </div>
          ) : upcomingEvents.map(event => (
            <div key={event.id} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition">
              {/* Event Header */}
              <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    {event.genre}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg leading-tight">{event.name}</h3>
                <p className="text-sm opacity-90">{event.artist}</p>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <Calendar className="w-4 h-4 mt-0.5 text-orange-600" />
                    <div>
                      <p className="font-medium text-stone-800">{event.date}</p>
                      <p>{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-stone-600">
                    <MapPin className="w-4 h-4 mt-0.5 text-orange-600" />
                    <p>{event.location}</p>
                  </div>
                </div>

                <p className="text-sm text-stone-600 mb-4">{event.description}</p>

                {/* Exclusive Drop Badge */}
                <div className="bg-orange-50 rounded-xl p-3 mb-4">
                  <div className="flex items-start gap-2">
                    {unlockedDrops.includes(event.id) ? (
                      <Unlock className="w-4 h-4 text-green-600 mt-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-orange-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-stone-700 mb-1">
                        {unlockedDrops.includes(event.id) ? 'Unlocked!' : 'Exclusive Drop'}
                      </p>
                      <p className="text-xs text-stone-600">{event.exclusiveDrop.title}</p>
                    </div>
                  </div>
                </div>

                {/* Vibe Match Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-600">Vibe Match</span>
                    <span className="font-bold text-orange-600">{event.vibeScore}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                      style={{ width: `${event.vibeScore}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEventRSVP(event)}
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-orange-700 transition"
                  >
                    RSVP via VibeConnect
                  </button>
                  {unlockedDrops.includes(event.id) && (
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedEvent.name}</h2>
                <p className="text-lg opacity-90">{selectedEvent.artist}</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Date & Time</p>
                    <p className="font-medium text-stone-800">{selectedEvent.date}</p>
                    <p className="text-stone-600">{selectedEvent.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Location</p>
                    <p className="font-medium text-stone-800">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange-600" />
                    Event-Only Exclusive
                  </h3>
                  <p className="text-stone-700 mb-4">{selectedEvent.exclusiveDrop.title}</p>
                  <p className="text-sm text-stone-600 mb-4">
                    This track will be unlocked when you check in at the event using VibeConnect. 
                    It won't be available on streaming platforms - only to attendees.
                  </p>
                  {!unlockedDrops.includes(selectedEvent.id) ? (
                    <button
                      onClick={() => unlockDrop(selectedEvent.id)}
                      disabled={checkInLoading}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {checkInLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking In...
                        </>
                      ) : (
                        'Check In & Unlock Drop'
                      )}
                    </button>
                  ) : (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                      <Unlock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="font-bold text-green-800 mb-1">Unlocked!</p>
                      <p className="text-sm text-green-700">Track added to your library</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-stone-800 mb-3">VibeConnect Features</h3>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Connect with other attendees through personality matching - no phone numbers needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Earn vibe tokens for bringing good energy and participating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Get NFT proof of attendance for exclusive drops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Support artists directly through the blockchain</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 border border-stone-300 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-50 transition"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                    Open in VibeConnect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Label */}
          <div id="label" className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-200">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">CentralStatic Records</h3>
            <p className="text-stone-600 mb-4">
              Our label arm bypasses gatekeepers entirely. Artists own their masters, keep their rights, 
              and connect directly with listeners.
            </p>
            <button className="text-orange-600 font-medium text-sm hover:underline">
              Submit Your Sound →
            </button>
          </div>

          {/* VibeConnect */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-200">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">VibeConnect Integration</h3>
            <p className="text-stone-600 mb-4">
              Blockchain-powered event connections. Attend shows, unlock exclusive music, 
              and connect with people who share your taste - all without sharing your number.
            </p>
            <button className="text-orange-600 font-medium text-sm hover:underline">
              How It Works →
            </button>
          </div>

          {/* Token Economy */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-200">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Coins className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-3">Vibe Economy</h3>
            <p className="text-stone-600 mb-4">
              Earn tokens for bringing good energy to events and curating great music. 
              Listeners, DJs, and artists all get rewarded for authentic participation.
            </p>
            <button className="text-orange-600 font-medium text-sm hover:underline">
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* Artist Portal Teaser */}
      <section id="artists" className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-orange-600 to-rose-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">For Artists & DJs</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get admin access to promote your releases, drop exclusive tracks at your events, 
            and analyze your audience through VibeConnect. No middleman. Just you and your listeners.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition">
              Request Artist Portal
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
              Link Your Events
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-stone-800 mb-6">The Static Clears</h2>
        <div className="space-y-4 text-stone-600">
          <p>
            They told you what to listen to. What to like. What's "trending." 
            Corporate algorithms designed to keep you engaged, not enlightened.
          </p>
          <p>
            CentralStatic is the frequency between their channels. Where real artists broadcast. 
            Where community curates. Where AI serves people, not profits.
          </p>
          <p>
            Discover on radio. Connect at events. Own the experience. Support artists directly.
          </p>
          <p className="font-bold text-orange-600 text-lg">
            Cut through the static. Tune into something real.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3">CentralStatic</h4>
              <p className="text-sm text-stone-400">Broadcasting authenticity since 2026</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Radio</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white">Live Stream</a></li>
                <li><a href="#" className="hover:text-white">Schedule</a></li>
                <li><a href="#" className="hover:text-white">Archive</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Label</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white">Roster</a></li>
                <li><a href="#" className="hover:text-white">Releases</a></li>
                <li><a href="#" className="hover:text-white">Submit Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white">VibeConnect</a></li>
                <li><a href="#" className="hover:text-white">Events</a></li>
                <li><a href="#" className="hover:text-white">SoundCloud</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 pt-8 text-center text-sm text-stone-400">
            <p>No algorithms were harmed in the making of this radio station.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}