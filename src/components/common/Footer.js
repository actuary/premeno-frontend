import { useTheme } from "@mui/material/styles"

const Footer = () => {
  const theme = useTheme()
  return (
    <footer 
      style={{
        color: theme.palette.primary.contrastText, 
        background: theme.palette.primary.main, 
        height: "200px",
        bottom: 0, width: "100%"
      }} 
    > 
      <i>Mascot: The MHT Risk Assessment Tool</i>
    </footer>
  )
}

export default Footer
