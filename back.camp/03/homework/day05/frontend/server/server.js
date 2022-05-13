

const goServerGet = async ( api, params = {} ) => {
    const res = await axios.get(getUrl(api), {
        params: params
    });
    return res;
}
