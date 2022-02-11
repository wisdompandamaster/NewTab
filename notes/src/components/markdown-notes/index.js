import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
// markdown代码颜色
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
// 编辑样式
import './index.css'

// 初始化Markdown解析器
const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight:  (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value
            } catch (_) {
                console.log('出错了')
            }
        }
        return '' // use external default escaping
    }
});

// 完成！
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
export default MarkdownNotes => {
    return (
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    );
};