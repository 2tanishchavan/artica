export const Lead = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className = "text-xl text-gray-500";
  if (props.className) {
    className = `text-xl text-gray-500 ${props.className}`;
  }
  return <p className={className}>{props.children}</p>;
};