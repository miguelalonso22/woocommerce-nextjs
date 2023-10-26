import styled from "styled-components";
import Image from "next/image";
import { Product } from "../../utils/wooCommerceTypes";
import { useAppDispatch } from "../../store/hooks";

interface Props {
  product: Product;
}

const SliderCard = (props: Props) => {
  const { product } = props;

  const dispatch = useAppDispatch();

  const DEFAULT_IMAGE_SRC = "/../images/Noimage1.png";
  // const DEFAULT_IMAGE_ALT = "Placeholder Image";

  return (
    <Card>
      <ImageContainer>
      {product.images && product.images.length > 0 ? (
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : ( // Replace with your default image or placeholder component
      <Image
          src={DEFAULT_IMAGE_SRC}
          alt={"Placeholder Image"}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    )}
      </ImageContainer>
    </Card>
  );
};

export default SliderCard;

const Card = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`;
