import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useToggle } from "hooks/global/useToggle";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCardHeader = ({ title, id }: { title: string; id: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [value, toggle] = useToggle(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    toggle();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    toggle();
    setAnchorEl(null);
  };
  return (
    <>
      <CardHeader
        sx={{ margin: "0", paddingBottom: "0.5rem" }}
        title={
          <Typography gutterBottom sx={{ fontSize: 24, fontWeight: "bold" }}>
            {title}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={value}
        onClose={handleClose}
        sx={{ display: "flex" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <EditIcon color="primary" />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default EventCardHeader;
