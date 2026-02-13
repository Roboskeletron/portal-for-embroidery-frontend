import { useId, useMemo } from "react";
import type { FileViewDto } from "../../types/api-types.ts";

interface Props {
    files?: FileViewDto[];
}

const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png", "webp"];

const Carousel = ({ files = [] }: Props) => {
    // Generate a unique ID so multiple carousels can exist on one page
    const uniqueId = useId().replace(/:/g, ""); // Bootstrap doesn't like colons in IDs
    const carouselId = `carousel-${uniqueId}`;

    // 1. Filter images first to avoid complex logic inside the JSX
    const images = useMemo(() => {
        return files.filter(file =>
            file.extension && IMAGE_EXTENSIONS.includes(file.extension.toLowerCase())
        );
    }, [files]);

    if (images.length === 0) {
        return (
            <div className="d-flex align-items-center justify-content-center bg-light text-muted" style={{ height: "400px" }}>
                No images available
            </div>
        );
    }

    return (
        <div id={carouselId} className="carousel slide carousel-dark" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {images.map((file, index) => (
                    <div
                        key={file.id || index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        style={{ height: '600px' }}
                    >
                        <img
                            src={`data:image/${file.extension};base64,${file.base64StringFile}`}
                            className="d-block w-100 h-100"
                            alt={file.name || "Slide"}
                            // 'contain' keeps the aspect ratio correct. 'cover' fills the box but crops.
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default Carousel;