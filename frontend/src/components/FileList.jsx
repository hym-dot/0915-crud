import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import api from "../api";
import "./FileList.scss";
const FileList = forwardRef((props, ref) => {
    const [items, setItems] = useState([]);


    const load = async () => {
        // Date.now()를 쿼리스트링으로 붙여 캐시를 회피
        const { data } = await api.get("/files", {
            params: { t: Date.now() }
        });
        console.log("GET /files 응답:", data.out);
        setItems(data.out);
    };


    useEffect(() => {
        load();
    }, []);
    // 부모에서 ref.current.load() 호출할 수 있게 노출
    useImperativeHandle(ref, () => ({ load }));

    return (
        <ul className="file-list">
            {items.map((it) => (
                <li
                    key={it._id}
                >
                    <h3>{it.title || it.originalName}</h3>
                    {it.contentType?.startsWith("image/") && (
                        <div className="img-wrap">

                            <img src={it.url} alt="" style={{ maxWidth: 200, display: "block" }} />
                        </div>
                    )}
                    <p>{it.description}</p>
                    <div className="btn-wrap">

                        <a href={it.url} target="_blank" rel="noreferrer" className="open-btn">Open</a>
                        <button 
                        onClick={}
                        className="delete-btn">Delete</button>
                    </div>
                </li>
            ))}
        </ul>

    )
})

export default FileList