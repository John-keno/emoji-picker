import { useEffect, useState } from "react";
import spinner from "../spinner.gif";
import errorCloud from "../error-cloud.gif";
import SearchPanel from "./SearchPanel";
import useApiStore from "../store.js";

export default function EmojiPanel() {
  const [emojiData, setEmojiData] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const loading = useApiStore((state) => state.loading);
  const error = useApiStore((state) => state.error);
  const { apiData, fetchApiData } = useApiStore();

  useEffect(() => {
    // fetchData();
    fetchApiData();
  }, [fetchApiData]);

  async function copySelectedEmoji(emoji) {
    try {
      await navigator.clipboard.writeText(emoji);
      console.log("Text copied to clipboard:", emoji);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  }

  function searchEmojis(searchText) {
    if (searchText === "") {
      setFilteredEmojis(emojiData);
    } else {
      const newData = emojiData.filter((item) => {
        return (
          item.unicodeName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.character.toLowerCase().includes(searchText.toLowerCase()) ||
          item.group.toLowerCase().includes(searchText.toLowerCase()) ||
          item.codePoint.includes(searchText.toUpperCase())
        );
      });

      setFilteredEmojis(newData);
    }
  }

  return (
    <>
      <SearchPanel searchEmojis={searchEmojis} />
      <div style={{ width: "100%", height: "500px", overflow: "auto" }}>
        {loading ? (
          <>
            <img src={spinner} alt="Loading..." />
            <p>Loading...</p>
          </>
        ) : error ? (
          <>
            <img src={errorCloud} alt="error cloud" />
            <p>{error}</p>
          </>
        ) : (
          <>
            <div className="emoji-items">
              {console.log(emojiData)}
              {apiData.map((item) => (
                <div
                  className="items"
                  onClick={() => copySelectedEmoji(item.character)}
                  key={item.slug}
                >
                  {item.character}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
