

// export default function useDebounce(value, delay) {
//   const [debounceValue, setDebounceValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebounceValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debounceValue;
// }
  
import React, {useState} from "react";
import _ from "lodash";
const sendQuery = (query) => console.log(`Querying for ${query}`);const Search = () => {
  const [userQuery, setUserQuery] = useState("");
  const delayedQuery = _.debounce(q => sendQuery(q), 500);
  const onChange = e => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };
  return (
    <div>
      <label>Search:</label>
      <input onChange={onChange} value={userQuery} />
    </div>
  );
  export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
  };
}
