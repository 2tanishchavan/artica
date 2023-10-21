export const Muted = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className = "text-sm text-gray-500";
  if (props.className) {
    className = `text-sm text-gray-500 ${props.className}`;
  }
  return <p className={className}>{props.children}</p>;
};
