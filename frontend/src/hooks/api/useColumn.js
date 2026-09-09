import ColumnService from "../../api/services/ColumnServise";
import { useApi } from "./useApi";


const columnService = new ColumnService();


export function useColumns() {
    const {
        data: columns,
        setData: setColumns,
        loading: columnsLoading,
        error: columnsError,
        execute: fetchColumns
    } = useApi(
        () => columnService.getAll(),
        { 
            immediate: true,
            initialData: [], 
        }
    );

    return {
        columns,
        loading: columnsLoading,
        error: columnsError,
        fetchColumns,
        setColumns
    };
}
