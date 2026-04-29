'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProjectPageBodyClass() {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname?.startsWith('/projects')) {
			document.body.classList.add('project-page');
		} else {
			document.body.classList.remove('project-page');
		}

		return () => {
			document.body.classList.remove('project-page');
		};
	}, [pathname]);

	return null;
}
