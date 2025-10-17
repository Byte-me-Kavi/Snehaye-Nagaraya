import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16,28 C16,28 4,20 4,12 C4,7 7,4 10,4 C13,4 15,6 16,9 C17,6 19,4 22,4 C25,4 28,7 28,12 C28,20 16,28 16,28 Z"
            fill="#ec4899"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
