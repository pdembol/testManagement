
export interface Api {
    getList<T>(url: string, data?: {}, config?: {}): Promise<any>;
}