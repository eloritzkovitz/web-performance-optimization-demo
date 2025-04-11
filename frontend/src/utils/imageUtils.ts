export const fetchImages = async (format: "avif" | "jpg"): Promise<string[]> => {
    try {
      const response = await fetch(`http://localhost:3001/api/images?format=${format}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return []; // Return an empty array on error
    }
  };