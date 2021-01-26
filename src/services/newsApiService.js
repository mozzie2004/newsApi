
export default class newsApiService {
    constructor() {
        this._apiKey = 'apiKey=77a5be784d0740b385194f35158dcc59';
        this._apiBase = 'http://newsapi.org/v2/everything?q=apple&from=2021-01-25&to=2021-01-25&sortBy=popularity&';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllNews = async () => {
        const res = await this.getResource(`pageSize=100&${this._apiKey}`);

        return res;
    }

}