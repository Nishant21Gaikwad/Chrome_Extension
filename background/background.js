// Background Service Worker for AI Smart Tab Organizer

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('AI Smart Tab Organizer installed!');
    
    // Set default settings
    chrome.storage.local.set({
      focusMode: false,
      focusedGroupId: null,
      sessions: [],
      reminders: []
    });

    // Open welcome page
    chrome.tabs.create({
      url: 'https://github.com/yourusername/ai-tab-organizer'
    });
  } else if (details.reason === 'update') {
    console.log('AI Smart Tab Organizer updated!');
  }
});

// Handle alarms for reminders and cleanup
chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('Alarm triggered:', alarm.name, 'at', new Date());
  
  if (alarm.name.startsWith('reminder-')) {
    console.log('Processing reminder alarm:', alarm.name);
    await handleReminder(alarm.name);
  } else if (alarm.name === 'cleanup') {
    console.log('Running cleanup alarm');
    const { sessions = [] } = await chrome.storage.local.get('sessions');
    
    if (sessions.length > 20) {
      // Sort by timestamp and keep only the 20 most recent
      const sorted = sessions.sort((a, b) => b.timestamp - a.timestamp);
      const kept = sorted.slice(0, 20);
      await chrome.storage.local.set({ sessions: kept });
      console.log('Cleaned up old sessions');
    }
  }
});

async function handleReminder(alarmName) {
  try {
    const { reminders = [] } = await chrome.storage.local.get('reminders');
    const reminder = reminders.find(r => r.alarmName === alarmName);
    
    if (!reminder) {
      console.log('Reminder not found for alarm:', alarmName);
      return;
    }

    // Ensure all required properties are present
    const notificationOptions = {
      type: 'basic',
      title: reminder.groupName ? `Tab Reminder: ${reminder.groupName}` : 'Tab Reminder',
      message: reminder.message || 'Time to check your tabs!',
      priority: 2,
      requireInteraction: true
    };

    // Only add buttons if supported
    if (chrome.notifications && chrome.notifications.onButtonClicked) {
      notificationOptions.buttons = [
        { title: 'View Tabs' },
        { title: 'Dismiss' }
      ];
    }

    console.log('Creating reminder notification:', notificationOptions);
    await chrome.notifications.create(notificationOptions);
    console.log('Reminder notification created successfully');

    // Remove processed reminder
    const updatedReminders = reminders.filter(r => r.alarmName !== alarmName);
    await chrome.storage.local.set({ reminders: updatedReminders });

  } catch (error) {
    console.error('Error handling reminder:', error);
  }
}

// Handle notification button clicks (only if API is available)
if (chrome.notifications && chrome.notifications.onButtonClicked) {
  chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      // View Tabs - open popup
      chrome.action.openPopup();
    }
    
    // Dismiss notification
    chrome.notifications.clear(notificationId);
  });
}

// Handle notification clicks (only if API is available)
if (chrome.notifications && chrome.notifications.onClicked) {
  chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.action.openPopup();
    chrome.notifications.clear(notificationId);
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      if (request.action === 'createNotification') {
        const notificationOptions = {
          type: 'basic',
          title: request.title || 'AI Smart Tab Organizer',
          message: request.message || 'Notification',
          priority: 1
        };
        
        console.log('Creating notification from popup:', notificationOptions);
        await chrome.notifications.create(notificationOptions);
        sendResponse({ success: true });
        return;
      }

      if (request.action === 'getTabGroups') {
        // Return current tab groups if needed by other parts of extension
        sendResponse({ success: true });
        return;
      }
    } catch (error) {
      console.error('Error handling runtime message:', error);
      sendResponse({ success: false, error: error.message });
    }
  })();

  return true; // Keep message channel open for async response
});

// Periodic cleanup of old sessions (keep last 20)
try {
  chrome.alarms.create('cleanup', { periodInMinutes: 60 * 24 }); // Daily
} catch (error) {
  console.error('Error creating cleanup alarm:', error);
}

// Handle tab updates for dynamic re-grouping
let tabUpdateTimeout;
chrome.tabs.onCreated.addListener(() => {
  scheduleRegroup();
});

chrome.tabs.onRemoved.addListener(() => {
  scheduleRegroup();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url || changeInfo.title) {
    scheduleRegroup();
  }
});

function scheduleRegroup() {
  // Debounce regrouping to avoid too many updates
  clearTimeout(tabUpdateTimeout);
  tabUpdateTimeout = setTimeout(() => {
    // Send message to popup if it's open
    chrome.runtime.sendMessage({ action: 'regroupTabs' }).catch(() => {
      // Popup not open, ignore
    });
  }, 2000);
}

// Keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-focus-mode') {
    // DISABLED FOR SAFETY - Focus mode removed from extension
    console.log('Focus mode keyboard shortcut disabled for safety');
    return;
  } else if (command === 'open-popup') {
    try {
      chrome.action.openPopup();
    } catch (error) {
      console.error('Error opening popup from command:', error);
    }
  }
});

console.log('AI Smart Tab Organizer background service worker loaded');
