// import { NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
//     apiVersion: '2023-10-16',
// })

// export const POST = async (request: Request) => {
//     const signature = request.headers.get('stripe-signature')

//     if (!signature) {
//         return NextResponse.error()
//     }

//     const text = await request.text()

//     const event = stripe.webhooks.constructEvent(
//         text,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET_KEY
//     )

//     if (event.type === 'checkout.session.completed') {

//         const sessionWithLineitems = await stripe.checkout.sessions.retrieve(
//             event.data.object.id,
//             {
//                 expand: ['line-items']
//             }
//         )

//         const lineItems = sessionWithLineitems.line_items

//         //Criar uma Order no prisma
//         // Registrar os pedidos no prisma
//         // Criar a tela de pedidos
//     }

//     return NextResponse.json({ received: true })
// } 