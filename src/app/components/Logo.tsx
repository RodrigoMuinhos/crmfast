import { ShoppingCart } from 'lucide-react';

export function Logo({
  className = "",
  size = "default",
  showText = true,
}: {
  className?: string;
  size?: "small" | "default" | "large";
  showText?: boolean;
}) {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <ShoppingCart className="text-primary" size={size === "small" ? 20 : size === "large" ? 32 : 24} />
      </div>
      {showText ? (
        <span className={`font-semibold ${sizes[size]}`}>
          Fast<span className="italic">Market</span>
        </span>
      ) : (
        <span className="sr-only">FastMarket</span>
      )}
    </div>
  );
}
