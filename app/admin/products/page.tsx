import getProducts from "@/app/api/actions/getProducts";
import Table from "@/components/DashBoard/Products/Table";
import { productsColumns } from "@/components/DashBoard/Table/columns";
import { DataTable } from "@/components/DashBoard/Table/data-table";
import { Product } from "@prisma/client";

export default async function page() {
  const products = await getProducts().then((res) => res);
  // const [values, setValues] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: "",
  // });
  // const [errors, setErrors] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: "",
  // });
  // const [loading, setLoading] = useState(false);

  // const handleForm = async () => {
  //   setLoading(true);
  //   try {
  //     const isValid = await productSchema.validate(values, {
  //       abortEarly: false,
  //     });
  //     if (!isValid) {
  //       setErrors(isValid);
  //       return;
  //     }
  //   } catch (error: any) {
  //     setErrors(error.errors);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full h-full">
      <Table products={products as Product[]} />
      {/* <Input
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        placeholder="Product Name"
        label="Product Name"
        type="text"
        loading={loading}
        error={errors.name}
        isError={errors.name !== ""}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, name: "" }));
        }}
      />
      <Input
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
        placeholder="Product description"
        label="Product description"
        type="text"
        loading={loading}
        error={errors.description}
        isError={errors.description !== ""}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, description: "" }));
        }}
      />
      <Input
        value={values.price}
        onChange={(e) => setValues({ ...values, price: e.target.value })}
        placeholder="Product .price"
        label="Product price"
        type="text"
        loading={loading}
        error={errors.price}
        isError={errors.price !== ""}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, price: "" }));
        }}
      />
      <Button onClick={handleForm}>Submit</Button> */}
    </div>
  );
}
