import React from "react";

interface ImageModalProps {
  open: boolean;
  image: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ open, image, alt, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto" onClick={onClose}>
      <div className="relative p-4 bg-transparent max-h-full max-w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &#10005;
        </button>
        <img
          src={image}
          alt={alt}
          style={{ maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', display: 'block', margin: '0 auto' }}
          className="rounded shadow-lg"
        />
      </div>
    </div>
  );
};
