import { RootState } from "@/store";
import { RatingResponse } from "@/types";
import { useSelector } from "react-redux";

export const useRating = (): RatingResponse | null => {
  return useSelector((state: RootState) => state.rating.data);
};