"use client";

import React from 'react';

export const ExternalLink = ({ href, children, className = "", title, ...props }) => {
	// If custom title is provided, append it to the default title
	const titleText = title
		? `Link opens a new tab - ${title}`
		: "Link opens a new tab";

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`new-tab ${className}`}
			title={titleText}
			{...props}
		>
			{children}
		</a>
	);
};
