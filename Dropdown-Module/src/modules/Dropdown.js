export default class Dropdown {
    constructor () {
        this.bindEvents();
    }

    bindEvents() {
        const dropdownEvent = (event) => {
			const button = event.currentTarget;
			const menuID = button.getAttribute("data-dropdown-target");
			const navDropdownMenu = document.getElementById(menuID);

			if (navDropdownMenu) {
				// Toggle visibility
				navDropdownMenu.classList.toggle("show");

				// Calculate position
				const buttonRect = button.getBoundingClientRect();
				const menuRect = navDropdownMenu.getBoundingClientRect();
				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				// Default positioning (below and to the right)
				let top = buttonRect.bottom;
				let left = buttonRect.left;

				// Adjust if menu overflows the viewport
				if (buttonRect.bottom + menuRect.height > viewportHeight) {
					top = buttonRect.top - menuRect.height; // Open above
				}
				if (buttonRect.left + menuRect.width > viewportWidth) {
					left = buttonRect.right - menuRect.width; // Align to the left
				}

				// Apply styles
				navDropdownMenu.style.top = `${top}px`;
				navDropdownMenu.style.left = `${left}px`;
			}
		};

		const closeDropdowns = (event) => {
            let targetMenuID = event.target.getAttribute("data-dropdown-target");
			let openDropdownMenus = document.querySelectorAll(".dropdown-menu.show");

			openDropdownMenus.forEach((menu) => {
                if (menu.id != targetMenuID) {
                    menu.classList.remove("show");
                }
			});
		};

		let dropdownButtons = document.querySelectorAll(".dropdown-button");
		dropdownButtons.forEach((buttonElem) => {
			buttonElem.addEventListener("click", dropdownEvent);
		});

		// let navDropdownButton = document.querySelector("#nav-dropdown-button");
		// navDropdownButton.addEventListener("click", dropdownEvent);

		document.addEventListener("click", closeDropdowns);
    }
}