import { useParams } from "react-router-dom";
import { Article1 } from "./Article1.jsx";
import { Article2 } from "./Article2.jsx";

export function BlogSingle() { 
    const { id } = useParams();

    let content;
    switch (id) {
        case '1':
            content = <Article1/>;
            break;
        case '2':
            content = <Article2/>;
            break;
        default:
            content = <p>Статья не найдена</p>;
            break;
    }

    return (
        <div>
            {content}
        </div>
    );
}