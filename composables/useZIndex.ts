export default function () {
  const globalZIndex = useState('global-z-index', () => 100);

  const bringToFront = () => {
    globalZIndex.value += 1;
    return globalZIndex.value;
  };

  return {
    globalZIndex,
    bringToFront,
  };
};
