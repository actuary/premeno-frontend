import { useState, useLayoutEffect } from "react"
import {
  Container
} from "@mui/material"

const ColouredIconCell = ({ Icon, color }) => {
  return (
    <Icon fontSize="1px" style={{ color: color }}/>
  )
}

const IconArray = ({ Icon, length, width, black, red }) => {
  const [iconArrayDim, setIconArrayDim] = useState({
    length: length,
    width: width
  })

  useLayoutEffect(() => {
    const checkSmall = () => setIconArrayDim(
      window.innerWidth >= 840 ?
        { length: length, width: width } :
        { length:100, width:10 }
    )
    window.addEventListener("resize", checkSmall)
    checkSmall()
    return () => window.removeEventListener("resize", checkSmall)
  }, [])

  const total = length * width
  const getColour = (idx, black, red) => {
    return (idx < Math.ceil(black * total) ?
      "black" :
      (idx < Math.ceil(red * total) ? "red" : "teal"))
  }
  console.log(iconArrayDim)


  return (
    <Container>
      {[...Array(iconArrayDim.length)].map((row, row_idx) => (
        <Container key={row_idx}>
          {[...Array(iconArrayDim.width)].map((column, col_idx) => {
            return (
              <ColouredIconCell
                key={row_idx * iconArrayDim.length + col_idx}
                Icon={Icon}
                color={getColour(row_idx * iconArrayDim.width + col_idx, black, red)}
              />
            )}
          )}
        </Container>
      ))}
    </Container>
  )
}

export default IconArray
