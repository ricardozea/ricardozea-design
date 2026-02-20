"use client";

import { useState } from "react";
import { PaperPlaneTiltIcon, Info } from "@phosphor-icons/react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [formStatus, setFormStatus] = useState({
		isSubmitting: false,
		isSubmitted: false,
		isError: false,
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (!formData.name || !formData.email || !formData.message) {
			setFormStatus({
				isSubmitting: false,
				isSubmitted: false,
				isError: true,
				message: "Please fill in all fields",
			});
			return;
		}

		setFormStatus({
			...formStatus,
			isSubmitting: true,
			message: "",
		});

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					access_key: "1f2886ec-513e-46af-b21f-d509210c29ab",
					name: formData.name,
					email: formData.email,
					message: formData.message,
					subject: `Contact form submission from ${formData.name}`,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Form submitted successfully
				setFormStatus({
					isSubmitting: false,
					isSubmitted: true,
					isError: false,
					message: "Thank you for your message! I will get back to you soon.",
				});

				// Reset form data
				setFormData({
					name: "",
					email: "",
					message: "",
				});
			} else {
				// Handle error
				setFormStatus({
					isSubmitting: false,
					isSubmitted: false,
					isError: true,
					message:
						data.message || "Something went wrong. Please try again later.",
				});
			}
		} catch (error) {
			setFormStatus({
				isSubmitting: false,
				isSubmitted: false,
				isError: true,
				message: "An error occurred. Please try again later.",
			});
		}
	};

	return (
		<div className="contact-form-wrapper">
			{formStatus.isSubmitted ? (
				<div className="success-message text-center p-6">
					<div className="success-icon-container mx-auto mb-4 bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-bold mb-2 text-persistent-light">
						Message Sent!
					</h3>
					<p className="text-persistent-light">{formStatus.message}</p>
					<span className="glow-button-wrap">
						<button
							onClick={() =>
								setFormStatus({ ...formStatus, isSubmitted: false })
							}
							className="cta-button button-secondary glow-button"
						>
							Send Another Message
						</button>
					</span>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className="contact-form flex flex-col gap-6"
				>
					{formStatus.isError && (
						<div className="error-message p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
							<p className="text-red-500">{formStatus.message}</p>
						</div>
					)}

					<div className="form-group">
						<small className="block text-right p-2">
							All fields are required.
						</small>
						<label htmlFor="name" className="block mb-2">
							Your Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full h-12 rounded-md px-4"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email" className="block mb-2">
							Your Email:
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full h-12 rounded-md px-4"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="message" className="block mb-2">
							Message:
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows="4"
							className="w-full rounded-md p-4"
							required
						></textarea>
						<div className="info-secure-container flex items-start gap-1 my-2">
							<Info size={24} weight="light" />
							<p className="!m-0">
								Your information is secure. I don't store any personal data
								other than the message I receive from filling out this form.
							</p>
						</div>
					</div>

					<div className="form-submit">
						<span className="glow-button-wrap w-full">
							<button
								type="submit"
								className="cta-button button-primary flex items-center justify-center gap-2 w-full glow-button"
								disabled={formStatus.isSubmitting}
							>
								{formStatus.isSubmitting ? "Sending..." : "Send Email"}
								<PaperPlaneTiltIcon size={20} weight="bold" />
							</button>
						</span>
					</div>
				</form>
			)}
		</div>
	);
}
