// AI Smart Tab Organizer - Popup Script

class TabOrganizer {
  constructor() {
    this.tabs = [];
    this.groupedTabs = [];
    this.focusMode = false;
    this.focusedGroupId = null;
    this.searchQuery = '';
    this.aiSession = null;
    this.init();
  }

  async init() {
    // Clear any stored focus mode state to prevent auto-activation
    await chrome.storage.local.set({ focusMode: false, focusedGroupId: null });
    
    await this.initAI();
    this.setupEventListeners();
    await this.loadTabs(); // Load tabs - focus mode will NEVER auto-activate
  }

  async initAI() {
    try {
      // Check if Chrome AI API is available
      if ('ai' in window && 'languageModel' in window.ai) {
        this.aiSession = await window.ai.languageModel.create({
          systemPrompt: `You are an AI assistant that helps organize browser tabs into logical groups. 
          Analyze tab titles and URLs to categorize them by topic or purpose. 
          Provide concise, clear group names and brief summaries.`
        });
        console.log('AI session initialized successfully');
      } else {
        console.warn('Chrome AI API not available, using fallback grouping');
      }
    } catch (error) {
      console.error('Error initializing AI:', error);
    }
  }

  setupEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTabGroups();
    });

    // Focus Mode - Safe implementation (visual only)
    document.getElementById('focusModeToggle').addEventListener('change', (e) => {
      this.toggleFocusMode(e.target.checked);
    });

    // Bottom action buttons
    document.getElementById('saveSessionBtn').addEventListener('click', () => this.showSaveSessionModal());
    document.getElementById('loadSessionBtn').addEventListener('click', () => this.showLoadSessionModal());
    document.getElementById('refreshSummariesBtn').addEventListener('click', () => this.refreshSummaries());
    document.getElementById('reminderBtn').addEventListener('click', () => this.showReminderModal());
    document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());

    // Modal buttons
    document.getElementById('modalCancelBtn').addEventListener('click', () => this.closeModal('sessionModal'));
    document.getElementById('reminderCancelBtn').addEventListener('click', () => this.closeModal('reminderModal'));
    document.getElementById('reminderConfirmBtn').addEventListener('click', () => this.setReminder());
  }

  async loadTabs() {
    try {
      this.showLoading(true);
      
      // Get all tabs
      this.tabs = await chrome.tabs.query({});
      
      if (this.tabs.length === 0) {
        this.showEmptyState();
        return;
      }

      // Group tabs using AI
      await this.groupTabsWithAI();
      
      // Render the groups
      this.renderTabGroups();
      
      this.showLoading(false);
    } catch (error) {
      console.error('Error loading tabs:', error);
      this.showLoading(false);
    }
  }

  async groupTabsWithAI() {
    if (this.aiSession) {
      try {
        await this.groupTabsWithGemini();
      } catch (error) {
        console.error('AI grouping failed, using fallback:', error);
        this.fallbackGrouping();
      }
    } else {
      this.fallbackGrouping();
    }
    
    // Generate intelligent summaries for each group using Summarizer API
    await this.generateGroupSummaries();
  }

  async generateGroupSummaries() {
    // Check if Summarizer API is available (Chrome 138+)
    if (!('Summarizer' in self)) {
      console.log('Summarizer API not available (requires Chrome 138+), keeping default summaries');
      return;
    }

    try {
      // Check availability
      const availability = await Summarizer.availability();
      if (availability === 'no') {
        console.log('Summarizer API not available on this device');
        return;
      }

      console.log('Generating intelligent summaries with Summarizer API...');
      
      for (const group of this.groupedTabs) {
        try {
          // Create summarizer session with proper options
          const summarizer = await Summarizer.create({
            type: 'key-points',
            format: 'plain-text',
            length: 'medium', // Changed to medium for more detailed summaries
            sharedContext: 'These are browser tabs grouped together by topic or website',
            outputLanguage: 'en', // Specify English output
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloading model: ${Math.round(e.loaded * 100)}%`);
              });
            }
          });

          // Prepare content from all tabs in the group (include URLs for better context)
          const tabContent = group.tabs.map(tab => 
            `${tab.title} (${tab.url})`
          ).join('. ');

          // Generate summary (using batch mode)
          const summary = await summarizer.summarize(tabContent, {
            context: `These tabs are from ${group.name}`
          });
          
          // Update group summary with AI-generated content
          if (summary && summary.trim()) {
            group.summary = summary.trim();
            console.log(`Generated summary for ${group.name}:`, summary);
          }

          // Clean up
          await summarizer.destroy();
        } catch (error) {
          console.log(`Could not generate summary for group ${group.name}:`, error.message);
          // Keep the default summary
        }
      }

      // Re-render to show new summaries
      this.renderTabGroups();
      
    } catch (error) {
      console.error('Error with Summarizer API:', error);
      // Continue with default summaries
    }
  }

  async groupTabsWithGemini() {
    // Prepare tab data for AI analysis
    const tabData = this.tabs.map(tab => ({
      id: tab.id,
      title: tab.title,
      url: new URL(tab.url).hostname
    }));

    const prompt = `Analyze these browser tabs and group them by topic or purpose. 
    Return a JSON array where each object has:
    - groupName: short category name (2-4 words)
    - summary: brief description (10-15 words)
    - tabIds: array of tab IDs that belong to this group
    
    Tabs data:
    ${JSON.stringify(tabData, null, 2)}
    
    Return ONLY valid JSON, no other text.`;

    try {
      const response = await this.aiSession.prompt(prompt);
      const groups = JSON.parse(response);
      
      // Convert AI groups to our format
      this.groupedTabs = groups.map((group, index) => ({
        id: `group-${index}`,
        name: group.groupName,
        summary: group.summary,
        tabs: this.tabs.filter(tab => group.tabIds.includes(tab.id)),
        expanded: false
      }));

      // Handle ungrouped tabs
      const groupedTabIds = new Set(this.groupedTabs.flatMap(g => g.tabs.map(t => t.id)));
      const ungroupedTabs = this.tabs.filter(tab => !groupedTabIds.has(tab.id));
      
      if (ungroupedTabs.length > 0) {
        this.groupedTabs.push({
          id: 'group-other',
          name: 'Other',
          summary: 'Miscellaneous tabs',
          tabs: ungroupedTabs,
          expanded: false
        });
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      this.fallbackGrouping();
    }
  }

  fallbackGrouping() {
    // Simple domain-based grouping
    const domainGroups = {};
    
    this.tabs.forEach(tab => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname.replace('www.', '');
        
        if (!domainGroups[domain]) {
          domainGroups[domain] = [];
        }
        domainGroups[domain].push(tab);
      } catch (error) {
        // Handle invalid URLs
        if (!domainGroups['other']) {
          domainGroups['other'] = [];
        }
        domainGroups['other'].push(tab);
      }
    });

    // Convert to grouped format
    this.groupedTabs = Object.entries(domainGroups).map(([domain, tabs], index) => ({
      id: `group-${index}`,
      name: this.formatDomainName(domain),
      summary: `${tabs.length} tab${tabs.length > 1 ? 's' : ''} from ${domain}`,
      tabs: tabs,
      expanded: false
    }));
  }

  formatDomainName(domain) {
    // Convert domain to readable name
    const parts = domain.split('.');
    const mainPart = parts[parts.length - 2] || parts[0];
    return mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
  }

  renderTabGroups() {
    const container = document.getElementById('tabGroupsContainer');
    container.innerHTML = '';

    // Filter groups based on search
    const filteredGroups = this.filterGroups();

    if (filteredGroups.length === 0) {
      this.showEmptyState();
      return;
    }

    filteredGroups.forEach(group => {
      const groupElement = this.createGroupElement(group);
      container.appendChild(groupElement);
    });

    container.classList.add('visible');
  }

  filterGroups() {
    if (!this.searchQuery) {
      return this.groupedTabs;
    }

    return this.groupedTabs.map(group => {
      const matchingTabs = group.tabs.filter(tab => 
        tab.title.toLowerCase().includes(this.searchQuery) ||
        tab.url.toLowerCase().includes(this.searchQuery) ||
        group.name.toLowerCase().includes(this.searchQuery) ||
        group.summary.toLowerCase().includes(this.searchQuery)
      );

      if (matchingTabs.length > 0) {
        return { ...group, tabs: matchingTabs };
      }
      return null;
    }).filter(group => group !== null);
  }

  createGroupElement(group) {
    const div = document.createElement('div');
    div.className = 'tab-group';
    div.id = group.id;
    
    if (this.focusMode && this.focusedGroupId === group.id) {
      div.classList.add('focused');
    }

    // Group header
    const header = document.createElement('div');
    header.className = 'group-header';
    header.addEventListener('click', () => this.toggleGroup(group.id));

    header.innerHTML = `
      <div class="group-info">
        <div class="group-title-row">
          <span class="group-title">${this.escapeHtml(group.name)}</span>
          <span class="tab-count">${group.tabs.length}</span>
        </div>
        <div class="group-summary">${this.escapeHtml(group.summary)}</div>
      </div>
      <div class="group-actions">
        <button class="group-action-btn" title="Focus on this group (visual only)" data-group-id="${group.id}">
          🎯
        </button>
      </div>
      <span class="expand-icon">▼</span>
    `;

    // Add event listener for focus button (no inline onclick)
    const focusBtn = header.querySelector('.group-action-btn');
    focusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.focusOnGroup(group.id);
    });

    div.appendChild(header);

    // Tab list
    const tabList = document.createElement('div');
    tabList.className = 'tab-list';

    group.tabs.forEach(tab => {
      const tabItem = this.createTabElement(tab);
      tabList.appendChild(tabItem);
    });

    div.appendChild(tabList);

    if (group.expanded) {
      div.classList.add('expanded');
    }

    return div;
  }

  createTabElement(tab) {
    const div = document.createElement('div');
    div.className = 'tab-item';
    
    if (this.focusMode && this.focusedGroupId) {
      // Check if this tab belongs to the focused group
      const focusedGroup = this.groupedTabs.find(g => g.id === this.focusedGroupId);
      if (focusedGroup && !focusedGroup.tabs.some(t => t.id === tab.id)) {
        div.classList.add('hidden-tab');
      }
    }

    // Simple fallback icon (no SVG to avoid CSP issues)
    const favicon = tab.favIconUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Crect width="16" height="16" fill="%23ccc"/%3E%3C/svg%3E';

    const img = document.createElement('img');
    img.className = 'tab-favicon';
    img.src = favicon;
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });

    const tabInfo = document.createElement('div');
    tabInfo.className = 'tab-info';
    tabInfo.innerHTML = `
      <div class="tab-title">${this.escapeHtml(tab.title)}</div>
      <div class="tab-url">${this.escapeHtml(this.shortenUrl(tab.url))}</div>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-tab-btn';
    closeBtn.title = 'Close tab';
    closeBtn.textContent = '✕';

    div.appendChild(img);
    div.appendChild(tabInfo);
    div.appendChild(closeBtn);

    // Switch to tab on click (no inline onclick)
    tabInfo.addEventListener('click', () => this.switchToTab(tab.id));

    // Close tab (no inline onclick)
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeTab(tab.id);
    });

    return div;
  }

  toggleGroup(groupId) {
    const group = this.groupedTabs.find(g => g.id === groupId);
    if (group) {
      group.expanded = !group.expanded;
      const element = document.getElementById(groupId);
      element.classList.toggle('expanded');
    }
  }

  async switchToTab(tabId) {
    try {
      await chrome.tabs.update(tabId, { active: true });
      const tab = await chrome.tabs.get(tabId);
      await chrome.windows.update(tab.windowId, { focused: true });
    } catch (error) {
      console.error('Error switching to tab:', error);
    }
  }

  async closeTab(tabId) {
    try {
      await chrome.tabs.remove(tabId);
      // Reload tabs
      await this.loadTabs();
    } catch (error) {
      console.error('Error closing tab:', error);
    }
  }

  async toggleFocusMode(enabled) {
    this.focusMode = enabled;
    
    console.log('Focus mode toggled:', enabled ? 'ON' : 'OFF');
    
    if (!enabled) {
      // Disable focus mode - clear focused group
      this.focusedGroupId = null;
      this.renderTabGroups();
      this.showNotification('Focus Mode disabled');
    } else {
      // Enable focus mode - visual highlighting only
      this.renderTabGroups();
      this.showNotification('Focus Mode enabled! Click 🎯 on a group to focus (visual highlighting only - tabs will NOT be closed)');
    }
  }

  async focusOnGroup(groupId) {
    console.log('Focusing on group:', groupId);
    this.focusedGroupId = groupId;
    
    if (!this.focusMode) {
      document.getElementById('focusModeToggle').checked = true;
      this.focusMode = true;
    }

    // Visual highlighting only - never discard tabs
    this.renderTabGroups();
    
    const group = this.groupedTabs.find(g => g.id === groupId);
    this.showNotification(`Focused on "${group.name}" (visual highlighting only)`);
  }

  async hideNonFocusedTabs() {
    // SAFETY: Completely disabled tab discarding to prevent accidental tab closure
    // Focus mode will only provide visual highlighting, not discard tabs
    console.log('Focus mode: Visual highlighting only (tab discarding disabled for safety)');
    return;
    
    /* Original code disabled for safety
    if (!this.focusedGroupId) return;

    const focusedGroup = this.groupedTabs.find(g => g.id === this.focusedGroupId);
    if (!focusedGroup) return;

    // Safety: Don't discard tabs if there are very few tabs total
    if (this.tabs.length < 5) {
      console.log('Too few tabs to enable focus mode safely');
      return;
    }

    const focusedTabIds = new Set(focusedGroup.tabs.map(t => t.id));

    // Get current active tab to ensure we never discard it
    const activeTabs = await chrome.tabs.query({ active: true });
    const activeTabIds = new Set(activeTabs.map(t => t.id));

    // Count how many tabs would be discarded
    let toDiscard = 0;
    for (const tab of this.tabs) {
      if (!focusedTabIds.has(tab.id) && !activeTabIds.has(tab.id) && !tab.active && !tab.discarded && !tab.pinned) {
        toDiscard++;
      }
    }

    // Safety: Don't discard if it would affect too many tabs
    if (toDiscard > this.tabs.length * 0.8) {
      console.log('Too many tabs would be discarded, skipping focus mode');
      return;
    }

    // Hide other tabs by discarding them (saves memory)
    for (const tab of this.tabs) {
      // Safety checks: Don't discard focused tabs, active tabs, or already discarded tabs
      const shouldDiscard = !focusedTabIds.has(tab.id) && 
                           !activeTabIds.has(tab.id) && 
                           !tab.active && 
                           !tab.discarded &&
                           !tab.pinned; // Don't discard pinned tabs
      
      if (shouldDiscard) {
        try {
          // Verify tab still exists before discarding
          const currentTab = await chrome.tabs.get(tab.id).catch(() => null);
          if (currentTab && !currentTab.discarded && !currentTab.active) {
            await chrome.tabs.discard(tab.id);
            console.log(`Discarded tab: ${currentTab.title}`);
          }
        } catch (error) {
          // Silently ignore - tab may have been closed
          console.debug('Tab already closed or cannot be discarded:', tab.id);
        }
      }
    }
    */
  }

  async restoreAllTabs() {
    // Tabs will automatically restore when clicked
    // No action needed here
  }

  async loadFocusMode() {
    const data = await chrome.storage.local.get(['focusMode', 'focusedGroupId']);
    if (data.focusMode) {
      this.focusMode = data.focusMode;
      this.focusedGroupId = data.focusedGroupId;
      document.getElementById('focusModeToggle').checked = true;
      // Don't trigger hideNonFocusedTabs here - just restore the UI state
    }
  }

  // Session Management
  async showSaveSessionModal() {
    const modal = document.getElementById('sessionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Save Session';
    modalBody.innerHTML = `
      <label for="sessionName">Session Name:</label>
      <input type="text" id="sessionName" class="form-control" placeholder="e.g., Work Project">
    `;

    modal.style.display = 'flex';

    const confirmBtn = document.getElementById('modalConfirmBtn');
    confirmBtn.addEventListener('click', async () => {
      const name = document.getElementById('sessionName').value.trim();
      if (name) {
        await this.saveSession(name);
        this.closeModal('sessionModal');
      }
    });
  }

  async saveSession(name) {
    const session = {
      name,
      timestamp: Date.now(),
      groups: this.groupedTabs.map(group => ({
        name: group.name,
        summary: group.summary,
        tabs: group.tabs.map(tab => ({
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl
        }))
      }))
    };

    const { sessions = [] } = await chrome.storage.local.get('sessions');
    sessions.push(session);
    await chrome.storage.local.set({ sessions });

    this.showNotification('Session saved successfully!');
  }

  async showLoadSessionModal() {
    const { sessions = [] } = await chrome.storage.local.get('sessions');
    
    const modal = document.getElementById('sessionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Load Session';
    
    if (sessions.length === 0) {
      modalBody.innerHTML = '<p style="color: #6b7280;">No saved sessions found.</p>';
    } else {
      modalBody.innerHTML = '<div class="session-list"></div>';
      const sessionList = modalBody.querySelector('.session-list');

      sessions.forEach((session, index) => {
        const sessionItem = document.createElement('div');
        sessionItem.className = 'session-item';
        sessionItem.innerHTML = `
          <div class="session-info">
            <h3>${this.escapeHtml(session.name)}</h3>
            <p>${new Date(session.timestamp).toLocaleString()} • ${session.groups.reduce((sum, g) => sum + g.tabs.length, 0)} tabs</p>
          </div>
          <button class="session-delete" data-index="${index}">🗑️</button>
        `;

        sessionItem.addEventListener('click', (e) => {
          if (!e.target.classList.contains('session-delete')) {
            this.loadSession(session);
            this.closeModal('sessionModal');
          }
        });

        const deleteBtn = sessionItem.querySelector('.session-delete');
        deleteBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await this.deleteSession(index);
          this.showLoadSessionModal();
        });

        sessionList.appendChild(sessionItem);
      });
    }

    modal.style.display = 'flex';
    document.getElementById('modalConfirmBtn').style.display = 'none';
  }

  async loadSession(session) {
    try {
      // Open all tabs from the session
      for (const group of session.groups) {
        for (const tab of group.tabs) {
          await chrome.tabs.create({ url: tab.url, active: false });
        }
      }

      this.showNotification('Session restored successfully!');
      
      // Reload to show new tabs
      setTimeout(() => this.loadTabs(), 1000);
    } catch (error) {
      console.error('Error loading session:', error);
      this.showNotification('Error loading session');
    }
  }

  async deleteSession(index) {
    const { sessions = [] } = await chrome.storage.local.get('sessions');
    sessions.splice(index, 1);
    await chrome.storage.local.set({ sessions });
  }

  // Reminder Modal
  showReminderModal() {
    const modal = document.getElementById('reminderModal');
    const select = document.getElementById('reminderGroup');

    // Populate group options
    select.innerHTML = this.groupedTabs.map(group => 
      `<option value="${group.id}">${this.escapeHtml(group.name)}</option>`
    ).join('');

    modal.style.display = 'flex';
  }

  async setReminder() {
    const groupId = document.getElementById('reminderGroup').value;
    const minutes = parseInt(document.getElementById('reminderTime').value);
    const message = document.getElementById('reminderMessage').value || 'Time to check your tabs!';

    console.log('Setting reminder:', { groupId, minutes, message });

    const group = this.groupedTabs.find(g => g.id === groupId);
    if (!group) {
      console.error('Group not found for reminder:', groupId);
      return;
    }

    // Create alarm
    const alarmName = `reminder-${Date.now()}`;
    console.log('Creating alarm:', alarmName, 'for', minutes, 'minutes');
    
    await chrome.alarms.create(alarmName, { delayInMinutes: minutes });
    
    // Verify alarm was created
    const alarm = await chrome.alarms.get(alarmName);
    console.log('Alarm created successfully:', alarm);

    // Store reminder data
    const { reminders = [] } = await chrome.storage.local.get('reminders');
    reminders.push({
      alarmName,
      groupId,
      groupName: group.name,
      message,
      timestamp: Date.now() + (minutes * 60 * 1000)
    });
    await chrome.storage.local.set({ reminders });
    
    console.log('Reminder saved to storage:', reminders);

    this.showNotification(`Reminder set for ${minutes} minute${minutes > 1 ? 's' : ''}. Check console for details.`);
    this.closeModal('reminderModal');
  }

  async refreshSummaries() {
    // Show loading state
    this.showNotification('Regenerating AI summaries...');
    
    // Regenerate summaries
    await this.generateGroupSummaries();
    
    this.showNotification('Summaries updated!');
  }

  showSettings() {
    // Open settings page or modal
    alert('Settings feature coming soon!\n\nFeatures to include:\n- Privacy policy\n- AI model selection\n- Auto-grouping preferences\n- Keyboard shortcuts');
  }

  closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if (modalId === 'sessionModal') {
      document.getElementById('modalConfirmBtn').style.display = 'block';
    }
  }

  showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'flex' : 'none';
    document.getElementById('tabGroupsContainer').style.display = show ? 'none' : 'block';
  }

  showEmptyState() {
    document.getElementById('emptyState').style.display = 'flex';
    document.getElementById('tabGroupsContainer').style.display = 'none';
    document.getElementById('loadingIndicator').style.display = 'none';
  }

  showNotification(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: #1f2937;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 13px;
      z-index: 10000;
      animation: slideUp 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  shortenUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname.substring(0, 30) + (urlObj.pathname.length > 30 ? '...' : '');
    } catch {
      return url.substring(0, 50) + (url.length > 50 ? '...' : '');
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.tabOrganizer = new TabOrganizer();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
