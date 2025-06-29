import { useEffect, useState } from "react"
import { ResponsiveBar } from "@nivo/bar";
import { Checkbox } from "@mui/material";
import { Criterion } from "@/types";
import { getAllCritea, getTopRatingWithCriteriaArray } from "@/api";

export interface RatingWithCriteria {
  count: number
  criteriaIDs: number[]
}
export interface nivoStudent {
  criteria: string; // Обязательное поле
  [key: string]: number | string; // Дополнительные поля с динамическими именами
}


export interface nivoDiagramm {
  data: nivoStudent[],
  keys: string[]

}

export const RatingWithArray = () => {

  const [ratingWithCriteriaData, setRatingWithCriteriaData] = useState<RatingWithCriteria>({ count: 1, criteriaIDs: [1, 5] });
  const [data, setData] = useState<nivoDiagramm>();
  const [allCriteria,setAllCriteria] = useState<Criterion[]>();


  useEffect(() => {
    const FD = async () => {
      const response = await getTopRatingWithCriteriaArray(ratingWithCriteriaData)
      setData(response.data);
const responseCriteria = await getAllCritea();
setAllCriteria(responseCriteria.data);
    }
    FD();


  }, [])
  const handleCriteriaToggle = (cID: number) => {
    setRatingWithCriteriaData((prevState) => {
      const isCriteriaSelected = prevState.criteriaIDs.includes(cID);

      // Если критерий уже выбран, удаляем его, иначе добавляем
      const updatedCriteriaIDs = isCriteriaSelected
        ? prevState.criteriaIDs.filter((id) => id !== cID)
        : [...prevState.criteriaIDs, cID];

      return {
        ...prevState,
        criteriaIDs: updatedCriteriaIDs,
      };
    });
  };

  const HandleRating = async () => {
    const response = await getTopRatingWithCriteriaArray(ratingWithCriteriaData)
      setData(response.data);
  }
  return (

    <div>
      {
        data && <>
       {  data.data.map(elem => <div>

{elem.criteria}
</div>)}
<div style={{width:"50%",height:"300px"}}>

<ResponsiveBar
            data={data.data}
            keys={data.keys}
            indexBy="criteria"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'blues' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'criteria',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'food',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            />
      </div>
        </>
       
      }
      {
        allCriteria&&allCriteria.map(elem => <div>
          {elem.criteriaId}
          <Checkbox checked={ratingWithCriteriaData.criteriaIDs.includes(elem.criteriaId)} onChange={()=>handleCriteriaToggle(elem.criteriaId)}/>
          </div>
          )
      }
      <button onClick={HandleRating}>Обновить топ</button>
    </div>
  )
}