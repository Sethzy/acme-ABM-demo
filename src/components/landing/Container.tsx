type ContainerProps = React.ComponentPropsWithoutRef<"div">;

export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto min-w-0 w-full max-w-[76rem] px-5 sm:px-8 lg:px-10 ${className}`}
      {...props}
    />
  );
}
