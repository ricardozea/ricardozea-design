'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';
import Image from 'next/image';

/**
 * Global Modal Component (Simplified)
 * Handles its own trigger state if a 'trigger' prop is provided,
 * making it extremely easy to use without manual state management.
 */
export default function Modal({
	trigger,
	children,
	isOpen: manualIsOpen,
	onClose: manualOnClose,
	className = '',
	ariaLabel = 'Open modal'
}) {
	const [internalIsOpen, setInternalIsOpen] = useState(false);

	// Determine if we are controlled or uncontrolled
	const isControlled = manualIsOpen !== undefined;
	const isOpen = isControlled ? manualIsOpen : internalIsOpen;

	const close = useCallback(() => {
		if (isControlled) {
			manualOnClose?.();
		} else {
			setInternalIsOpen(false);
		}
	}, [isControlled, manualOnClose]);

	const open = () => {
		if (!isControlled) setInternalIsOpen(true);
	};

	// Handle ESC key
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') close();
		};
		if (isOpen) {
			window.addEventListener('keydown', handleEsc);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			window.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = '';
		};
	}, [isOpen, close]);

	return (
		<>
			{/* Trigger element (if provided) */}
			{trigger && (
				<div
					onClick={open}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							open();
						}
					}}
					className="modal-trigger"
					role="button"
					tabIndex={0}
					aria-haspopup="dialog"
					aria-label={ariaLabel}
				>
					{trigger}
				</div>
			)}

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="modal-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={close}
					>
						<motion.div
							className={`modal-container ${className}`}
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
							role="dialog"
							aria-modal="true"
							aria-label={ariaLabel}
						>
							<button className="modal-close-btn" onClick={close} aria-label="Close">
								<X size={20} weight="bold" />
							</button>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

/**
 * Specialized component for Images that open in a modal.
 * Usage: <ModalImage src="/img.png" alt="Diploma" width={200} height={150} />
 */
export function ModalImage({ src, alt, width, height, className = '', ...props }) {
	return (
		<Modal
			trigger={
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className={`cursor-pointer transition-opacity hover:opacity-80 ${className}`}
					{...props}
				/>
			}
		>
			<div className="relative p-2">
				<img
					src={src}
					alt={alt}
					className="modal-image-content"
				/>
			</div>
		</Modal>
	);
}
