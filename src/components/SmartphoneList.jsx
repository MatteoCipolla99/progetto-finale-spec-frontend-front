export default function SmartphoneList({ smartphones }) {
  return (
    <div className="p-4 space-y-4">
      {smartphones.map((phone) => (
        <div key={phone.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{phone.title}</h2>
          <p className="text-gray-600">{phone.category}</p>
        </div>
      ))}
    </div>
  );
}
