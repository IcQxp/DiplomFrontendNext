import { Document, Page, Text, View, Image, Font, PDFViewer } from "@react-pdf/renderer";
import { nivoDiagramm } from "../RatingsWithArray/RatingsWithArray";

const GeorgiaPro = '/fonts/GeorgiaPro-Regular.ttf';
Font.register({ family: 'GeorgiaPro', src: GeorgiaPro });

const styles = {
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "GeorgiaPro", // Используем зарегистрированный шрифт
  },
  comment: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "GeorgiaPro", // Используем зарегистрированный шрифт

  },
  date: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 10,
    color: "#666",
  },
  chartImage: {
    width: "100%",
    marginBottom: 20,
  },
  text: {
    fontFamily: "GeorgiaPro", // Используем зарегистрированный шрифт
    fontSize: 12,
    marginBottom: 10,
  },
  studentInfo: {
    fontWeight: 700,
    fontFamily: "GeorgiaPro", // Используем зарегистрированный шрифт
    fontSize: 12,

  }
};

type ReportPdfViewProps = {
  comment1: string;
  comment2: string;
  title: string;
  barImage: string | null;
  radarImage: string | null;
  ratingBar: nivoDiagramm | undefined;
};

export const ReportPdfView = ({comment1 ,comment2,title,barImage,radarImage,ratingBar}: ReportPdfViewProps) => {
  return (
    <PDFViewer width="100%" height="800px">
      <Document>
        <Page size="A4"
          style={styles.page as any}
          orientation="landscape">
          {/* Заголовок */}
          <Text style={styles.header}>{title}</Text>
          {/* Столбчатая диаграмма */}
          {barImage && (
            <View>
              <Image src={barImage} style={styles.chartImage} />
              <Text style={styles.comment}>{comment1}</Text>
            </View>
          )}
          <Text style={styles.date as any}              >{new Date().toLocaleDateString()}</Text>
        </Page>
        <Page size="A4"
          style={styles.page as any}
        >
          {/* Радарный график */}
          {radarImage && (
            <View>
              <Image src={radarImage} style={styles.chartImage} />
              <Text style={styles.comment}>{comment2}</Text>
            </View>
          )}
          <Text
            style={styles.date as any}
          >{new Date().toLocaleDateString()}</Text>
        </Page>
        <Page size="A4" style={styles.page as any}>
          <Text style={styles.header}>Итог:</Text>
          {ratingBar && ratingBar.data.map((student, index) => {
            const studentName = student.criteria;
            const criteria = Object.keys(student).filter((key) => key !== "criteria");
            const totalScore = criteria.reduce((sum, key) => sum + Number(student[key]), 0);
            return (
              <Text style={styles.comment} key={index}>
                <View>
                  <Text style={styles.studentInfo}>
                    {index + 1}. Студент: {studentName}. Общее значение баллов: {totalScore}
                  </Text>
                  {"\n"}
                  {"\n"}
                  {criteria.map((criterion, idx) => (
                    <View key={idx}>
                      <Text style={styles.comment} >
                        {"\n"}
                        {criterion}: {student[criterion]}
                      </Text>
                    </View>
                  ))}
                </View>
              </Text>
            );
          })}
          { /* Дата в левом нижнем углу */}
          <Text
            style={styles.date as any}
          >{new Date().toLocaleDateString()}</Text>
        </Page>
      </Document>
    </PDFViewer>
  )
}