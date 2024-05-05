{
  type Product = {
    message: string;
    data: {
      _id: string;
      productName: string;
      description: string;
      fabrics: string;
      price: number;
      availableSize: [];
      gender: string;
      productImages: [];
      featured: boolean;
    };
  }[];

  const getProducts = async (): Promise<Product> => {
    const res = await fetch(
      "https://ash-and-joh-server.onrender.com/api/v1/products/getAllProduct"
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  getProducts();

  type Something = { something: string };
  const createPromise = (): Promise<Something> => {
    return new Promise<Something>((resolve, reject) => {
      const data: Something = { something: "something" };
      if (data) {
        resolve(data);
      } else {
        reject("Error While Loading Data");
      }
    });
  };
  const showData = async (): Promise<Something> => {
    const data: Something = await createPromise();
    return data;
  };
 const data = showData();
 (async () => {
    const data = await showData();
    console.log(data);
  })();
  
}
