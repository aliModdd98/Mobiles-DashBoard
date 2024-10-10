import { Box, Typography } from "@mui/material";
import Chart from "../components/Charts/Charts";
import PieChartComponent from "../components/Charts/PieChart";

const Home = () => {
  return (
    <Box style={{ width: "100%" }}>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
            lg: "3.5rem",
            xl: "4rem",
          },
          textAlign: "center",
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        Statistics Dashboard
      </Typography>
      <Chart />
      <PieChartComponent />
    </Box>
  );
};

export default Home;
