import React from "react";

const UploadProgressIcon = ({ progress }) => {
	return (
		<svg className="w-5" viewBox="0 0 36 36">
			<path
				className="text-gray-300"
				d="M18 2.0845
						a 15.9155 15.9155 0 0 1 0 31.831
						a 15.9155 15.9155 0 0 1 0 -31.831"
				fill="none"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="text-black"
				d="M18 2.0845
						a 15.9155 15.9155 0 0 1 0 31.831
						a 15.9155 15.9155 0 0 1 0 -31.831"
				fill="none"
				stroke="currentColor"
				strokeWidth="4"
				strokeDasharray="100"
				strokeDashoffset={100 - progress}
			/>
		</svg>
	);
};

export default UploadProgressIcon;
