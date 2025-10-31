# Changelog

All notable changes to AI Smart Tab Organizer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-30

### Added
- 🤖 AI-powered automatic tab grouping using Chrome's Gemini Nano
- 🔍 Smart tab search across titles, URLs, and AI summaries
- 🎯 Focus Mode to concentrate on specific tab groups
- 📝 AI-generated summaries for each tab group
- 💾 Session save and restore functionality
- ⏰ Reminder system with Chrome notifications
- 🎨 Beautiful gradient UI with smooth animations
- 🔄 Dynamic tab regrouping when tabs change
- 🗂️ Collapsible tab groups for better organization
- ⚡ Quick tab switching from popup
- ✕ Close tabs directly from extension
- 🎛️ Context menu for quick actions
- ⌨️ Keyboard shortcuts support
- 🧹 Automatic session cleanup (keeps 20 most recent)
- 📱 Responsive popup design
- ♿ Accessibility improvements

### Technical
- Manifest V3 compliance
- Service worker background script
- Chrome Tabs API integration
- Chrome Storage API for local persistence
- Chrome Notifications API for reminders
- Chrome Alarms API for scheduled tasks
- Chrome AI API (Gemini Nano) integration
- Fallback domain-based grouping
- Event-driven architecture
- Debounced tab updates

### Documentation
- Comprehensive README with usage guide
- Privacy policy
- Contributing guidelines
- MIT License
- Setup instructions

### Security & Privacy
- All data stored locally
- On-device AI processing
- No external data transmission
- No third-party analytics
- Open source code

## [Unreleased]

### Planned Features
- Export/import sessions as JSON
- Keyboard shortcuts customization
- Dark mode theme
- Tab group color coding
- Duplicate tab detection
- Tab statistics
- Chrome native tab groups integration
- Cloud sync (optional)
- Voice commands

---

## Release Notes Format

### Version Types
- **Major (X.0.0)**: Breaking changes, major features
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, minor improvements

### Categories
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes
