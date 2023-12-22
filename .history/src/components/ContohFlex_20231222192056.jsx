const ExampleComponent = () => {
  return (
    <div className="flex items-center">
      <img
        className="h-56 w-full object-cover md:h-full md:w-56"
        src="https://cdn2.vectorstock.com/i/1000x1000/54/81/cute-animal-friends-cartoon-vector-21595481.jpg"
        alt="Cute Animals"
      />
      <div>
        <strong>INI PAKE FLEX YA!!!</strong>
        <strong>flex itu gak block jadi nyatu gini</strong>
        <span>Technical advisor</span>
      </div>
    </div>
  );
};

export default ExampleComponent;
