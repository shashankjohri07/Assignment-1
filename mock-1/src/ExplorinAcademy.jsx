import React, { useState, useEffect } from "react";
import "./Explore.css";

const CircleImage = ({ image, index }) => {
  const [error, setError] = useState(image.error);
  const [ready, setReady] = useState(image.ready);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    let timeout;
    if (error) {
      setIsRetrying(true);
      timeout = setTimeout(() => {
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          setError(false);
        } else {
          setIsRetrying(false);
        }
      }, 5000);
    } else {
      setIsRetrying(false);
    }

    return () => clearTimeout(timeout);
  }, [error, retryCount]);

  return (
    <div className="circle-container">
      {isRetrying && (
        <div className="retry-overlay">
          <img
            src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
            className="im"
          />
        </div>
      )}
      <div className="circle-content">
        {error ? (
          <div className="error-icon">⚠️</div>
        ) : ready ? (
          <img
            src={image.url}
            alt={`Image ${index + 1}`}
            className="circle-image"
            onError={() => setError(true)}
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>
    </div>
  );
};

const ExploreComponent = ({ name, count, images }) => {
  // console.log( name, count, images );
  const placeholders = Array(4 - images.length).fill({});
  console.log(placeholders);

  const hasError = images.some((img) => img.error);

  return (
    <div className="component-container">
      <div className="image-row">
        {images.map((image, index) => (
          <CircleImage key={index} image={image} index={index} />
        ))}
       

        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="placeholder" />
        ))}
      </div>
      <div className="text-content">
        <h1>{name}</h1>
        <p>{count}+ offline centers</p>
      </div>
      {hasError && <div className="large-error-icon">⚠️</div>}
    </div>
  );
};

export default ExploreComponent;
