import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

// Define a styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  width: 300, // Set a fixed width for the card
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

// MobileCard component definition
const MobileCard = ({
  id,
  name,
  image,
  madeIn,
  ram,
  storage,
  onDelete,
  onEdit,
}) => {
  const [imgSrc, setImgSrc] = useState(image);

  const FALLBACK_IMAGE = "https://via.placeholder.com/300";
  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        sx={{ objectFit: "fill", maxWidth: 350 }}
        image={imgSrc}
        alt={name}
        onError={handleImageError}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        {madeIn && (
          <Typography variant="body2" color="text.secondary">
            Made in: {madeIn}
          </Typography>
        )}
        {ram && (
          <Typography variant="body2" color="text.secondary">
            RAM: {ram}
          </Typography>
        )}
        {storage && (
          <Typography variant="body2" color="text.secondary">
            Storage: {storage}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton onClick={() => onEdit(id)} color="primary">
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </StyledCard>
  );
};

// Define prop types for MobileCard
MobileCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  madeIn: PropTypes.string,
  ram: PropTypes.string,
  storage: PropTypes.string,
};

export default MobileCard;
