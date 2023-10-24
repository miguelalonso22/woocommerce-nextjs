import styled from "styled-components";
import Image from "next/image";
import { Product } from "../../utils/wooCommerceTypes";
import { useAppDispatch } from "../../store/hooks";
import { addLineItem } from "../../store/slices/cartSlice";
import { ProductCardInfo } from "../../components";

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  const { product } = props;

  const dispatch = useAppDispatch();

  const lineItem = {
    name: product.name,
    product_id: product.id,
    quantity: 1,
    price: product.regular_price,
  };
  const handleIncrement = () => {
    dispatch(addLineItem(lineItem));
  };

  return (
    <Card>
      <ImageContainer>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageContainer>
      <ProductCardInfo
        name={product.name}
        price={product.regular_price}
        onClickFunction={handleIncrement}
      />
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  width: 100%;
  // border: 1px solid #eaeaea;
  border-radius: 2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
  border: 1px solid #eaeaea;
  border-radius: 2rem 2rem 0 0;
`;
