import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/material/styles";
import { phoneDataset } from "../../data/data";

const StyledChartContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: 400,
  marginTop: theme.spacing(2),
}));

const Chart = () => {
  const phonesWithOffers = phoneDataset.filter((phone) => phone.offer);

  const chartData = phonesWithOffers.map((phone) => ({
    name: phone.name,
    price: phone.offer.offerPrice,
  }));

  return (
    <StyledChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#ff6500" />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  );
};

export default Chart;
