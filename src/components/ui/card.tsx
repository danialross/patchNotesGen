type CardProps = {
  children: React.ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return (
    <div
      className={`w-[350px] lg:w-[250px] h-[100px] bg-gray-50 border-2 border-[#FF9D0A] p-4 rounded-md`}>
      {children}
    </div>
  );
};
