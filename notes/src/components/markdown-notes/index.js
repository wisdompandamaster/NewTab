import React, {useState} from 'react';
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

const MarkdownNotes = (noteData) => {
    const [notesValue, setIsCardDelete] = useState('');
    // 需要异步渲染Markdown时
    // const renderHTML =(text) => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(mdParser.render(text))
    //         }, 0)
    //     })
    // };
    React.useEffect(() => {
        setIsCardDelete(noteData?.notesData[noteData.noteIndex]);
        return () => {}
    });

    const handleEditorChange = ({ html, text }) => {
        setIsCardDelete(text);
        const note = noteData.notesData
        note[noteData.noteIndex].value = text
        noteData.setNotesData(note)
        noteData.setNotesList(note)
    };
    return (
        <MdEditor
            value={notesValue?.value}
            style={{ height: '500px',maxWidth: '790px',width: '100%' }}
            shortcuts={true}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange} />
    );
};

export default MarkdownNotes;