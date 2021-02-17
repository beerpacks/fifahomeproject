import { Node } from "typescript"

export const MasterPage = ({ children }: { children: Node }) => {
    return (<div>
        <div>MasterPage</div>
        {
            children
        }
    </div>
    )
}