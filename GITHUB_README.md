# 🧠 AI-Powered Smart Tab Organizer

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue?logo=google-chrome)](https://github.com/Nishant21Gaikwad/Chrome_Extension)
[![Gemini Nano](https://img.shields.io/badge/AI-Gemini%20Nano-orange?logo=google)](https://developer.chrome.com/docs/ai/built-in)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Harness the power of Chrome's built-in AI to automatically organize, summarize, and manage your browser tabs.**

Built for the **Chrome AI Challenge 2025** - A cutting-edge Chrome extension that leverages **Google's Gemini Nano** and **Chrome's Summarizer API** to bring intelligent tab management directly to your browser.

![Extension Demo](screenshots/demo.png)

---

## 🚀 Key Features

### 🤖 **AI-Powered Tab Grouping**
- Automatically groups tabs by topic using **Gemini Nano** language model
- Intelligent categorization based on content, not just domain
- Graceful fallback to domain-based grouping when AI is unavailable

### 📝 **Intelligent AI Summaries**
- Uses **Chrome's Summarizer API** to generate contextual summaries for each tab group
- Understand your tabs at a glance without opening them
- Example: *"GitHub repositories focused on machine learning and AI development"*

### 🔍 **Smart Search**
- Search across all tabs by title, URL, and AI-generated summaries
- Real-time filtering with instant results
- Find what you need in seconds

### 🎯 **Focus Mode**
- Visual highlighting to concentrate on one tab group at a time
- Green border on focused group, dimmed appearance for others
- Reduces cognitive load and improves productivity

### 💾 **Session Management**
- Save your entire tab workspace as named sessions
- One-click restore for different workflows (work, research, personal)
- Automatic cleanup keeps your 20 most recent sessions

### ⏰ **Smart Reminders**
- Set reminder notifications for specific tab groups
- Never forget to check important tabs
- Custom messages and flexible timing

### ⚡ **Tab Interaction**
- Instantly switch to any tab
- Close tabs directly from the popup
- Expand/collapse groups for better organization
- Keyboard shortcuts for power users

---

## 🎥 Demo Video

[![Watch Demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge)](https://youtube.com/your-video-link)

---

## 🛠️ Technologies Used

### Chrome AI APIs
- **Gemini Nano Language Model API** - AI-powered tab grouping
- **Summarizer API** - Intelligent content summaries
- All processing happens **locally on-device** for privacy

### Chrome Extension APIs
- `chrome.tabs` - Tab management and interaction
- `chrome.storage` - Local data persistence
- `chrome.alarms` - Scheduled reminders
- `chrome.notifications` - System notifications
- `chrome.commands` - Keyboard shortcuts
- **Manifest V3** - Latest extension architecture

### Frontend
- Vanilla JavaScript (800+ lines of production code)
- Modern CSS with animations and transitions
- Responsive UI design
- Content Security Policy compliant

---

## 📦 Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nishant21Gaikwad/Chrome_Extension.git
   cd Chrome_Extension
   ```

2. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the cloned folder

3. **Enable AI Features (Optional)**
   - Use **Chrome Canary 138+**
   - Enable flags:
     - `chrome://flags/#optimization-guide-on-device-model` → "Enabled BypassPerfRequirement"
     - `chrome://flags/#prompt-api-for-gemini-nano` → "Enabled"
     - `chrome://flags/#summarization-api-for-gemini-nano` → "Enabled"
   - Restart Chrome and wait for AI model download

---

## 🎯 Usage

### Quick Start
1. Click the extension icon in your toolbar
2. Watch as AI automatically groups your tabs
3. View intelligent summaries under each group
4. Use search to find specific tabs
5. Enable Focus Mode to concentrate on one group

### Advanced Features
- **Save Session**: Click 💾 to save your current workspace
- **Load Session**: Click 📂 to restore a saved session
- **Set Reminder**: Click ⏰ to schedule tab group reminders
- **Refresh Summaries**: Click 🔄 to regenerate AI summaries
- **Focus Mode**: Toggle at the top, then click 🎯 on any group

### Keyboard Shortcuts
- `Ctrl+Shift+F` (Mac: `Cmd+Shift+F`) - Toggle Focus Mode
- `Ctrl+Shift+O` (Mac: `Cmd+Shift+O`) - Open Extension Popup

---

## 🏗️ Architecture

### File Structure
```
Chrome_Extension/
├── manifest.json          # Extension configuration
├── popup/
│   ├── popup.html        # Main UI structure
│   ├── popup.css         # Styles and animations
│   └── popup.js          # Core logic (800+ lines)
├── background/
│   └── background.js     # Service worker for alarms & notifications
├── assets/
│   ├── icon16.svg        # Extension icons
│   ├── icon48.svg
│   └── icon128.svg
└── screenshots/          # Demo images
```

### Key Code Highlights

**AI Summarization (popup.js)**
```javascript
const summarizer = await Summarizer.create({
  type: 'key-points',
  format: 'plain-text',
  length: 'medium',
  outputLanguage: 'en'
});

const summary = await summarizer.summarize(tabContent, {
  context: `These tabs are from ${group.name}`
});
```

**Tab Grouping Logic**
```javascript
async groupTabsWithGemini() {
  const response = await this.aiSession.prompt(prompt);
  const groups = JSON.parse(response);
  // Process and render groups...
}
```

---

## 🔒 Privacy & Security

- ✅ **100% Local Processing** - All AI runs on your device
- ✅ **No Data Collection** - Zero telemetry or tracking
- ✅ **No External Servers** - No data leaves your machine
- ✅ **Manifest V3** - Latest security standards
- ✅ **Content Security Policy** - No inline scripts or eval()

---

## 🎓 Chrome AI Challenge 2025

This project was built for the **Google Chrome AI Challenge 2025**, showcasing:

- ✅ Integration of **multiple Chrome AI APIs**
- ✅ **Real-world problem solving** (tab organization)
- ✅ **Production-ready code** with error handling
- ✅ **Privacy-first approach** with local AI processing
- ✅ **Polished UX** with smooth animations
- ✅ **Comprehensive documentation**

---

## 🐛 Known Issues & Limitations

1. **AI Availability**: Gemini Nano and Summarizer API require Chrome 138+ (Canary) and specific hardware
2. **Graceful Degradation**: Extension falls back to domain-based grouping when AI unavailable
3. **Memory Requirements**: AI models require 4GB+ GPU VRAM or 16GB+ RAM

---

## 🗺️ Future Roadmap

- [ ] Export/import sessions as JSON
- [ ] Dark mode theme
- [ ] Tab statistics and analytics
- [ ] Duplicate tab detection
- [ ] Chrome native tab groups integration
- [ ] More AI APIs (Writer, Rewriter, Translator)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nishant Gaikwad**

- GitHub: [@Nishant21Gaikwad](https://github.com/Nishant21Gaikwad)
- Project: [Chrome_Extension](https://github.com/Nishant21Gaikwad/Chrome_Extension)

---

## 🙏 Acknowledgments

- Google Chrome Team for the amazing AI APIs
- Chrome AI Challenge 2025 organizers
- Gemini Nano and Chrome's Summarizer API documentation

---

## 📊 Project Stats

- **800+ lines** of production JavaScript
- **8 Chrome APIs** integrated
- **2 AI APIs** (Gemini Nano + Summarizer)
- **7 major features** implemented
- **100% privacy-first** approach

---

**Built with ❤️ for the Chrome AI Challenge 2025**
