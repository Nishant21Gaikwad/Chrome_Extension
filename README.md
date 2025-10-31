# 🧠 AI-Powered Smart Tab Organizer

A Chrome extension that uses AI to automatically organize your browser tabs, boost focus, and improve productivity.

## ✨ Features

### 1. 🤖 Automatic AI Tab Grouping
- Uses Chrome's built-in Gemini Nano AI to analyze tab titles and URLs
- Automatically groups tabs by topic or project
- AI-generated labels and summaries for each group
- Updates dynamically as you open or close tabs
- Fallback to domain-based grouping if AI is unavailable

### 2. 📝 AI-Powered Summaries
- Uses Chrome's **Summarizer API** to generate intelligent summaries
- Analyzes all tabs in each group and creates concise descriptions
- Helps quickly understand the content and purpose of each group
- Automatically updates as tab groups change
- Falls back to simple summaries if API unavailable

### 2. 🔍 Smart Tab Search
- Search across all open tabs by keyword
- Search in titles, URLs, and AI-generated summaries
- Instant filtering in the popup UI
- Highlights matching groups and tabs

### 3. 🎯 Focus Mode
- Toggle to focus on a single tab group
- Click 🎯 on any group to focus on it
- Automatically suspends tabs outside the focused group
- Reduces memory usage and distractions
- Easy toggle on/off to restore all tabs

### 4. 💾 Session Save & Restore
- Save current tab groups as named sessions
- Restore any saved session with one click
- Perfect for different workflows (work, research, personal)
- Automatic cleanup keeps your 20 most recent sessions

### 5. 🎛️ Tab Interaction
- Click any tab to switch to it instantly
- Close tabs directly from the popup
- Expand/collapse groups for better organization
- Focus on specific groups with one click

### 6. ⏰ Reminders & Notifications
- Set reminder alerts on specific tab groups
- Chrome notifications at scheduled times
- Never forget to check important tabs
- Custom reminder messages

## 🚀 Installation

### From Source (Developer Mode)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/ai-tab-organizer.git
   cd ai-tab-organizer
   ```

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the extension**
   - Click "Load unpacked"
   - Select the `Chrome-Ext` folder
   - The extension icon should appear in your toolbar

4. **Enable Chrome AI (Optional but Recommended)**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Enable "Optimization Guide On Device Model"
   - Restart Chrome
   - The extension will automatically use AI for better grouping

### From Chrome Web Store (Coming Soon)
Extension will be available on the Chrome Web Store after review.

## 📖 Usage Guide

### Basic Usage

1. **Click the extension icon** in your toolbar to open the popup
2. **View your organized tabs** - AI automatically groups them by topic
3. **Search tabs** using the search bar at the top
4. **Click any tab** to switch to it
5. **Click the ✕** to close a tab

### Focus Mode

1. Click the **Focus Mode toggle** in the header
2. Click the 🎯 button on any group to focus on it
3. Other tabs will be suspended to save memory
4. Toggle Focus Mode off to restore all tabs

### Session Management

**Save a Session:**
1. Click **💾 Save Session**
2. Enter a name (e.g., "Morning Work", "Research Project")
3. Click **Confirm**

**Load a Session:**
1. Click **📂 Load Session**
2. Select a saved session from the list
3. All tabs will be restored and organized

**Delete a Session:**
- Click the 🗑️ icon next to any session in the Load Session dialog

### Set Reminders

1. Click **⏰ Reminder**
2. Select a tab group
3. Set time (in minutes from now)
4. Add an optional message
5. Click **Set Reminder**
6. You'll receive a Chrome notification at the scheduled time

## 🛠️ Technical Details

### Architecture
- **Manifest V3** compliant
- **Service Worker** background script for persistent tasks
- **Chrome Tabs API** for tab management
- **Chrome Storage API** for local data persistence
- **Chrome Notifications API** for reminders
- **Chrome Alarms API** for scheduled tasks
- **Chrome AI API (Gemini Nano)** for intelligent grouping

### Permissions
- `tabs` - Read and manage browser tabs
- `storage` - Save sessions and settings locally
- `alarms` - Schedule reminder notifications
- `notifications` - Display reminder alerts
- `tabGroups` - Create and manage tab groups
- `<all_urls>` - Access tab content for AI analysis (titles/URLs only)

### Privacy & Security
- ✅ All data stored locally (no external servers)
- ✅ AI processing happens on-device (Chrome's Gemini Nano)
- ✅ No user data collection or tracking
- ✅ No third-party analytics
- ✅ Open source code for transparency
- ✅ Only essential permissions requested

### Browser Compatibility
- **Chrome 128+** (for best AI support)
- **Chrome 115+** (with fallback grouping)
- Other Chromium browsers (Edge, Brave, etc.) with limited AI support

## 🎨 Screenshots

![Extension Popup](screenshots/popup.png)
*Main interface with AI-grouped tabs*

![Focus Mode](screenshots/focus-mode.png)
*Focus Mode in action*

![Session Management](screenshots/sessions.png)
*Save and load sessions*

## 🔧 Development

### Project Structure
```
Chrome-Ext/
├── manifest.json           # Extension manifest (V3)
├── popup/
│   ├── popup.html         # Main UI
│   ├── popup.css          # Styles
│   └── popup.js           # Main logic + AI integration
├── background/
│   └── background.js      # Service worker
├── assets/
│   ├── icon16.svg         # Extension icons
│   ├── icon48.svg
│   └── icon128.svg
└── README.md
```

### Key Classes and Functions

**TabOrganizer (popup.js)**
- `init()` - Initialize extension and AI
- `initAI()` - Set up Chrome AI session
- `loadTabs()` - Fetch all browser tabs
- `groupTabsWithAI()` - AI-powered grouping with smart summaries
- `groupTabsWithGemini()` - Use Gemini Nano API for grouping
- `generateGroupSummaries()` - Use Summarizer API for intelligent summaries
- `fallbackGrouping()` - Domain-based grouping
- `renderTabGroups()` - Update UI
- `toggleFocusMode()` - Manage focus mode
- `focusOnGroup()` - Focus on specific group
- `saveSession()` - Save current state
- `loadSession()` - Restore saved state
- `setReminder()` - Schedule notification

### Building for Production

1. **Remove console.log statements**
2. **Minify JavaScript** (optional)
3. **Convert SVG icons to PNG** for better compatibility:
   ```bash
   # Use any SVG to PNG converter
   # Recommended sizes: 16x16, 48x48, 128x128
   ```
4. **Update manifest.json** with PNG paths
5. **Zip the extension folder**
6. **Submit to Chrome Web Store**

## 🐛 Known Issues

1. **AI API Availability**: Chrome AI APIs are experimental and require:
   - **Language Model API** (Gemini Nano): Chrome 128+ or Chrome Canary
   - **Summarizer API**: Chrome 138+ (currently only in Canary/Dev)
   - Enable flag: `chrome://flags/#optimization-guide-on-device-model` → "Enabled BypassPerfRequirement"
   - Enable flag: `chrome://flags/#prompt-api-for-gemini-nano` → "Enabled"
   - Enable flag: `chrome://flags/#summarization-api-for-gemini-nano` → "Enabled"
   - Hardware requirements: 4GB+ GPU VRAM or 16GB+ RAM, 22GB+ free storage
   - Model downloads automatically on first use
   - Extension falls back gracefully if APIs are unavailable
   
2. **SVG Icons**: Some Chrome versions may not fully support SVG icons. Convert to PNG if needed.

3. **Focus Mode Memory**: Suspended tabs take 1-2 seconds to restore when clicked.

## 🗺️ Roadmap

- [ ] Export/import sessions as JSON
- [ ] Keyboard shortcuts customization
- [ ] Dark mode theme
- [ ] Tab group color coding
- [ ] Duplicate tab detection and merging
- [ ] Tab statistics and analytics
- [ ] Integration with Chrome's native tab groups
- [ ] Cloud sync for sessions (optional)
- [ ] Voice commands for tab management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

## 🙏 Acknowledgments

- Chrome AI team for Gemini Nano API
- Icons from [your icon source]
- Inspiration from various tab management extensions

## 📞 Support

- 🐛 Report bugs: [GitHub Issues](https://github.com/yourusername/ai-tab-organizer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/ai-tab-organizer/discussions)
- 📧 Email: your.email@example.com

## ⭐ Show Your Support

If you find this extension helpful, please:
- ⭐ Star the repository
- 🐦 Share on Twitter
- 📝 Write a review on Chrome Web Store
- ☕ [Buy me a coffee](https://buymeacoffee.com/yourusername)

---

**Made with ❤️ and 🤖 AI**
