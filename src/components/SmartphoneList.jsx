import { Link } from "react-router-dom";

export default function SmartphoneList({ smartphones }) {
  return (
    <div className="p-4 space-y-4">
      {smartphones.map((phone) => (
        <Link
          to={`/smartphone/${phone.id}`}
          key={phone.id}
          className="block border p-4 rounded shadow hover:bg-gray-100 transition"
        >
          <h2 className="text-xl font-bold">{phone.title}</h2>
          <p className="text-gray-600">{phone.category}</p>
        </Link>
      ))}
    </div>
  );
}
