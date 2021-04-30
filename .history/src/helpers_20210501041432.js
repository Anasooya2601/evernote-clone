
export default function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, "");
}






// import React,{useState,useEffect} from "react";

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
  
// export function removeHTMLTags (str) {
//   return str.replace(/<[^>]*>?/gm, '');
// };