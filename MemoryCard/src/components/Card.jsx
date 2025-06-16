import React from "react";

export default function Card({ id, title, img, handleCardClick }) {

	const IMG_WIDTH = "320px";
	const IMG_HEIGHT = IMG_WIDTH;

	return (
		<div
			className="card"
			onClick={() => {
				handleCardClick(id);
			}}
		>
			<img src={img} alt={title} width={IMG_WIDTH} height={IMG_HEIGHT} />
			<div className="title">{title}</div>
		</div>
	);
}
