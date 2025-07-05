import { FC, memo } from "react";
import styles from "./CommentInput.module.scss"

interface CommentForChart {
  comment: string;
  label: string;
  rowsCount: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentInputComponent: FC<CommentForChart> = ({ comment, label, rowsCount, onChange }) => {
  return (
    <div className={styles.commentInput}>
      <label>{label}:</label>
      <textarea
        value={comment}
        onChange={onChange}
        rows={3}
      />
    </div>
  )
}

export const CommentInput = memo(CommentInputComponent);