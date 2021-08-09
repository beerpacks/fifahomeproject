import { Node } from "typescript"

export const MasterPage = ({ children }: { children: React.ReactNode }) => {
    return (<div>
        {
            children
        }
    </div>
    )
}