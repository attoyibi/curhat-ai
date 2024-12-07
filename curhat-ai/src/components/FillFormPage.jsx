import React, { useState } from "react";

const FillFormPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        plan: "premium",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!/^\d+$/.test(formData.phone)) newErrors.phone = "Phone number must contain only digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Form submitted successfully!");
            // Send data to the server
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 dark:bg-neutral-800">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                    Coming Soon: Unlimited Premium Access!
                </h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                    Fill in the form below to get early access to our premium features that will keep evolving with every update.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>
                    {/* Plan Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Select Plan
                        </label>
                        <select
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                        >
                            <option value="premium">Premium - Rp99,000/month</option>
                            <option value="pro">Pro - Rp199,000/month</option>
                        </select>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign Up for Early Access
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FillFormPage;
