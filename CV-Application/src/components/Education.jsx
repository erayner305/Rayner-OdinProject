import { useState } from "react";
import Section from "./Section";

function Education() {
	const [schoolName, setSchoolName] = useState("");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");

	const section = {
		id: "education",
		title: "Education"
	}

	const inputs = [
		{
			id: "schoolName",
			label: "School Name",
			state: schoolName,
			setState: setSchoolName,
		},
		{
			id: "title",
			label: "Title of Study",
			state: title,
			setState: setTitle,
		},
		{
			id: "date",
			label: "Date",
			state: date,
			setState: setDate,
		},
	];

	return (
		<Section section={section} inputs={inputs}/>
	);
}

export default Education;
