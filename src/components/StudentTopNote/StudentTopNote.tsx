import Link from "next/link"
import styles from "./StudentTopNote.module.scss"

interface StudentTopNoteProps {
  id: number;
  index: number;
  totalScore: number;
  name: string;
}

export const StudentTopNote = ({ id, index, totalScore, name }: StudentTopNoteProps) => {
  return (
    <Link href={`/profile/${id}`} className={styles.link}>
      <h2 style={{ margin: 0, color: index === 0 ? "#ff9800" : "#333" }}>
        #{index + 1} {name}
      </h2>
      <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
        Общее кол-во баллов: <strong>{totalScore}</strong>
      </p>
    </Link>
  )
}