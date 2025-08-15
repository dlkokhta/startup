import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  id: string;
  name: string;
}

export const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  const token = sessionStorage.getItem("accessToken");
  console.log("saved accessToken:", token);

  useEffect(() => {
    const fetchItems = async () => {
      const url = import.meta.env.PROD ? "" : "http://localhost:4000"; // adjust prod URL when available

      try {
        const token = sessionStorage.getItem("accessToken");
        // console.log("saved accessToken:", token);

        const response = await axios.get(`${url}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setItems(response.data);
      } catch (err: any) {
        // If token expired (401), try to refresh
        if (err.response?.status === 401) {
          try {
            console.log("Access token expired, attempting refresh...");
            const refreshResponse = await axios.post(
              `${url}/auth/refresh`,
              {},
              {
                withCredentials: true,
              }
            );

            const newAccessToken = refreshResponse.data.accessToken;
            console.log("New access token received:", newAccessToken);
            sessionStorage.setItem("accessToken", newAccessToken);

            // Retry original request with new token
            const retryResponse = await axios.get(`${url}/items`, {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
              withCredentials: true,
            });
            console.log("Retry successful, items:", retryResponse.data);
            setItems(retryResponse.data);
          } catch (refreshErr: any) {
            console.log("Refresh failed:", refreshErr);
            // Optionally set error state here
          }
        } else {
          // Optionally set error state here
        }
      }
    };

    fetchItems();
  }, []);

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
