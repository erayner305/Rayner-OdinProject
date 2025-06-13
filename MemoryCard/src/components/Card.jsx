import React from "react";

export default function Card({ id, title, img, handleCardClick }) {

	return (
		<div
			className="card"
			onClick={() => {
				handleCardClick(id);
			}}
		>
			<div className="title">{title}</div>
			<img src={img} alt={title} />
		</div>
	);
}
