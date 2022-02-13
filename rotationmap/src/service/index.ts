export async function ADD_PIC(imgProps: Map<any, any>) {
    return fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imgProps),
    })
}

export async function GET_PICS() {
    return fetch('', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function DEL_PIC(picId: string) {
    return fetch('', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: picId }),
    })
}