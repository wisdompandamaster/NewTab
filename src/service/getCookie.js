export default function getCookie(name) {
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return '';
    }
}
