import { useRef,useState ,useEffect} from 'react';

const LazyImage = ({ movie, hoverIndex, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  if (!movie.poster_path) {
    return (
      <div
        ref={imgRef}
        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
        style={{ aspectRatio: "2/3" }}
      >
        <span className="text-white">No Image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="position-relative overflow-hidden rounded">
      {isInView && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top"
          onLoad={() => setIsLoaded(true)}
          style={{
            aspectRatio: "2/3",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}
      {!isLoaded && isInView && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-dark d-flex align-items-center justify-content-center"
          style={{ zIndex: 10 }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage