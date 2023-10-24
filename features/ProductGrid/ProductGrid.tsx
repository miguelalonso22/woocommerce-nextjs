import styled from "styled-components";
import { Product } from "../../utils/wooCommerceTypes";
import { ProductCard } from "../../containers";

interface Props {
  products: Product[];
}

const ProductGrid = (props: Props) => {
  const { products } = props;

  return (
    <Grid>
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </Grid>
  );
};

export default ProductGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  width: 100%;
  padding: 16px;
  padding-top: 5%;
  padding-bottom: 7%;
  @media (max-width: 919px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 619px) {
    grid-template-columns: repeat(1, 1fr);
    padding-left: 5%;
    padding-right: 5%;

  }
  max-width: 1200px;
  margin: 0 auto;
`;
