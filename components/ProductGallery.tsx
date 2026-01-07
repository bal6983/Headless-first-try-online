"use client";

import { useState } from "react";

type Image = {
  src: string;
  alt: string;
};

type Props = {
  images: Image[];
  name: string;
};

export default function ProductGallery({ images, name }: Props) {
  const safeImages = images ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = safeImages[selectedIndex] ?? safeImages[0];

  return (
    <div>
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {selected ? (
          <img
            src={selected.src}
            alt={selected.alt || name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 520,
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#9ca3af",
            }}
          >
            No image available
          </div>
        )}
      </div>

      {safeImages.length > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {safeImages.map((image, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-pressed={isActive}
                style={{
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.7)"
                    : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  padding: 4,
                  background: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt || name}
                  style={{
                    width: "100%",
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 6,
                    display: "block",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
