const CounterCard = ({ cardTitle, cardNumber, backgroundColor }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-auto rounded-lg ${backgroundColor}`}
    >
      <p className="my-4 text-base 2xs:text-lg xs:text-xl">{cardTitle}</p>
      <p className="text-lg 2xs:text-2xl xs:text-4xl mb-4">{cardNumber}</p>
    </div>
  );
};

export default CounterCard;
