import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";

export default class ImageCarousel {
	constructor() {
		this.images = [img1, img2, img3, img4];
		this.currentImageIndex = 0;
		this.changeImage(0);
		this.bindEvents();
	}

	changeImage(rank) {
		let index = this.currentImageIndex + rank;
		if (index >= this.images.length) {
			index = index - this.images.length;
		} else if (index < 0) {
			index = this.images.length + index;
		}

		let carouselImage = document.querySelector("#carousel-image");
		carouselImage.setAttribute("src", this.images[index]);
		this.currentImageIndex = index;
	}

	bindEvents() {
		const arrowHandler = (event) => {
			let arrowID = event.currentTarget.id;
			arrowID == "carousel-arrow-left"
				? this.changeImage(-1)
				: this.changeImage(1);
		};
		let carouselArrows = document.querySelectorAll(".carousel-arrow");
		carouselArrows.forEach((arrow) => {
			arrow.addEventListener("click", arrowHandler);
		});

		const navDotHandler = (event) => {
			let navDotRank = event.currentTarget.getAttribute("data-rank");
			if (navDotRank) {
				let rank = parseInt(navDotRank);
				this.changeImage(rank);

				// Update nav-dot ranks to simulate carousel movement
				let navDots = document.querySelectorAll(".nav-dot");
				navDots.forEach((navDot) => {
					let currentRank = parseInt(navDot.getAttribute("data-rank"));
					let newRank = currentRank - rank;

					// Wrap ranks to stay within the range [-2, 2]
					if (newRank > 2) newRank -= 5;
					if (newRank < -2) newRank += 5;

					navDot.setAttribute("data-rank", newRank);

					// Update the active class
					if (newRank === 0) {
						navDot.classList.add("active");
					} else {
						navDot.classList.remove("active");
					}
				});
			}
		};

		let navDots = document.querySelectorAll(".nav-dot");
		navDots.forEach((navDot) => {
			navDot.addEventListener("click", navDotHandler);
		});
	}
}
