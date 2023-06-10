class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  addListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  removeListener(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        listener => listener !== callback
      );
    }
  }

  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(callback => {
        callback(data);
      });
    }
  }
}
const eventEmitter = new EventEmitter();

    // Adding event listeners to the parent menu element
    const menuElement = document.querySelector('.menu');
    menuElement.addEventListener('mouseover', () => {
      eventEmitter.emit('menuHover', true);
    });
    menuElement.addEventListener('mouseout', () => {
      eventEmitter.emit('menuHover', false);
    });

    // Adding event listeners to the menu items
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        eventEmitter.emit('menuItemHover', item.textContent);
      });
    });

    // Event listener for showing/hiding submenus
    eventEmitter.addListener('menuHover', isHovering => {
      const submenu = menuElement.querySelector('ul');
      submenu.style.display = isHovering ? 'block' : 'none';
    });

    // Event listener for displaying the selected menu item
    eventEmitter.addListener('menuItemHover', menuItem => {
      console.log('Selected menu item:', menuItem);
    });