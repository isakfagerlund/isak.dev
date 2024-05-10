import { db } from "~/server/db";

export default async function BrunchOrders() {
  const orders = await db.query.orders.findMany();

  return (
    <div className="frost-effect z-10 flex w-full flex-col gap-2 rounded-xl p-4">
      {orders.map((order, i) => {
        const [milk, drink] = order.order.split(" - ");

        return (
          <div className=" flex w-full items-center gap-3" key={order.id}>
            <p>{i + 1}</p>
            <div>
              <p className="capitalize">
                {milk !== "none" ? milk : null} {drink}
              </p>
              <p className="capitalize opacity-50">{order.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
