import styled from "styled-components";
import { CTA, Modal } from "../../components";
import React, { Fragment, useState } from "react";
import Cookies from "js-cookie";

import {
  createOrderApi,
  // createPaymentIntentApi
} from "../../utils/customApi";

import { LineItem } from "../../utils/wooCommerceTypes";

import { useAppDispatch } from "../../store/hooks";
import { resetCartState } from "../../store/slices/cartSlice";
import { useRouter } from "next/router";

interface Props {
  lineItems: LineItem[];
}
const CardPayment = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // guard clause to exit if nothing in cart
    if (!props.lineItems.length) return;

    // set loading indicator
    setIsLoading(true);

    setError("");

    let wooCommerceOrder = await createOrderApi(props.lineItems).catch(
      (error) => {
        setError(error.message);
        setIsLoading(false);
        return;
      }
    );
    console.log("--LineItems: ", props.lineItems);
    console.log("--CREATED WOOCOMMERCE ORDER: ", wooCommerceOrder);
    if (wooCommerceOrder && wooCommerceOrder.order_key) {
      Cookies.set("order_key", wooCommerceOrder.order_key);
    }
    if (wooCommerceOrder && wooCommerceOrder.number) {
      Cookies.set("order_number", wooCommerceOrder.number);
    }
    setIsLoading(false);

    // clear Redux cart
    dispatch(resetCartState());

    if (wooCommerceOrder && wooCommerceOrder.payment_url) {
      window.location.href = wooCommerceOrder.payment_url;
    }
  };

  return (
    <Fragment>
      <h2>Finalizar pago</h2>

      <p>
        Total:{" $"}
        {props.lineItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )}
      </p>
      <Form id="card-payment-form" onClick={handleFormSubmit}>
        <CTA type="submit" disabled={!props.lineItems.length}>
          Pagar ahora
        </CTA>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
      {isLoading && <Modal message="Processing card..." />}
    </Fragment>
  );
};

export default CardPayment;

const Form = styled.form`
  width: 100%;
  /* Stripe Element containers can also be styled by class */
  .card-element {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 3px;
    padding: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const ErrorMessage = styled.div`
  color: #fa004f;
  padding-top: 8px;
`;

// Stripe has a defined style object that you can use to style Elements
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: "black",
      color: "black",
      fontSize: "18px",
      fontFamily: "Raleway, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      iconColor: "#fa004f",
      color: "#fa004f",
    },
  },
};

// This is almost the same as above except it takes the additional showIcon field
const CARD_NUMBER_OPTIONS = {
  showIcon: true,
  style: {
    base: {
      iconColor: "black",
      color: "black",
      fontSize: "18px",
      fontFamily: "Raleway, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      iconColor: "#fa004f",
      color: "#fa004f",
    },
  },
};
