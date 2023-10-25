import styled from "styled-components";
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Modal } from "../components";


// Define una interface para los parámetros de la query
interface QueryParams {
    key: string;
    collection_id: string;
    collection_status: string;
    payment_id: string;
    status: string;
    external_reference: string;
    payment_type: string;
    merchant_order_id: string;
    preference_id: string;
    site_id: string;
    processing_mode: string;
    merchant_account_id: string | null;
  }

// Define el componente
const FinalizarPedido: React.FC = () => {
    const router = useRouter();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [orderProcessed, setOrderProcessed] = useState(false);


    useEffect(() => {
      // Asegúrate de que todos los parámetros estén presentes antes de proceder
      if (router.isReady) {

        const orderKey = Cookies.get('order_key');
        const orderNumber = Cookies.get('order_number');
        if (!orderKey || !orderNumber) {
          setError("No se encontró el pedido");
          return;
        }
        setIsLoading(true);
        setError("");

        const params: QueryParams = {
          key:orderKey as string,
          collection_id: router.query.collection_id as string,
          collection_status: router.query.collection_status as string,
          payment_id: router.query.payment_id as string,
          status: router.query.status as string,
          external_reference: router.query.external_reference as string,
          payment_type: router.query.payment_type as string,
          merchant_order_id: router.query.merchant_order_id as string,
          preference_id: router.query.preference_id as string,
          site_id: router.query.site_id as string,
          processing_mode: router.query.processing_mode as string,
          merchant_account_id: router.query.merchant_account_id as string | null,
        };

        if (params.status !== "approved") {
          setError("El pago no fue aprobado");
          setIsLoading(false);
          return;
        }
        //si no se encuentran todos los parámetros, se muestra un error
        if (!params.key || !params.collection_id || !params.collection_status || !params.payment_id || !params.status || !params.external_reference || !params.payment_type || !params.merchant_order_id || !params.preference_id || !params.site_id || !params.processing_mode || !params.merchant_account_id) {
          setError("No se encontraron todos los parámetros");
          setIsLoading(false);
          return;
        }

        console.log("orderKey: ", orderKey);
        console.log("orderNumber: ", orderNumber);
        // Construye la URL de WordPress
        const wordpressUrl = `https://www.to2beer.com/index.php/finalizar-compra/order-received/${orderNumber}}`;
  
        // Realiza la solicitud GET para actualizar el estado del pedido en WooCommerce
        //espera a que se resuelva la promesa y cambia el estado de isLoading

        updateOrderStatus(wordpressUrl, params)
          .then(() => {
          setIsLoading(false);
          setOrderProcessed(true);
          })
          .catch((error) => {
            setError(error as string);
            setIsLoading(false);
          });
        
        // Eliminar las cookies después de su uso
        Cookies.remove('order_key');
        Cookies.remove('order_number');
      }
    }, [router.isReady, router.query]);

    useEffect(() => {
      if (orderProcessed) {
        const timer = setTimeout(() => {
          router.push("/");  // Redirects to the homepage after 2 seconds
        }, 2000);

        return () => clearTimeout(timer);  // Cleanup the timer to prevent unexpected behavior
      }
    }, [orderProcessed, router]);
  
    // Define la función para actualizar el estado del pedido
    const updateOrderStatus = async (url: string, params: QueryParams) => {
      try {
        const response = await axios.get(url, { params });
        console.log('Order status updated:', response.data);
        return;
      } catch (error) {
        console.error('Error updating order status:', error);
        setError(error as string);
        return;
      }
    }
  return(
// if loading, show Modal with loading indicator else if error, show error message else show success message
    <Fragment>
      {isLoading ? (
        <Modal message="Procesando pago..."/>
      ) : (
       
          (error as string) !== "" ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <Modal message="¡Gracias por tu compra!"/>
          )
      
      )}  
    </Fragment>
  );  
};

const ErrorMessage = styled.div`
  color: #fa004f;
  padding-top: 8px;
`;  
  // Exporta el componente
  export default FinalizarPedido;
  