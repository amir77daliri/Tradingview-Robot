import { useQuery } from '@tanstack/react-query'
import axios from "axios";

import addLogosSrc from "../utils/addLogosSrc";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const getSymbolsApi = `${API_BASE_URL}/symbol_search/`

const useSymbols = (pageParams) => {
    let remainingSymbols = 0
    const {data, isPending, isError} = useQuery({
        queryKey: ['symbols', pageParams],
        queryFn: async function () {
            const {start, query, searchType} = pageParams
            let queryParams = {start: start}
            if (query !== '') {
                queryParams.text = query
            }
            if (searchType !== 'All') {
                queryParams.searchType = searchType;
            }
            const result = await axios.get(getSymbolsApi, {params: queryParams})
            console.log(result)
            return result.data
        },
         select : (result) => {
            const { symbols_remaining, symbols } = result;
            remainingSymbols = symbols_remaining
            return addLogosSrc(symbols)
         }
    })

    return {data, isPending, isError, remainingSymbols}
}

export default useSymbols;