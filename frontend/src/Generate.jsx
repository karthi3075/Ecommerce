import React from "react";

const Generate = () => {
  const prompt = "A futuristic city at sunset";
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

  return (
    <div>
      <img src={imageUrl} alt="Generated" width="400" />
    </div>
  );
};

export default Generate;