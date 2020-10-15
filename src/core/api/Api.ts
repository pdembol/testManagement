import axios, {AxiosInstance} from "axios";

export interface Api {
    getList<T>(url: string, data?: {}, config?: {}): Promise<any>;
}

export class RemoteApi implements Api {
    public readonly baseUrl: string;
    private readonly axios: AxiosInstance;

    public constructor(baseUrl: string, headers: any) {
        this.baseUrl = baseUrl;
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers
        });
        this.axios.defaults.headers["Authorization"] = "token " + process.env.REACT_APP_API_KEY
    }

    public async getList<T>(
        url: string,
        config?: {}
    ): Promise<any> {
        const conf = {params: {...config}};
        return await this.getMethod<any>(url, conf);
    }

    public async getMethod<T>(url: string, config?: {}): Promise<T> {
        const response = await this.axios.get<T>(url, config);
        return response.data;
    }

}
