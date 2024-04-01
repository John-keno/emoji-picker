import { useEffect, useState } from "react";
import spinner from "../spinner.gif";
import errorCloud from "../error-cloud.gif";
import SearchPanel from "./SearchPanel";
import useApiStore from "../store.js";

export default function EmojiPanel() {
  const [variantCode, setVariantCode] = useState([
    "FE0F",
    "1F3FB",
    "1F3FC",
    "1F3FD",
    "1F3FE",
    "1F3FF",
  ]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  // const filteredEmojis = useApiStore((state) =>  state.filteredData);
  const loading = useApiStore((state) => state.loading);
  const error = useApiStore((state) => state.error);
  const { apiData, fetchApiData } = useApiStore();

  //   variant: {
  //     normal: "FE0F",
  //     lightSkinTone: "1F3FB",
  //     mediumLightSkinTone: "1F3FC",
  //     mediumSkinTone: "1F3FD",
  //     mediumDarkSkinTone: "1F3FE",
  //     darkSkinTone: "1F3FF",
  //   }

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
        setFilteredEmojis(apiData);
    } else {
      const newData = apiData.filter((item) => {
        return (
          //   (
          item.unicodeName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.character.toLowerCase().includes(searchText.toLowerCase()) ||
          item.group.toLowerCase().includes(searchText.toLowerCase())
          // )&&(
          //   !item.codePoint.includes(variantCode[1].toUpperCase()) ||
          //   !item.codePoint.includes(variantCode[2].toUpperCase()) ||
          //   !item.codePoint.includes(variantCode[3].toUpperCase()) ||
          //   !item.codePoint.includes(variantCode[4].toUpperCase()) ||
          //   !item.codePoint.includes(variantCode[5].toUpperCase()) )
        );
      });

      setFilteredEmojis(newData);
    }
  }

  //   function selectVariants(variantCode) {
  //     const newData = apiData.filter((item) => {
  //       return (!item.codePoint.includes(variantCode.toUpperCase()) ||

  //       );
  //     });

  //     setFilteredEmojis(newData);
  //   }

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
              {}
              {filteredEmojis.map((item) => (
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
