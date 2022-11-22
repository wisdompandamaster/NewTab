import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";
// markdown代码颜色
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
// 编辑样式
import "./index.css";

// 初始化Markdown解析器
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (_) {
        console.log("出错了");
      }
    }
    return ""; // use external default escaping
  },
});

const MarkdownNotes = noteData => {
  const [notesValue, setIsCardDelete] = useState("");

  // 初始化更新
  React.useEffect(() => {
    const newNoteData = noteData?.notesData[noteData.noteIndex]
      ? noteData?.notesData[noteData.noteIndex]
      : noteData?.notesData[noteData.noteIndex - 1];
    setIsCardDelete(newNoteData);
    return () => {};
  }, [noteData.notesData, noteData.noteIndex]);

  // 使用正则表达式从字符串中删除 HTML/XML 标记。
  const stripHTMLTags = str => str.replace(/<[^>]*>/g, "");

  // 改变markdown笔记内容时触发
  const handleEditorChange = ({ html, text }) => {
    setIsCardDelete(text);
    const note = noteData.notesData;
    note[noteData.noteIndex].text = text;
    note[noteData.noteIndex].value = stripHTMLTags(html);
    noteData.setNotesData(note);
    noteData.setNotesList(note);
  };

  return (
    <>
      {noteData?.notesData.length !== 0 ? (
        <MdEditor
          placeholder='写点什么吧'
          value={notesValue?.text}
          style={{ height: "100%", maxWidth: "790px", width: "100%" }}
          shortcuts={true}
          renderHTML={text => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      ) : (
        <div
          style={{
            fontSize: "30px",
            height: "50px",
            width: "100%",
            textAlign: "center",
            lineHeight: "50px",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            fontWeight: "700",
            color: "#00000033",
            letterSpacing: "8px",
          }}
        >
          暂无笔记
        </div>
      )}
    </>
  );
};

export default MarkdownNotes;
