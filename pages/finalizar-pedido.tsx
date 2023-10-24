import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';


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

    useEffect(() => {
      // Asegúrate de que todos los parámetros estén presentes antes de proceder
      if (router.isReady) {
        const orderKey = Cookies.get('order_key');
        const orderNumber = Cookies.get('order_number');

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


        console.log("orderKey: ", orderKey);
        console.log("orderNumber: ", orderNumber);
        // Construye la URL de WordPress
        const wordpressUrl = `https://www.to2beer.com/index.php/finalizar-compra/order-received/${orderNumber}}`;
  
        // Realiza la solicitud GET para actualizar el estado del pedido en WooCommerce
        updateOrderStatus(wordpressUrl, params);
        // Eliminar las cookies después de su uso
        Cookies.remove('order_key');
        Cookies.remove('order_number');
      }
    }, [router.isReady, router.query]);
  
    // Define la función para actualizar el estado del pedido
    const updateOrderStatus = async (url: string, params: QueryParams) => {
      try {
        const response = await axios.get(url, { params });
        console.log('Order status updated:', response.data);
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  return(
    <div>
      ¡Gracias por su compra!
    </div>
  );
};

  
  // Exporta el componente
  export default FinalizarPedido;
  