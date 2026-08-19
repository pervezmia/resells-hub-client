// "use server";


// export async function updateOrderStatus(orderId, orderStatus) {
//   try {
//     const res = await fetch(  
//       `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
//       {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderStatus }),
//       }
//     );

//     if (!res.ok) {
//       return { error: "Failed to update order status." };
//     }
//     return res.json();
//   } catch (err) {
//     console.error(err);
//     return { error: "Something went wrong while updating the order." };
//   }
// }



// //order

// export async function cancelOrder(orderId) {
//   try {


//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
//       {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderStatus: "cancelled" }),
//       }
//     );

//     if (!res.ok) {
//       return { error: "Failed to cancel order." };
//     }
//     return res.json();
//   } catch (err) {
//     console.error(err);
//     return { error: "Something went wrong while cancelling the order." };
//   }
// }

"use server";

import { getTokenServer } from "../getTokenServer";

export async function updateOrderStatus(orderId, orderStatus) {
  try {
    const token = await getTokenServer();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus }),
      }
    );

    if (!res.ok) {
      return { error: "Failed to update order status." };
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong while updating the order." };
  }
}

// order

export async function cancelOrder(orderId) {
  try {
    const token = await getTokenServer();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: "cancelled" }),
      }
    );

    if (!res.ok) {
      return { error: "Failed to cancel order." };
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong while cancelling the order." };
  }
}