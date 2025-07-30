import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: string;
  name: string;
}

export const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log("itemssss", items);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url =
          process.env.NODE_ENV === "production"
            ? "" // for production URL
            : "http://localhost:4000";
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${url}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading items...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
