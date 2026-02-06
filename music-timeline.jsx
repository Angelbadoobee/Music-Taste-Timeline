import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Artist categorization
const artistCategories = {
  'TV Soundtrack': [
    'Big Time Rush', 'Victorious Cast', 'Drake Bell', 'Selena Gomez', 
    'Olivia Holt', 'Adam Hicks', 'Demi Lovato', 'Nick Jonas', 'Christopher Wilde',
    'Aly & AJ', 'iCarly & Victorious Casts', 'Victoria Justice'
  ],
  'YouTube/Internet': [
    'ImDontai', 'Ski Mask The Slump God'
  ],
  'Mainstream': [] // Everything else
};

const categorizeArtist = (artistName) => {
  for (const [category, artists] of Object.entries(artistCategories)) {
    if (artists.some(artist => artistName.includes(artist))) {
      return category;
    }
  }
  return 'Mainstream';
};

const categoryColors = {
  'TV Soundtrack': '#FF6B35',
  'YouTube/Internet': '#00D9FF',
  'Mainstream': '#6E44FF'
};

const MusicTimelineApp = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [viewMode, setViewMode] = useState('year'); // 'year' or 'month'

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setUploadedData(json);
          // Auto-select first playlist with items
          const playlistWithItems = json.playlists.find(p => p.items && p.items.length > 0);
          if (playlistWithItems) {
            setSelectedPlaylist(playlistWithItems.name);
          }
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const processData = useMemo(() => {
    if (!uploadedData || !selectedPlaylist) return { timelineData: [], stats: {}, songs: [] };

    const playlist = uploadedData.playlists.find(p => p.name === selectedPlaylist);
    if (!playlist || !playlist.items) return { timelineData: [], stats: {}, songs: [] };

    const songs = playlist.items
      .filter(item => item.track && item.addedDate)
      .map(item => ({
        ...item.track,
        addedDate: item.addedDate,
        category: categorizeArtist(item.track.artistName),
        year: item.addedDate.substring(0, 4),
        month: item.addedDate.substring(0, 7)
      }));

    // Filter by category
    const filteredSongs = selectedCategory === 'All' 
      ? songs 
      : songs.filter(s => s.category === selectedCategory);

    // Group by time period
    const groupBy = viewMode === 'year' ? 'year' : 'month';
    const grouped = filteredSongs.reduce((acc, song) => {
      const period = song[groupBy];
      if (!acc[period]) {
        acc[period] = { period, 'TV Soundtrack': 0, 'YouTube/Internet': 0, 'Mainstream': 0 };
      }
      acc[period][song.category]++;
      return acc;
    }, {});

    const timelineData = Object.values(grouped).sort((a, b) => 
      a.period.localeCompare(b.period)
    );

    // Calculate stats
    const stats = {
      total: filteredSongs.length,
      byCategory: {
        'TV Soundtrack': filteredSongs.filter(s => s.category === 'TV Soundtrack').length,
        'YouTube/Internet': filteredSongs.filter(s => s.category === 'YouTube/Internet').length,
        'Mainstream': filteredSongs.filter(s => s.category === 'Mainstream').length,
      },
      topArtists: Object.entries(
        filteredSongs.reduce((acc, song) => {
          acc[song.artistName] = (acc[song.artistName] || 0) + 1;
          return acc;
        }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    };

    return { timelineData, stats, songs: filteredSongs };
  }, [uploadedData, selectedPlaylist, selectedCategory, viewMode]);

  const playlistOptions = uploadedData?.playlists.filter(p => p.items && p.items.length > 0) || [];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FBB03B 100%)',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Slime drips */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        width: '80px',
        height: '120px',
        background: '#76FF03',
        borderRadius: '0 0 50% 50%',
        opacity: 0.7,
        animation: 'drip 3s infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: '20%',
        width: '60px',
        height: '100px',
        background: '#00E676',
        borderRadius: '0 0 50% 50%',
        opacity: 0.7,
        animation: 'drip 4s infinite'
      }} />

      {/* Splat decorations */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '5%',
        fontSize: '120px',
        opacity: 0.2,
        transform: 'rotate(-15deg)',
        color: '#FF6B35',
        textShadow: '4px 4px 0px rgba(0,0,0,0.2)'
      }}>★</div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '8%',
        fontSize: '100px',
        opacity: 0.2,
        transform: 'rotate(25deg)',
        color: '#FBB03B',
        textShadow: '4px 4px 0px rgba(0,0,0,0.2)'
      }}>♪</div>

      <style>{`
        @keyframes drip {
          0%, 100% { height: 100px; }
          50% { height: 150px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .nick-button {
          background: #FF6B35;
          border: 4px solid #000;
          color: #000;
          font-weight: bold;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 4px 4px 0px #000;
          transition: all 0.1s;
          font-family: 'Comic Sans MS', cursive;
        }
        .nick-button:hover {
          background: #FBB03B;
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #000;
        }
        .nick-button:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px #000;
        }
        .stat-card {
          background: white;
          border: 5px solid #000;
          padding: 15px;
          box-shadow: 8px 8px 0px rgba(0,0,0,0.3);
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '72px',
          margin: 0,
          color: '#fff',
          textShadow: '6px 6px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
          transform: 'rotate(-2deg)',
          animation: 'pulse 2s infinite',
          letterSpacing: '3px'
        }}>
          MUSIC TIMELINE
        </h1>
        <div style={{
          fontSize: '24px',
          color: '#000',
          background: '#76FF03',
          display: 'inline-block',
          padding: '8px 20px',
          border: '3px solid #000',
          marginTop: '10px',
          transform: 'rotate(1deg)',
          boxShadow: '4px 4px 0px #000'
        }}>
          🎵 NOSTALGIA EDITION 🎵
        </div>
      </div>

      {/* File Upload */}
      {!uploadedData && (
        <div style={{
          maxWidth: '600px',
          margin: '50px auto',
          textAlign: 'center'
        }}>
          <div className="stat-card">
            <h2 style={{
              fontSize: '32px',
              color: '#FF6B35',
              marginBottom: '20px',
              textShadow: '2px 2px 0px #000'
            }}>
              UPLOAD YOUR PLAYLIST!
            </h2>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="nick-button" style={{
              display: 'inline-block',
              fontSize: '20px',
              padding: '15px 40px'
            }}>
              CHOOSE FILE
            </label>
          </div>
        </div>
      )}

      {/* Main Content */}
      {uploadedData && selectedPlaylist && (
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          {/* Controls */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Playlist Selector */}
            <div className="stat-card">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                📻 PLAYLIST:
              </label>
              <select
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '3px solid #000',
                  background: '#FBB03B',
                  fontFamily: 'Comic Sans MS, cursive',
                  fontWeight: 'bold'
                }}
              >
                {playlistOptions.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="stat-card">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                🎬 CATEGORY:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '3px solid #000',
                  background: '#00D9FF',
                  fontFamily: 'Comic Sans MS, cursive',
                  fontWeight: 'bold'
                }}
              >
                <option value="All">All Categories</option>
                <option value="TV Soundtrack">TV Soundtrack</option>
                <option value="YouTube/Internet">YouTube/Internet</option>
                <option value="Mainstream">Mainstream</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="stat-card">
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                📅 VIEW BY:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setViewMode('year')}
                  className="nick-button"
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: viewMode === 'year' ? '#76FF03' : '#FF6B35'
                  }}
                >
                  YEAR
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className="nick-button"
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: viewMode === 'month' ? '#76FF03' : '#FF6B35'
                  }}
                >
                  MONTH
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div className="stat-card" style={{ background: '#FF6B35', color: '#fff' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', textShadow: '3px 3px 0px #000' }}>
                {processData.stats.total}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>TOTAL SONGS</div>
            </div>
            <div className="stat-card" style={{ background: '#FF6B35', color: '#000' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {processData.stats.byCategory['TV Soundtrack']}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>📺 TV SOUNDTRACKS</div>
            </div>
            <div className="stat-card" style={{ background: '#00D9FF', color: '#000' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                {processData.stats.byCategory['YouTube/Internet']}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>🌐 YOUTUBE/INTERNET</div>
            </div>
            <div className="stat-card" style={{ background: '#6E44FF', color: '#fff' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', textShadow: '2px 2px 0px #000' }}>
                {processData.stats.byCategory['Mainstream']}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>🎤 MAINSTREAM</div>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="stat-card" style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '32px',
              color: '#FF6B35',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '3px 3px 0px rgba(0,0,0,0.2)'
            }}>
              ⏰ YOUR MUSIC JOURNEY ⏰
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={processData.timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                <XAxis 
                  dataKey="period" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <YAxis style={{ fontSize: '12px', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{
                    background: '#FBB03B',
                    border: '3px solid #000',
                    borderRadius: '0',
                    fontWeight: 'bold'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="TV Soundtrack" stackId="a" fill="#FF6B35" stroke="#000" strokeWidth={2} />
                <Bar dataKey="YouTube/Internet" stackId="a" fill="#00D9FF" stroke="#000" strokeWidth={2} />
                <Bar dataKey="Mainstream" stackId="a" fill="#6E44FF" stroke="#000" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Artists */}
          <div className="stat-card">
            <h2 style={{
              fontSize: '32px',
              color: '#FF6B35',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '3px 3px 0px rgba(0,0,0,0.2)'
            }}>
              ⭐ TOP ARTISTS ⭐
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              {processData.stats.topArtists.map(([artist, count], index) => (
                <div
                  key={artist}
                  style={{
                    background: ['#FF6B35', '#00D9FF', '#76FF03', '#6E44FF', '#FBB03B'][index],
                    border: '3px solid #000',
                    padding: '15px',
                    textAlign: 'center',
                    boxShadow: '4px 4px 0px #000',
                    transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 2}deg)`
                  }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{count}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '5px' }}>
                    {artist}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '50px',
        fontSize: '16px',
        color: '#000',
        fontWeight: 'bold',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          background: '#76FF03',
          display: 'inline-block',
          padding: '10px 30px',
          border: '3px solid #000',
          boxShadow: '4px 4px 0px #000'
        }}>
          Made with 💚 and 90s NOSTALGIA! 📼
        </div>
      </div>
    </div>
  );
};

export default MusicTimelineApp;
