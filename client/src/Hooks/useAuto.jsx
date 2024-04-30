import axios from "axios";

import addLogosSrc from "../utils/addLogosSrc";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const getAutoSymbolsApi = `${API_BASE_URL}/auto_symbol_search/`;

const getAutoSymbols = async (pageParams) => {
  const queryParams = {
    count: pageParams.count,
    text: pageParams.query,
    exchange: pageParams.exchange,
    search_type: pageParams.searchType
  }
  console.log(queryParams)
  const {data, status} = await axios.get(getAutoSymbolsApi, { params: queryParams });
  const prepareLogo = addLogosSrc(data);
  return {
    data: prepareLogo,
    status
  }
};

export default getAutoSymbols;
