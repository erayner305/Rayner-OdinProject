import { useState } from "react";
import Section from "./Section";

function Experience() {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

    const section = {
        id: "experience",
        title: "Experience"
    }

	const inputs = [
		{
			id: "companyName",
			label: "Company Name",
			state: name,
			setState: setName,
		},
		{
			id: "jobTitle",
			label: "Job Title",
			state: title,
			setState: setTitle,
		},
		{
			id: "tasks",
			label: "Tasks",
			state: tasks,
			setState: setTasks,
		},
		{
			id: "startDate",
			label: "Start Date",
			state: startDate,
			setState: setStartDate,
		},
		{
			id: "endDate",
			label: "End Date",
			state: endDate,
			setState: setEndDate,
		},
	];

	return (
		<Section section={section} inputs={inputs}/>
	);
}

export default Experience;
