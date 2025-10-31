# 🎯 Complete Installation & Usage Guide

## 📦 Installation

### Option 1: Quick Install (Recommended)

1. **Navigate to Chrome Extensions**
   - Open Chrome/Chromium browser
   - Type `chrome://extensions/` in the address bar
   - Press Enter

2. **Enable Developer Mode**
   - Look for the toggle switch in the top-right corner
   - Click to enable (it should turn blue)

3. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to `C:\Users\datta\Desktop\Chrome-Ext`
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - You should see "AI Smart Tab Organizer" in your extensions list
   - The extension card should show:
     - Name: AI Smart Tab Organizer
     - Version: 1.0.0
     - Status: Enabled
     - No errors

5. **Pin to Toolbar** (Highly Recommended)
   - Click the puzzle piece icon 🧩 in Chrome's toolbar
   - Find "AI Smart Tab Organizer"
   - Click the pin icon 📌 next to it
   - The 🧠 icon should now appear in your toolbar

### Option 2: Enable Chrome AI (For Better Results)

For the best AI-powered tab grouping:

1. **Enable AI Flag**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Find "Optimization Guide On Device Model"
   - Change dropdown from "Default" to "Enabled"
   - Click "Relaunch" button at the bottom

2. **Enable Prompt API** (Chrome Canary/Dev only)
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
   - Set to "Enabled"
   - Relaunch Chrome

3. **Download AI Model**
   - Navigate to `chrome://components/`
   - Find "Optimization Guide On Device Model"
   - Click "Check for update"
   - Wait for download (may take 5-10 minutes)
   - Status should show "Up-to-date"

**Note**: Without AI enabled, the extension still works great using domain-based grouping!

---

## 🚀 First-Time Usage

### Step 1: Prepare Test Tabs

Open 15-20 tabs from different categories to see the magic:

**Suggested tabs:**
- News: CNN, BBC, Reuters
- Tech: GitHub, Stack Overflow, TechCrunch
- Social: Twitter, Reddit, LinkedIn
- Shopping: Amazon, eBay, Etsy
- Video: YouTube, Vimeo, Netflix
- Work: Gmail, Google Drive, Slack
- Development: VS Code docs, MDN, Dev.to

### Step 2: Open the Extension

- Click the 🧠 icon in your toolbar
- The popup should open (450x600px window)
- You'll see "Analyzing tabs with AI..." for 2-3 seconds
- Then your tabs appear, organized into groups!

### Step 3: Explore the Interface

**Header Section:**
- 🧠 Title: "Smart Tab Organizer"
- 🔍 Search bar: Type to filter tabs
- 🎯 Focus Mode toggle: Enable/disable focus mode

**Main Area:**
- Tab groups (collapsible)
- Each group shows:
  - Group name (e.g., "Development", "Social Media")
  - Tab count badge
  - AI-generated summary
  - 🎯 Focus button
  - ▼ Expand/collapse icon

**Footer Actions:**
- 💾 Save Session
- 📂 Load Session
- ⏰ Reminder
- ⚙️ Settings

---

## 📖 Feature Walkthrough

### 1. 🔍 Search Tabs

**How to use:**
1. Type in the search bar at the top
2. Results update instantly
3. Search matches:
   - Tab titles
   - URLs
   - Group names
   - AI summaries

**Example:**
- Type "github" → Shows all GitHub-related tabs
- Type "work" → Shows work-related groups and tabs
- Clear search → Shows all tabs again

**Pro Tip**: Use partial words for broader results!

---

### 2. 🗂️ Manage Tab Groups

**Expand/Collapse Groups:**
- Click anywhere on the group header
- Group expands to show all tabs
- Click again to collapse

**View Tab Details:**
- Each tab shows:
  - Favicon (website icon)
  - Full title
  - Shortened URL

**Switch to Tab:**
- Click anywhere on the tab item
- That tab becomes active
- Its window comes to focus
- Popup stays open

**Close Tab:**
- Click the ✕ button on the right
- Tab closes immediately
- Group updates automatically

---

### 3. 🎯 Focus Mode

**What it does:**
- Helps you concentrate on one task
- Suspends tabs outside the focused group
- Saves memory and reduces distractions

**How to use:**

**Method 1: Toggle Focus Mode**
1. Click the Focus Mode toggle in header
2. First group is auto-focused
3. Other tabs are suspended
4. Toggle off to restore all tabs

**Method 2: Focus on Specific Group**
1. Click the 🎯 button on any group
2. That group becomes focused
3. Focus Mode auto-enables
4. Other tabs suspend

**Visual Feedback:**
- Focused group has green border
- Non-focused tabs appear dimmed
- Focus Mode toggle shows "on" state

**Exit Focus Mode:**
- Toggle Focus Mode off, OR
- Click 🎯 on the same group again
- All tabs restore immediately

**Pro Tip**: Use Focus Mode when doing deep work!

---

### 4. 💾 Session Management

**Save a Session:**

1. Click "💾 Save Session"
2. Modal opens
3. Enter session name:
   - "Morning Work"
   - "Research: AI Tools"
   - "Shopping List"
   - "Weekend Reading"
4. Click "Confirm"
5. Toast notification: "Session saved successfully!"

**What gets saved:**
- All current tab groups
- Tab titles and URLs
- Group names and summaries
- Timestamp

**Load a Session:**

1. Click "📂 Load Session"
2. Modal shows all saved sessions
3. Each session displays:
   - Name
   - Date and time saved
   - Number of tabs
4. Click any session to restore it
5. All tabs open in new tabs
6. Original tabs remain open

**Delete a Session:**
1. Click "📂 Load Session"
2. Find session to delete
3. Click 🗑️ icon on the right
4. Session removed immediately

**Auto-Cleanup:**
- Extension keeps 20 most recent sessions
- Older sessions auto-delete
- Runs daily in background

**Use Cases:**
- 💼 Work: Save your work tabs for each project
- 📚 Research: Keep research sessions organized
- 🎮 Personal: Save personal browsing sessions
- 🏫 Study: Organize study materials by subject

---

### 5. ⏰ Set Reminders

**How to use:**

1. Click "⏰ Reminder"
2. Modal opens with form:
   - **Tab Group**: Select from dropdown
   - **Time**: Minutes from now (default: 15)
   - **Message**: Optional custom message

3. Example settings:
   - Group: "Work Tasks"
   - Time: 30 minutes
   - Message: "Time to review these documents"

4. Click "Set Reminder"
5. Toast notification confirms

**What happens:**
- At scheduled time:
  - Chrome notification appears
  - Shows group name and message
  - Two buttons: "View Tabs" or "Dismiss"
  
**Notification Actions:**
- Click notification → Opens extension popup
- Click "View Tabs" → Opens popup
- Click "Dismiss" → Closes notification

**Use Cases:**
- ⏰ "Check these tabs in 30 minutes"
- 📅 "Review meeting notes in 1 hour"
- 🎯 "Don't forget these articles in 2 hours"
- 🔔 "Come back to research after lunch"

---

### 6. ⚙️ Settings (Coming Soon)

Currently shows an alert with planned features:
- Privacy policy access
- AI model selection
- Auto-grouping preferences
- Keyboard shortcuts customization
- Theme selection (light/dark)
- Export/import settings

---

## ⌨️ Keyboard Shortcuts

### Available Shortcuts:

**Open Extension Popup:**
- Windows/Linux: `Ctrl + Shift + O`
- Mac: `Command + Shift + O`

**Toggle Focus Mode:**
- Windows/Linux: `Ctrl + Shift + F`
- Mac: `Command + Shift + F`

### Customize Shortcuts:

1. Go to `chrome://extensions/shortcuts`
2. Find "AI Smart Tab Organizer"
3. Click the pencil icon
4. Press your desired key combination
5. Click "OK"

---

## 🎨 Understanding the UI

### Color Guide:
- **Purple Gradient**: Header, primary actions
- **Green**: Focus mode, focused groups
- **Red**: Close buttons, delete actions
- **Gray**: Secondary text, borders
- **White**: Background, cards

### Icons Guide:
- 🧠 Extension icon
- 🔍 Search
- 🎯 Focus
- 💾 Save
- 📂 Load
- ⏰ Reminder
- ⚙️ Settings
- ✕ Close
- ▼ Expand/Collapse

---

## 💡 Pro Tips & Best Practices

### Productivity Tips:

1. **Use Focus Mode Daily**
   - Focus on one project at a time
   - Reduce distractions
   - Save memory

2. **Save Sessions Regularly**
   - Create sessions for different workflows
   - Switch between work/personal easily
   - Never lose important tabs

3. **Set Strategic Reminders**
   - Time-box your browsing
   - Don't forget important tabs
   - Schedule follow-ups

4. **Search, Don't Scroll**
   - Use search instead of scrolling
   - Faster than clicking through groups
   - Find tabs instantly

5. **Close Unused Tabs**
   - Use the ✕ button liberally
   - Keep only what you need
   - Improve browser performance

### Organization Tips:

1. **Consistent Naming**
   - Use clear session names
   - Include dates if needed
   - Use prefixes (Work:, Personal:, etc.)

2. **Regular Cleanup**
   - Close tabs you don't need
   - Delete old sessions
   - Keep it organized

3. **Group Similar Tasks**
   - Let AI group intelligently
   - Review groups periodically
   - Close entire groups when done

---

## 🐛 Troubleshooting

### Extension won't load
**Problem**: Error when loading extension  
**Solution**:
- Check for typos in manifest.json
- View errors in `chrome://extensions/`
- Click "Errors" button for details
- Ensure all files are present

### Tabs not showing
**Problem**: Popup is empty  
**Solution**:
- Right-click popup → Inspect
- Check Console for errors
- Ensure tabs permission in manifest
- Reload extension

### AI grouping not working
**Problem**: Using domain grouping instead of AI  
**Solution**:
- Check Chrome version (need 128+)
- Enable AI flag: `chrome://flags/#optimization-guide-on-device-model`
- Check model: `chrome://components/`
- Download may take time
- Fallback grouping still works great!

### Focus Mode issues
**Problem**: Tabs not suspending  
**Solution**:
- Check if Focus Mode toggle is on
- Green border should show on focused group
- Try disabling and re-enabling
- Check storage in DevTools

### Reminders not appearing
**Problem**: No notifications  
**Solution**:
- Check Chrome notifications enabled: `chrome://settings/content/notifications`
- Grant notification permission
- Check alarms in background page console
- Ensure Chrome is running at scheduled time

### Performance issues
**Problem**: Extension slow or laggy  
**Solution**:
- Close some tabs (100+ can be slow)
- Clear old sessions
- Restart browser
- Check memory usage in Task Manager

---

## 📊 Understanding How It Works

### AI Grouping Logic:

1. **Collects tab data**: titles, URLs, domains
2. **Sends to Gemini Nano**: Chrome's on-device AI
3. **AI analyzes** patterns and topics
4. **Returns groups** with names and summaries
5. **Displays organized** tabs in popup

### Fallback Grouping Logic:

If AI unavailable:
1. **Groups by domain**: tabs from same website
2. **Names group** after domain
3. **Counts tabs** per domain
4. **Works reliably** without AI

### Storage Structure:

Stored locally in Chrome:
```javascript
{
  focusMode: boolean,
  focusedGroupId: string,
  sessions: [
    {
      name: string,
      timestamp: number,
      groups: [...]
    }
  ],
  reminders: [
    {
      alarmName: string,
      groupId: string,
      message: string
    }
  ]
}
```

---

## 🎓 Advanced Usage

### Power User Workflows:

**Workflow 1: Deep Work Session**
1. Open project tabs
2. Enable Focus Mode
3. Focus on current project
4. Set reminder for break
5. Work distraction-free

**Workflow 2: Research Project**
1. Open many research tabs
2. Let AI organize by topic
3. Review each group
4. Close irrelevant tabs
5. Save as research session

**Workflow 3: Context Switching**
1. Save current session (Work)
2. Load different session (Personal)
3. Do personal tasks
4. Load Work session back
5. Resume where you left off

---

## 📞 Getting Help

### Resources:
- 📖 [README.md](README.md) - Full documentation
- 🚀 [QUICKSTART.md](QUICKSTART.md) - Quick guide
- 🔧 [SETUP.md](SETUP.md) - Setup details
- 📊 [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md) - Project details

### Support:
- 🐛 Report bugs: GitHub Issues
- 💬 Ask questions: GitHub Discussions
- 📧 Email: your.email@example.com

---

## ✨ Next Steps

1. **Test all features** thoroughly
2. **Report any issues** you find
3. **Suggest improvements** you'd like
4. **Share with friends** if you like it
5. **Star on GitHub** to support development

---

**Enjoy your organized tabs! 🎉**

Made with ❤️ and 🤖 AI
