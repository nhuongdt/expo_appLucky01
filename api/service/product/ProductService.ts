import { IPageResult } from "../../commonDto/pageResult";
import fetchApi from "../../fetchApi";
import { IParamSearchProductDto, IProductBasic } from "./dto";

class ProductSevice {
  GetListproduct = async (
    input: IParamSearchProductDto
  ): Promise<IPageResult<IProductBasic>> => {
    const xx = await fetchApi.post(
      `api/services/app/HangHoa/GetDMHangHoa`,
      input
    );
    return xx;
  };
}

export default new ProductSevice();
