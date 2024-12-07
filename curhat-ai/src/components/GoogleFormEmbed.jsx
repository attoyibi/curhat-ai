import React, { useState } from 'react';

const GoogleFormEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="pt-16 mt-8 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-4">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-6 text-center">
          Pendaftaran Akses Premium Curhat-AI
        </h2>
        {/* Tampilkan pesan "Memuat..." jika iframe belum selesai dimuat */}
        {!isLoaded && (
          <div className="text-center text-gray-600 dark:text-neutral-400 mb-4">
            Loading . . .
          </div>
        )}
        {/* Google Form Embed */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfsODLw8fMmCKiKNsMDF63mBVlpJVlqWsuKO4k3Rx6KcY0fzw/viewform?embedded=true"
          width="100%"
          height="1454"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Google Form - Akses Premium"
          onLoad={() => setIsLoaded(true)}
        >
          Memuat…
        </iframe>
      </div>
    </div>
  );
};

export default GoogleFormEmbed;
