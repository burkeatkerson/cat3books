import Image, { type ImageProps } from "next/image";

// 1×1 gray pixel used as the default blur-up placeholder for remote images
const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

type OptimizedImageProps = Omit<ImageProps, "placeholder"> & {
  blurDataURL?: string;
};

export default function OptimizedImage({
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  loading = "lazy",
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      sizes={sizes}
      loading={loading}
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
