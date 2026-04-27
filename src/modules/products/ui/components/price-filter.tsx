import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

const MAX_PRICE_LIMIT = 10000;

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

const clampPriceValue = (value: string) => {
  if (!value) return "";

  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) return "";

  return Math.min(parsedValue, MAX_PRICE_LIMIT).toString();
};

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    const clampedValue = clampPriceValue(numericValue);

    if (!clampedValue) {
      onMinPriceChange("");
      return;
    }

    if (maxPrice && parseFloat(clampedValue) > parseFloat(maxPrice)) {
      onMinPriceChange(maxPrice);
      return;
    }

    onMinPriceChange(clampedValue);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    const clampedValue = clampPriceValue(numericValue);

    if (!clampedValue) {
      onMaxPriceChange("");
      return;
    }

    if (minPrice && parseFloat(clampedValue) < parseFloat(minPrice)) {
      onMaxPriceChange(minPrice);
      return;
    }

    onMaxPriceChange(clampedValue);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum Price</Label>
        <Input
          inputMode="decimal"
          type="text"
          onChange={handleMinPriceChange}
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum Price</Label>
        <Input
          inputMode="decimal"
          type="text"
          onChange={handleMaxPriceChange}
          placeholder="$10,000 max"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
        />
      </div>
    </div>
  );
};
