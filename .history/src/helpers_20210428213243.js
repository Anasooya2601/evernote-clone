

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
  
export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
};
function debounce(func, wait) {
  const debounceOnChange = debounce(onChange, 400);
  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}