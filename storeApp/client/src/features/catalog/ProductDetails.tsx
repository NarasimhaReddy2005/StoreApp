import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogAPI";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../Basket/basketAPI";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id } = useParams(); // Type is string | undefined (since it comes from the URL we can't
  // guarantee that it will always be defined)

  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((x) => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? parseInt(id) : 0
  );

  if (!product || isLoading) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value; // to number

    if (value >= 0) setQuantity(value);
  };

  const ProductDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1rem" }, // '&' is used to target all the element with type following it.
            }}
          >
            <TableBody>
              {ProductDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Add to basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
