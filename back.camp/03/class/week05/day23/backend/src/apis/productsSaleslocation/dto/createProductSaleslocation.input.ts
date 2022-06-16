import { InputType, OmitType } from "@nestjs/graphql";
import ProductSalesLocationEntity from "../entities/productSaleslocation.entity";

@InputType()
class CreateProductSalesLocationInput extends OmitType(
    ProductSalesLocationEntity,
    ["id"],
    InputType
) {}

export default CreateProductSalesLocationInput;
