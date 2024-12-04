import React, { useState, useEffect } from "react";
import "./App.css";

const ExplorinAcademy = ({ name, count, images }) => {
  // Component to handle individual images
  const ImageComponent = ({ url, ready, error }) => {
    const [imageReady, setImageReady] = useState(ready);
    const [errorState, setErrorState] = useState(error);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
      if (!imageReady && errorState && retryCount < 3) {
        const timer = setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          // Simulating retry logic (50% success rate)
          if (Math.random() > 0.5) {
            setImageReady(true);
            setErrorState(false);
          }
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [retryCount, errorState, imageReady]);

    if (errorState && retryCount >= 3) {
      return (
        <div className="image-placeholder error" title="Image failed to load">
          ⚠
        </div>
      );
    }

    if (!imageReady) {
      return (
        <div className="image-placeholder loading" title="Loading...">
          ⏳
        </div>
      );
    }

    return <img src={url} alt="Thumbnail" className="circle-image" />;
  };

  // Check if any image has an error
  const hasError = images.some((img) => img.error);

  return (
    <div className="explorin-container">
      <div className="explorin-content">
        {/* Image Group */}
        <div className="image-group">
          {images.map((image, index) => (
            <ImageComponent key={index} {...image} />
          ))}
          {/* Placeholders for missing images */}
          {[...Array(Math.max(0, 4 - images.length))].map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="image-placeholder empty"
              title="No image available"
            >
              +
            </div>
          ))}
        </div>

        {/* Academy Info */}
        <div className="info">
          <h3>{name}</h3>
          <p>{count}+ offline centers</p>
        </div>
      </div>

      {/* Error Icon */}
      {hasError && (
        <div className="error-icon" title="One or more images failed to load">
          ⚠
        </div>
      )}
    </div>
  );
};

export default ExplorinAcademy;
