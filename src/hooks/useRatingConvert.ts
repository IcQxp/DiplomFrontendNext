// useProcessRating.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyEntry, NivoDefaultData, RatingResponse } from "@/types";
import { convert } from "@/screens/RatingPage/RatingPage";

type UseProcessRatingResult = {
  ratingBar: NivoDefaultData | undefined;
  ratingRadar: NivoDefaultData | undefined;
};

export function useRatingConvert(rating: RatingResponse | null): UseProcessRatingResult {
  const router = useRouter();
  const [ratingBar, setRatingBar] = useState<NivoDefaultData | undefined>();
  const [ratingRadar, setRatingRadar] = useState<NivoDefaultData | undefined>();

  useEffect(() => {
    if (!rating || !rating.keys || rating.keys.length === 0) {
      router.push("/rating");
      return;
    }

    try {
      const processedKeys = rating.keys.map((keyObj: KeyEntry) =>
        Object.values(keyObj)[0]
      );

      const convertedRating = convert({
        ...rating,
        keys: processedKeys,
      });

      setRatingBar(convertedRating);

      setRatingRadar({
        ...rating,
        keys: processedKeys,
      });
    } catch (error) {
      console.error("Ошибка при обработке рейтинга:", error);
      router.push("/rating");
    }
  }, [rating, router, convert]);

  return { ratingBar, ratingRadar };
}