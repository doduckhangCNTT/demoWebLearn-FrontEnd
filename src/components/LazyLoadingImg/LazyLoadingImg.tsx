import React, { useEffect, useRef } from "react";

interface IProps {
  url: string;
  className?: string;
  alt?: string;
}

const LazyLoadingImg: React.FC<IProps> = ({
  url,
  className = "",
  alt = "",
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!img) return;
          img.setAttribute("src", url);
        }
      },
      { threshold: 0.5 }
    );

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [url]);

  return <img alt={alt} ref={imgRef} className={className} />;
};

export default LazyLoadingImg;
