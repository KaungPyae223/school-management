import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

const ImageDisplay = ({
  image,
  alt,
  fallbackIcon: Icon,
  display = "card",
}: {
  image: string;
  alt: string;
  fallbackIcon: LucideIcon;
  display?: "card" | "list" | "details" | "data" | "timetable";
}) => {
  const imageSize = () => {
    switch (display) {
      case "card":
        return "w-full h-48";
      case "list":
        return "h-10 w-10";
      case "details":
        return "w-full aspect-square";
      case "data":
        return "h-24 w-24";
      case "timetable":
        return "w-full h-48";
    }
  };

  return (
    <div
      className={cn(
        "relative",
        display !== "card" && "rounded-lg overflow-hidden",
        display === "data" && " m-4 shrink-0 border border-border",
      )}
    >
      {image ? (
        <>
          <img
            src={image}
            alt={alt}
            className={cn(
              " object-cover group-hover:scale-105 transition-transform duration-300",
              imageSize(),
            )}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:scale-105 transition-transform duration-300 dark:bg-white/10"></div>
        </>
      ) : (
        <div
          className={cn(
            "bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
            imageSize(),
          )}
        >
          <Icon
            size={display === "list" ? 20 : 48}
            className="text-gray-400 dark:text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
