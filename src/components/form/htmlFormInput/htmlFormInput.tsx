import React, {useEffect} from 'react';
// import {EditorProps} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import {formatDate} from "../../../helper/dateHelper.ts";

interface ComponentProps {
    label?: string | null,
    hint?: string | boolean | null,
    error?: any | null,
    required?: boolean | null,
    content?: {
        content: string,
        createdBy: string,
        createdAt: string,
        updatedBy: string,
        updatedAt: string
    } | undefined,
    type?: string | undefined
    onChange?: (e: any) => void | null,
    className?: string | undefined,
    identificator: string,
    editorState: any,
    setEditorState: any,
    setValue: (content: string) => void
}

// const Editor = dynamic<EditorProps>(
//     () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//     {ssr: false}
// )
const HtmlFormInput: React.FC<ComponentProps> = ({
                                                     error,
                                                     label,
                                                     hint,
                                                     required = false,
                                                     content,
                                                     editorState,
                                                     setEditorState,
                                                     setValue
                                                 }) => {



    const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default;

    useEffect(() => {
        if (!content || !content?.content) {
            return
        }
        const contentBlock = htmlToDraft(content.content);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorStateNew = EditorState.createWithContent(contentState);
        setEditorState(editorStateNew)

    }, [content, htmlToDraft]);


    useEffect(() => {
        if (!editorState) {
            return
        }
        setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState]);

    return <>
        {label && <label className={'mb-4 fw-bolder fs-6'}>{label} {required &&
            <span className="text-danger">*</span>}</label>}
        {/*<Editor*/}
        {/*    editorState={editorState}*/}
        {/*    toolbarClassName={'toolbarClassName'}*/}
        {/*    wrapperClassName={'wrapperClassName'}*/}
        {/*    editorClassName={'editorClassName'}*/}
        {/*    onEditorStateChange={setEditorState}*/}
        {/*    editorStyle={{*/}
        {/*        height: '400px',*/}
        {/*        padding: '1rem',*/}
        {/*        border: '1px solid #F1F1F1'*/}
        {/*    }}*/}
        {/*/>*/}
        {hint && error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && hint && (
            <div className="form-text text-muted">{hint}</div>
        )}
        <div className={'d-flex mt-4 justify-content-between'}>
            {(!content?.updatedAt && content?.createdAt) &&
                <div className={'d-flex justify-content-between align-items-center'}>
                    <div className={'me-4'}>Vytvořeno</div>
                    <div>  {content?.createdAt && formatDate(content.createdAt, 'd. M. yyyy')} <br/>
                        <span className="text-gray-400 pt-1 fw-semibold fs-7">({content?.createdBy})</span>
                    </div>
                </div>}
            {content?.updatedAt && <div className={'d-flex justify-content-between align-items-center'}>
                <div className={'me-4'}>Poslední změna</div>
                <div>  {content?.updatedAt && formatDate(content.updatedAt, 'd. M. yyyy')} <br/>
                    <span className="text-gray-400 pt-1 fw-semibold fs-7">({content?.updatedBy})</span>
                </div>
            </div>}
        </div>

    </>;
}

export default HtmlFormInput;