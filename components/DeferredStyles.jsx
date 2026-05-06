'use client';

import { useEffect } from 'react';

export default function DeferredStyles() {
	useEffect(() => {
		// Load deferred styles after React hydration
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/css/styles-ricardozea-v6.css';
		document.head.appendChild(link);
	}, []);

	return null;
}
