import React from 'react'

export default function About() {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay bg-opacity-60 dark:opacity-100"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">About Curhat AI</h1>
                        <p className="mb-5">
                            Curhat AI is your trusted companion powered by artificial intelligence, designed to listen and respond to your concerns with empathy and thoughtfulness. Our mission is to provide a safe space where you can share your thoughts, worries, and experiences without judgment. Whether you're seeking advice or just need someone to talk to, Curhat AI is here to offer support 24/7, making conversations more accessible and personalized for everyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
