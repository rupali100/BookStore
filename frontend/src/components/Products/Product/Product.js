import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Rating } from "@material-ui/lab";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  return (
    
    <Card  data-testid="product-test-id"  className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h7">
            <b>{product.name}</b>
          </Typography>
          <Typography variant="h6" color="secondary">
            <b>{product.price}</b>
          </Typography>
        </div>
        <div>
          <Typography variant="h7">Rating </Typography>
          <Rating name="read-only" value={product.rating} readOnly />
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<AddShoppingCart />}
          onClick={() => onAddToCart(product.id, 1)}
        >
          <b>ADD TO CART</b>
        </Button>
      </CardActions>
    </Card>
    
  );
};

export default Product;
