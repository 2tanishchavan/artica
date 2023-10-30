export const H1 = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className =
    "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl";
  if (props.className) {
    className = `scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl ${props.className}`;
  }
  return <h1 className={className}>{props.children}</h1>;
};

export const H2 = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className =
    "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0";
  if (props.className) {
    className = `scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${props.className}`;
  }
  return <h1 className={className}>{props.children}</h1>;
};

export const H3 = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className = "scroll-m-20 text-2xl font-semibold tracking-tight";
  if (props.className) {
    className = `scroll-m-20 text-2xl font-semibold tracking-tight ${props.className}`;
  }
  return <h3 className={className}>{props.children}</h3>;
};

export const H4 = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className = "scroll-m-20 text-xl font-semibold tracking-tight";
  if (props.className) {
    className = `scroll-m-20 text-xl font-semibold tracking-tight ${props.className}`;
  }
  return <h4 className={className}>{props.children}</h4>;
};

export const H5 = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  let className = "scroll-m-20 text-lg font-medium tracking-tight";
  if (props.className) {
    className = `scroll-m-20 text-lg font-medium tracking-tight ${props.className}`;
  }
  return <h5 className={className}>{props.children}</h5>;
};