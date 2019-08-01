import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteFooterStyles';


function PaletteFooter(props) {
  const { paletteName, emoji, classes } = props;
  return (
    <div className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </div>
  );
}

export default withStyles(styles)(PaletteFooter);
