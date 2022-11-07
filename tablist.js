class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];
    this.tabs.forEach((tab) => {
      const tabPanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabPanel);

      tab.addEventListener('keydown', this.handleKeydown.bind(this));
      tab.addEventListener('click', this.handleClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    });

    this.setSelectedTab(this.firstTab);
  }

  setSelectedTab(currentTab) {
    this.tabs.forEach((tab, idx) => {
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[idx].classList.remove('is-hidden');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[idx].classList.add('is-hidden');
      }
    });
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      const index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      const index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* event handlers */
  handleKeydown(event) {
    const target = event.currentTarget;
    let eventHandled = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(target);
        eventHandled = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(target);
        eventHandled = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        eventHandled = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        eventHandled = true;
        break;

      default:
        break;
    }

    if (eventHandled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}