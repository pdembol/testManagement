import {PageableResult} from "./Api";

export interface FindAllParams {
    filters: Filter[];
    sort?: Sort;
    page?: Page;
}
export interface LocalFindAllParams extends FindAllParams {
    sort: Sort;
    page: Page;
}
export declare const emptyParams: () => LocalFindAllParams;
export interface Filter {
    field: string;
    value: string;
}
export interface Sort {
    order: "asc" | "desc";
    sort: string;
}
export interface Page {
    pageNumber: number;
    pageSize: number;
}

export interface Api {
    getList<T>(url: string, data?: {}, config?: {}): Promise<PageableResult<T>>;
}