

const goServerGet = async ( api, params = {} ) => {
    const res = await axios.get(getUrl(api), {
        params: params
    });
    return res;
}

const goServerPost = async ( api, params = {} ) => {
    const res = await axios.post(getUrl(api), params);
    return res;
}


const goServerPatch = async ( api, params = {} ) => {
    const res = await axios.patch(getUrl(api), params);
    return res;
}