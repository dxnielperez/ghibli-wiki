interface ContainerProps {
  heading: string;
  children: React.ReactNode;
}

export function Container({ heading, children }: ContainerProps) {
  return (
    <div className="min-h-screen py-3 max-w-7xl mx-auto">
      <h3 className="flex justify-center text-2xl lg:text-4xl text-white py-4 font-montserrat font-semibold">
        {heading}
      </h3>
      <div>{children}</div>
    </div>
  );
}
