import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { type AnimatorDocument } from "types/animatorsTypes";

type Props = {
  title: string;
  animators: Pick<AnimatorDocument, "_id" | "username" | "fullName">[];
  onShowClick: (id: string) => void;
};

const AnimatorsFinanceList: React.FC<Props> = ({
  title,
  animators,
  onShowClick,
}) => {
  return (
    <Box sx={{ width: "100%", paddingBottom: "1rem" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding>
            {animators.map((animator, index) => (
              <React.Fragment key={animator._id}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onShowClick(animator._id)}
                    >
                      Prikaži
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{animator.fullName.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={animator.fullName}
                    secondary={`${animator.username}`}
                  />
                </ListItem>
                {index < animators.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AnimatorsFinanceList;
