export function TransformGraphQLResponse(res) {
    const data = res.data.data;
    let error = undefined;
    let msg = undefined;

    if (!data) {
        error = res.data.errors[0];
        msg = error.extensions.response.message;
    }

    return {
        data,
        error,
        msg,
    };
}
