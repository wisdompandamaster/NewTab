import axios from 'axios';

// 添加图片
export async function ADD_PIC(imgProps) {
    return axios.post('url',
        {
            data: imgProps,
        },
    )
}

// 获取全部图片
export async function GET_PICS(userId) {
    return axios.get('url',
        {
            headers: { 'Content-Type': 'application/json', },
            params: { 'userId': userId },
        },
    )
}

// 删除某张图片
export async function DEL_PIC(userId, picId) {
    return axios.get('url',
        {
            headers: { 'Content-Type': 'application/json', },
            params: { 'userId': userId, 'picId': picId },
        },
    )
}