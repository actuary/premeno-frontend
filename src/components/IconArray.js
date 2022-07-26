import {
  Container
} from "@mui/material"

const ColouredIconCell = ({ Icon, color }) => {
  return (
    <Icon fontSize="1px" style={{ color: color }}/>
  )
}

const IconArray = ({ Icon, length, width, black, red }) => {

  const total = length * width
  const getColour = (idx, black, red) => {
    return (idx < Math.ceil(black * total) ?
      "black" :
      (idx < Math.ceil(red * total) ? "red" : "teal"))
  }
  return (
    <Container>
      {[...Array(length)].map((row, row_idx) => (
        <Container key={row_idx}>
          {[...Array(width)].map((column, col_idx) => {
            return (
              <ColouredIconCell
                key={row_idx * length + col_idx}
                Icon={Icon}
                color={getColour(row_idx * width + col_idx, black, red)}
              />
            )}
          )}
        </Container>
      ))}
    </Container>
  )
}

export default IconArray
