# 90s Nickelodeon Music Timeline 🎵

A nostalgic, 90s Nickelodeon-themed interactive timeline visualizer for your Spotify playlists!

## Features

### 90s Aesthetics
- Classic Nickelodeon orange gradient background
- Slime drips animation
- Bold Comic Sans typography with that iconic thick black outline
- Floating stat cards
- Retro button styles with shadow effects

### Interactive Timeline
- **View by Year or Month**: Switch between yearly and monthly views
- **Stacked Bar Chart**: See how your music taste evolved over time
- **Color-coded Categories**:
  - 🧡 Orange: TV Soundtracks (Victorious, Big Time Rush, iCarly, etc.)
  - 💙 Cyan: YouTube/Internet Artists (ImDontai, Ski Mask The Slump God)
  - 💜 Purple: Mainstream Music

### Music Journey Stats
- Total songs count
- Category breakdowns
- Top 5 artists ranking
- Interactive filtering by category

###  Smart Categorization
Automatically tags artists as:
- **TV Soundtrack**: Disney Channel, Nickelodeon shows, movie soundtracks
- **YouTube/Internet**: Internet-native artists
- **Mainstream**: Everything else

## How to Use

### Option 1: Quick Start (HTML File)
1. Open `index.html` in your web browser
2. Click "CHOOSE FILE" 
3. Upload your Spotify playlist JSON file
4. Explore your music journey!

### Option 2: React Component
Use `music-timeline.jsx` in your React project:

```bash
npm install recharts
```

```jsx
import MusicTimelineApp from './music-timeline';

function App() {
  return <MusicTimelineApp />;
}
```

## Getting Your Spotify Data

1. Go to Spotify and request your data
2. Download your playlist JSON
3. Upload it to the app!

The app expects this JSON structure:
```json
{
  "playlists": [
    {
      "name": "Playlist Name",
      "items": [
        {
          "track": {
            "trackName": "Song Name",
            "artistName": "Artist Name",
            "albumName": "Album Name"
          },
          "addedDate": "2018-11-01"
        }
      ]
    }
  ]
}
```

## Controls

- ** Playlist Dropdown**: Switch between your different playlists
- ** Category Filter**: Filter by TV Soundtrack, YouTube/Internet, Mainstream, or All
- ** View Toggle**: Switch between Year and Month timeline views

## Features Breakdown

### Timeline Chart
Shows the evolution of your music taste with:
- Stacked bars showing category distribution
- Time periods on X-axis (year or month)
- Song count on Y-axis
- Interactive tooltips

### Stats Dashboard
- **Total Songs**: Big bold number showing your collection size
- **Category Counts**: Quick view of each category's size
- **Top Artists**: Your top 5 most-added artists with playful tilted cards

### Design Details
- Animated slime drips from the top
- Floating musical note decorations
- Pulsing title animation
- Buttons with that classic "pressed" effect
- Bold black borders on everything (very 90s!)

## Tech Stack
- React 18
- Recharts 2.5 (for charts)
- Pure CSS animations
- No build tools needed for HTML version!

## Browser Support
Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid & Flexbox
- CSS Animations

## Customization

Want to add more artist categories? Edit the `artistCategories` object:

```javascript
const artistCategories = {
  'TV Soundtrack': ['Big Time Rush', 'Victorious Cast', ...],
  'YouTube/Internet': ['ImDontai', 'Ski Mask The Slump God', ...],
  'Your Custom Category': ['Artist Name', ...]
};
```

Want different colors? Change the `categoryColors`:

```javascript
const categoryColors = {
  'TV Soundtrack': '#FF6B35',
  'YouTube/Internet': '#00D9FF',
  'Mainstream': '#6E44FF'
};
```

## Easter Eggs
- The title pulses like it's screaming "WATCH NICKELODEON!"
- Cards float gently like they're in slime
- Buttons have that satisfying "pressed" animation
- Everything has those thick black outlines (just like the 90s!)

## License
Made with 💚 and 90s nostalgia! Feel free to use and modify.

## Credits
Inspired by the glory days of:
- Nickelodeon (the orange splat era)
- Disney Channel (the good old days)
- YouTube's early years
- Your music journey!

---

*"That's All, Folks!" style ending but make it NICKELODEON!* 📼✨
