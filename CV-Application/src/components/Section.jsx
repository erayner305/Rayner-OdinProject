import React, { useState } from 'react'

export default function Section({section, inputs}) {
	const [isEditMode, setIsEditMode] = useState(true);

	return (
		<fieldset className={"section" + ((isEditMode) ? " editMode" : "")} id={section.id} key={section.id}>
            <label className="sectionLabel" htmlFor={section.id}>{section.title}</label>
			{inputs.map((input) => {
				return (
					<label key={input.id}>
						{input.label}
						<input
							type="text"
							id={input.id}
							value={input.state}
							onChange={(e) => {
								input.setState(e.target.value);
							}}
							disabled={!isEditMode}
						/>
					</label>
				);
			})}
			<button onClick={() => setIsEditMode(!isEditMode)}>{(isEditMode) ? "Save" : "Edit"}</button>
		</fieldset>
	);
}
