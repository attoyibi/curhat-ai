import React from 'react'
export default function Pricing() {

    return (
        <div className="pt-16">
            <div className="py-10 flex justify-center items-center block text-3xl font-bold text-gray-800 dark:text-darkPrimary sm:text-4xl md:text-5xl lg:text-6xl">
                <p>Upgrade your plan</p>
            </div>
            <div className="bg-gray-100 py-5">
                <div className="flex flex-col justify-center gap-4 p-3 md:min-h-[30rem]">
                    <div className="border">
                        <p>Free</p>
                        <p>USD $0/month</p>
                    </div>
                    <div>box 2</div>
                    <div>box 3</div>
                </div>

            </div>
        </div>
    )
}


// contoh kode 
{/* <div className="flex flex-col justify-center gap-4 px-3 py-3 md:min-h-[30rem] md:flex-row md:gap-0 md:py-0">
    <div className="text-sm relative flex-1 flex gap-5 flex-col border-token-border-light border-t border-l border-r border-b rounded-xl md:min-h-[30rem] md:rounded-none md:border-r-0 md:last:border-r md:first:rounded-tl-xl md:first:rounded-bl-xl md:last:rounded-tr-xl md:last:rounded-br-xl md:max-w-96 justify-center px-6 pt-6 pb-10 md:pb-6" data-testid="free-pricing-modal-column">
        <div className="relative flex flex-col bg-token-main-surface-primary">
            <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2 text-xl font-semibold">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md">
                        <path d="M12.001 1.75C12.4972 1.75051 12.9141 2.12323 12.97 2.61632C13.2763 5.32075 14.096 7.2769 15.4108 8.61588C16.7197 9.9489 18.6326 10.7853 21.3602 11.0276C21.8643 11.0724 22.2506 11.495 22.25 12.0011C22.2494 12.5072 21.8622 12.9289 21.358 12.9726C18.6758 13.2047 16.7215 14.0404 15.381 15.381C14.0404 16.7215 13.2047 18.6758 12.9726 21.358C12.9289 21.8622 12.5072 22.2494 12.0011 22.25C11.495 22.2506 11.0724 21.8643 11.0276 21.3602C10.7853 18.6326 9.9489 16.7197 8.61588 15.4108C7.2769 14.096 5.32075 13.2763 2.61632 12.97C2.12323 12.9141 1.75051 12.4972 1.75 12.001C1.74949 11.5048 2.12137 11.0871 2.61434 11.0302C5.36466 10.713 7.27893 9.89303 8.58598 8.58598C9.89303 7.27893 10.713 5.36466 11.0302 2.61434C11.0871 2.12137 11.5048 1.74949 12.001 1.75Z" fill="currentColor"></path>
                    </svg>
                    Free
                </p>
                <div className="flex items-baseline gap-1.5">
                    <p className="text-base text-token-text-tertiary" data-testid="free-pricing-column-cost">USD $0/month</p>
                </div>
            </div>
        </div>
        <div className="relative flex flex-col bg-token-main-surface-primary">
            <button className="opacity-50 hover:bg-inherit cursor-not-allowed btn relative btn-secondary btn-large" disabled="">
                <div className="flex items-center justify-center">Your current plan</div>
            </button>
        </div>
        <div className="flex flex-col flex-grow gap-2">
            <div className="relative bg-token-main-surface-primary">
                <div className="text-l flex justify-start gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z" fill="currentColor"></path>
                    </svg>
                    <span>Assistance with writing, problem solving and more</span>
                </div>
            </div>
            <div className="relative bg-token-main-surface-primary">
                <div className="text-l flex justify-start gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z" fill="currentColor"></path>
                    </svg>
                    <span>Access to GPT-4o mini</span>
                </div>
            </div>
            <div className="relative bg-token-main-surface-primary">
                <div className="text-l flex justify-start gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z" fill="currentColor"></path>
                    </svg>
                    <span>Limited access to GPT‑4o</span>
                </div>
            </div>
            <div className="relative bg-token-main-surface-primary">
                <div className="text-l flex justify-start gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z" fill="currentColor"></path>
                    </svg>
                    <span>Access to GPT-4o+ token</span>
                </div>
            </div>
        </div>
    </div>
</div> */}
