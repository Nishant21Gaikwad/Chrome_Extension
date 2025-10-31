# Setup & Testing Guide

## Quick Setup (5 minutes)

### Step 1: Load Extension in Chrome

1. **Open Chrome Extensions page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `Chrome-Ext` folder
   - Extension should now appear in your list

4. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in Chrome toolbar
   - Click the pin icon next to "AI Smart Tab Organizer"

### Step 2: Enable Chrome AI (Recommended)

For the best AI-powered grouping experience:

1. **Open Chrome Flags**
   ```
   chrome://flags/#optimization-guide-on-device-model
   ```

2. **Enable the Flag**
   - Set "Optimization Guide On Device Model" to **Enabled**
   - Set "Prompt API for Gemini Nano" to **Enabled** (if available)

3. **Restart Chrome**
   - Click "Relaunch" button that appears

4. **Verify AI Model** (Chrome Canary/Dev only)
   ```
   chrome://components/
   ```
   - Look for "Optimization Guide On Device Model"
   - Click "Check for update" if status is not "Up-to-date"
   - Model will download automatically (may take a few minutes)

### Step 3: Test the Extension

1. **Open multiple tabs** in different categories:
   - News sites (CNN, BBC, etc.)
   - Social media (Twitter, Facebook, etc.)
   - Development (GitHub, Stack Overflow, etc.)
   - Shopping (Amazon, eBay, etc.)

2. **Click the extension icon**
   - Popup should open
   - You'll see "Analyzing tabs with AI..."
   - Tabs will be grouped automatically

3. **Try the features**:
   - ✅ Search for a tab
   - ✅ Expand/collapse groups
   - ✅ Click a tab to switch to it
   - ✅ Toggle Focus Mode
   - ✅ Save a session
   - ✅ Set a reminder

## Testing Checklist

### Basic Functionality
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] Popup opens when icon is clicked
- [ ] Popup displays with correct styling
- [ ] All tabs are retrieved and displayed

### AI Tab Grouping
- [ ] Tabs are grouped by topic/domain
- [ ] Group names make sense
- [ ] AI summaries are generated
- [ ] Groups update when tabs change
- [ ] Fallback grouping works (if AI unavailable)

### Search Functionality
- [ ] Search bar accepts input
- [ ] Search filters tabs in real-time
- [ ] Search matches titles
- [ ] Search matches URLs
- [ ] Search matches group names
- [ ] Clear search shows all tabs again

### Tab Interaction
- [ ] Clicking a tab switches to it
- [ ] Tab window comes to focus
- [ ] Close button (✕) removes tab
- [ ] Tab list updates after closing
- [ ] Favicon displays correctly
- [ ] URLs are shortened appropriately

### Focus Mode
- [ ] Focus Mode toggle works
- [ ] Focusing on a group works (🎯 button)
- [ ] Non-focused tabs are suspended
- [ ] Focused group is visually highlighted
- [ ] Toggling off restores tabs
- [ ] Focus state persists after closing popup

### Session Management
- [ ] "Save Session" modal opens
- [ ] Can enter session name
- [ ] Session saves successfully
- [ ] Toast notification appears
- [ ] "Load Session" shows saved sessions
- [ ] Sessions list correct info (name, date, count)
- [ ] Clicking session restores tabs
- [ ] Delete button (🗑️) removes session
- [ ] Old sessions are cleaned up (>20)

### Reminders
- [ ] "Reminder" modal opens
- [ ] Can select a group
- [ ] Can set time in minutes
- [ ] Can add custom message
- [ ] Reminder is set successfully
- [ ] Chrome notification appears at scheduled time
- [ ] Notification buttons work ("View Tabs", "Dismiss")
- [ ] Clicking notification opens popup

### UI/UX
- [ ] All colors match design
- [ ] Gradient header displays correctly
- [ ] Animations are smooth
- [ ] Scrolling works properly
- [ ] Hover effects work
- [ ] Modal overlays work
- [ ] Buttons have hover states
- [ ] Icons are visible
- [ ] Text is readable
- [ ] Layout is responsive

### Performance
- [ ] Popup opens quickly (<1 second)
- [ ] AI grouping completes in reasonable time
- [ ] Search is responsive (no lag)
- [ ] No console errors
- [ ] Extension doesn't slow down Chrome
- [ ] Memory usage is reasonable

### Edge Cases
- [ ] Works with 0 tabs (empty state shows)
- [ ] Works with 1 tab
- [ ] Works with 100+ tabs
- [ ] Handles tabs without favicons
- [ ] Handles very long tab titles
- [ ] Handles invalid URLs
- [ ] Handles special characters in names
- [ ] Works with pinned tabs
- [ ] Works across multiple windows

## Troubleshooting

### Extension won't load
**Solution:** Check for errors in `chrome://extensions/` → Click "Errors" button

### AI grouping not working
**Solutions:**
1. Check Chrome version (need 128+)
2. Enable AI flag: `chrome://flags/#optimization-guide-on-device-model`
3. Check AI model downloaded: `chrome://components/`
4. Extension will use fallback domain grouping if AI unavailable

### Tabs not showing
**Solutions:**
1. Open developer console: Right-click popup → Inspect
2. Check for JavaScript errors
3. Verify tab permissions in manifest
4. Try reloading extension

### Focus Mode not working
**Solutions:**
1. Check browser storage: `chrome://extensions/` → Background page → Application → Storage
2. Verify `focusMode` and `focusedGroupId` values
3. Clear storage and try again

### Notifications not appearing
**Solutions:**
1. Check Chrome notification permissions: `chrome://settings/content/notifications`
2. Enable notifications for Chrome
3. Check alarms in background page console

### Sessions not saving
**Solutions:**
1. Check storage permissions in manifest
2. Inspect background page for errors
3. Check available storage: `chrome://extensions/` → Background page → Storage
4. Try clearing old sessions

## Development Testing

### Console Logs
Monitor console in:
- **Popup**: Right-click popup → Inspect → Console
- **Background**: `chrome://extensions/` → Service worker → Inspect → Console

### Storage Inspection
View stored data:
1. Open background page inspector
2. Go to Application tab → Storage → Local Storage

### Network Monitoring
Check if extension makes external requests (should be none):
1. Open popup inspector
2. Go to Network tab
3. Reload popup
4. Verify no external requests

## Performance Testing

### Memory Usage
1. Open Chrome Task Manager: `Shift + Esc`
2. Find "Extension: AI Smart Tab Organizer"
3. Check memory usage (should be <50MB typically)

### CPU Usage
1. Open many tabs (50+)
2. Open popup
3. Monitor CPU in Task Manager
4. Should spike briefly, then return to near 0%

## Reporting Issues

If you find a bug, please report with:
- Chrome version: `chrome://version/`
- OS version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots

---

## Next Steps After Testing

1. **Create real PNG icons** (currently using SVG placeholders)
2. **Test on different Chrome versions** (115, 120, 128+)
3. **Test on different operating systems** (Windows, Mac, Linux)
4. **Get feedback** from real users
5. **Address any bugs** found during testing
6. **Prepare for Chrome Web Store** submission

Happy Testing! 🚀
