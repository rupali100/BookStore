import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";
import { Rating } from "@material-ui/lab";

const CartItem = ({ item, onRemoveFromCart }) => {
  const classes = useStyles();
  console.log("itemitemitem", item);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item.media} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="h6" color="secondary">
            {item.price}
          </Typography>
          <Typography variant="h7">Rating </Typography>
          <Rating name="read-only" value={item.rating} readOnly />
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}></div>
        <Button
          className={classes.button}
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
