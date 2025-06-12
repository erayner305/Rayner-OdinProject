import { useState } from "react";
import Section from "./Section";

function GeneralInfo() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

		const section = {
		id: "generalInfo",
		title: "General Info"
	}

	const inputs = [
		{
			id: "name",
			label: "Name",
			state: name,
			setState: setName,
		},
		{
			id: "email",
			label: "Email",
			state: email,
			setState: setEmail,
		},
		{
			id: "phoneNumber",
			label: "Phone Number",
			state: phoneNumber,
			setState: setPhoneNumber,
		},
	];

	return (
		<Section section={section} inputs={inputs}/>
	);
}

export default GeneralInfo;
