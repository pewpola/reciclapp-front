interface ProductImageProps {
    src: string;
    alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
    return (
        <div className="col-md-6">
            <img src={src} alt={alt} className="img-fluid" />
        </div>
    );
}
