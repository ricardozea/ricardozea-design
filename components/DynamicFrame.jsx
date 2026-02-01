'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react';

export default function DynamicFrame({ children, resizable = false }) {
	const [width, setWidth] = useState(100); // percentage
	const containerRef = useRef(null);
	const isDragging = useRef(false);
	const [isInteractable, setIsInteractable] = useState(true); // To control iframe pointer-events

	useEffect(() => {
		if (!resizable) return;

		const handleMouseMove = (e) => {
			if (!isDragging.current) return;

			const container = containerRef.current;
			if (!container) return;

			const parent = container.parentElement;
			if (!parent) return;

			const parentRect = parent.getBoundingClientRect();

			// Calculate width based on center alignment since we're using margin: auto
			// Distance from center of parent to mouse position * 2
			const mouseXRelative = e.clientX - parentRect.left;
			const centerX = parentRect.width / 2;
			const newWidthPixels = (mouseXRelative - centerX) * 2;

			// Convert to percentage
			let newWidthPercent = (newWidthPixels / parentRect.width) * 100;

			// Limits
			if (newWidthPercent < 20) newWidthPercent = 20; // Minimum width
			if (newWidthPercent > 100) newWidthPercent = 100;

			setWidth(newWidthPercent);
		};

		const handleMouseUp = () => {
			if (isDragging.current) {
				isDragging.current = false;
				setIsInteractable(true); // Re-enable iframe interaction
				document.body.style.cursor = 'default';
				document.body.style.userSelect = 'auto';
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [resizable]);

	const handleMouseDown = (e) => {
		e.preventDefault();
		isDragging.current = true;
		setIsInteractable(false); // Disable iframe interaction to prevent event capturing
		document.body.style.cursor = 'ew-resize';
		document.body.style.userSelect = 'none';
	};

	if (!resizable) {
		return <div className="w-full">{children}</div>;
	}

	return (
		<div>
			<div className="text-center mb-4 flex items-center justify-center gap-2 opacity-65">
				<ArrowsLeftRightIcon size={20} weight="regular" />
				<span className="text-xs font-medium">Drag the handle to test responsiveness</span>
			</div>

			<div className="relative bg-surface-sunken rounded-lg">

				{/* Resizable Container */}
				<div
					ref={containerRef}
					className="resizable-frame relative bg-surface shadow-2xl z-10"
					style={{
						width: `${width}%`,
						transition: isDragging.current ? 'none' : 'width 0.1s ease-out',
						borderRight: '4px solid var(--bg-accent-blue-persistent)',
						pointerEvents: isInteractable ? 'auto' : 'none' // Disable pointer events on content during drag
					}}
				>
					{children}

					{/* Handle */}
					<div
						className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-5 h-16 rounded-r-md flex items-center justify-center cursor-ew-resize z-50 shadow-lg transition-colors"
						style={{ backgroundColor: 'var(--bg-accent-blue-persistent)' }}
						onMouseDown={handleMouseDown}
						title="Drag to resize"
					>
						<div className="flex flex-col gap-1">
							<div className="w-0.5 h-1 bg-white/60 rounded-full"></div>
							<div className="w-0.5 h-1 bg-white/60 rounded-full"></div>
							<div className="w-0.5 h-1 bg-white/60 rounded-full"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
